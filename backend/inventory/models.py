from django.db import models


# ==========================
# Category Model
# ==========================
class Category(models.Model):

    category_name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.category_name


# ==========================
# Asset Model
# ==========================
class Asset(models.Model):

    asset_id = models.CharField(max_length=20, null=True, blank=True)

    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Assigned', 'Assigned'),
        ('Maintenance', 'Maintenance'),
        ("Recycled", "Recycled"),
    ]

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    asset_name = models.CharField(max_length=100)

    brand = models.CharField(max_length=100)

    model = models.CharField(max_length=100)

    serial_number = models.CharField(max_length=100, unique=True)

    purchase_date = models.DateField()

    warranty_expiry = models.DateField()

    price = models.DecimalField(max_digits=10, decimal_places=2)

    location = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Available"
    )

    def __str__(self):
        return self.asset_name


# ==========================
# Employee Model
# ==========================
class Employee(models.Model):

    employee_id = models.CharField(max_length=20, unique=True)

    employee_name = models.CharField(max_length=100)

    department = models.CharField(max_length=100)

    designation = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    password = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.employee_name


# ==========================
# Asset Assignment Model
# ==========================
class AssetAssignment(models.Model):

    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE
    )

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE
    )

    assigned_date = models.DateField()

    return_date = models.DateField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.asset.asset_name} - {self.employee.employee_name}"

# ==========================
# Maintenance Model
# ==========================
class Maintenance(models.Model):

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE
    )

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE
    )

    issue = models.TextField()

    reported_date = models.DateField()

    completed_date = models.DateField(
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    def __str__(self):
        return f"{self.asset.asset_name} - {self.employee.employee_name}"
    

# ==========================
# Recycling Model
# ==========================
class Recycling(models.Model):

    METHOD_CHOICES = [
        ("Recycle", "Recycle"),
        ("Reuse", "Reuse"),
        ("Scrap", "Scrap"),
    ]

    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE
    )

    recycle_date = models.DateField()

    method = models.CharField(
        max_length=20,
        choices=METHOD_CHOICES
    )

    reason = models.TextField()

    recycled_by = models.CharField(max_length=100)

    def __str__(self):
        return self.asset.asset_name
