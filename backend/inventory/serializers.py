from rest_framework import serializers

from .models import (
    Category,
    Asset,
    Employee,
    AssetAssignment,
    Maintenance,
    Recycling
)


# ==========================
# Category Serializer
# ==========================
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


# ==========================
# Asset Serializer
# ==========================
class AssetSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.category_name",
        read_only=True
    )

    class Meta:
        model = Asset
        fields = [
            "id",
            "asset_id",
            "asset_name",
            "brand",
            "model",
            "serial_number",
            "purchase_date",
            "warranty_expiry",
            "price",
            "location",
            "status",
            "category",
            "category_name",
        ]


# ==========================
# Employee Serializer
# ==========================
class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"


# ==========================
# Asset Assignment Serializer
# ==========================
class AssetAssignmentSerializer(serializers.ModelSerializer):

    asset_id = serializers.CharField(
        source="asset.asset_id",
        read_only=True
    )

    asset_name = serializers.CharField(
        source="asset.asset_name",
        read_only=True
    )

    category_name = serializers.CharField(
        source="asset.category.category_name",
        read_only=True
    )

    asset_status = serializers.CharField(
        source="asset.status",
        read_only=True
    )

    employee_id = serializers.CharField(
        source="employee.employee_id",
        read_only=True
    )

    employee_name = serializers.CharField(
        source="employee.employee_name",
        read_only=True
    )

    class Meta:
        model = AssetAssignment
        fields = [
            "id",
            "asset",
            "asset_id",
            "asset_name",
            "category_name",
            "asset_status",
            "employee",
            "employee_id",
            "employee_name",
            "assigned_date",
            "return_date",
        ]


# ==========================
# Maintenance Serializer
# ==========================
class MaintenanceSerializer(serializers.ModelSerializer):

    asset_id = serializers.CharField(
        source="asset.asset_id",
        read_only=True
    )

    asset_name = serializers.CharField(
        source="asset.asset_name",
        read_only=True
    )

    employee_id = serializers.CharField(
        source="employee.employee_id",
        read_only=True
    )

    employee_name = serializers.CharField(
        source="employee.employee_name",
        read_only=True
    )

    class Meta:
        model = Maintenance
        fields = [
            "id",
            "asset",
            "asset_id",
            "asset_name",
            "employee",
            "employee_id",
            "employee_name",
            "issue",
            "reported_date",
            "completed_date",
            "status",
        ]

# ==========================
# Recycling Serializer
# ==========================
class RecyclingSerializer(serializers.ModelSerializer):

    asset_id = serializers.CharField(
        source="asset.asset_id",
        read_only=True
    )

    asset_name = serializers.CharField(
        source="asset.asset_name",
        read_only=True
    )

    category_name = serializers.CharField(
        source="asset.category.category_name",
        read_only=True
    )

    class Meta:
        model = Recycling
        fields = [
            "id",
            "asset",
            "asset_id",
            "asset_name",
            "category_name",
            "recycle_date",
            "method",
            "reason",
            "recycled_by",
        ]