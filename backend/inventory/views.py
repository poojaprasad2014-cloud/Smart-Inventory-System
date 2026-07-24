from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date, timedelta

from .models import (
    Category,
    Asset,
    Employee,
    AssetAssignment,
    Maintenance,
    Recycling
)

from .serializers import (
    CategorySerializer,
    AssetSerializer,
    EmployeeSerializer,
    AssetAssignmentSerializer,
    MaintenanceSerializer,
    RecyclingSerializer
)


# ==========================
# Category
# ==========================
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ==========================
# Asset
# ==========================
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


# ==========================
# Employee
# ==========================
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# ==========================
# Asset Assignment
# ==========================
class AssetAssignmentViewSet(viewsets.ModelViewSet):
    queryset = AssetAssignment.objects.all()
    serializer_class = AssetAssignmentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        employee = self.request.query_params.get("employee")

        if employee:
            queryset = queryset.filter(employee_id=employee)

        return queryset


# ==========================
# Maintenance
# ==========================
class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all().order_by("-id")
    serializer_class = MaintenanceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        employee = self.request.query_params.get("employee")

        if employee:
            queryset = queryset.filter(employee_id=employee)

        return queryset
    
# ==========================
# Recycling
# ==========================
class RecyclingViewSet(viewsets.ModelViewSet):
    queryset = Recycling.objects.all().order_by("-id")
    serializer_class = RecyclingSerializer


# ==========================
# Employee Login
# ==========================
@api_view(["POST"])
def employee_login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:

        employee = Employee.objects.get(
            email=email,
            password=password
        )

        return Response({
            "status": True,
            "id": employee.id,
            "employee_id": employee.employee_id,
            "employee_name": employee.employee_name,
            "email": employee.email,
            "department": employee.department,
            "designation": employee.designation,
        })

    except Employee.DoesNotExist:

        return Response(
            {
                "status": False,
                "message": "Invalid Email or Password"
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
# ==========================
# Warranty Alert
# ==========================
@api_view(["GET"])
def warranty_alert(request):

    today = date.today()
    next_30_days = today + timedelta(days=30)

    assets = Asset.objects.filter(
        warranty_expiry__gte=today,
        warranty_expiry__lte=next_30_days
    )

    data = []

    for asset in assets:
        data.append({
            "id": asset.id,
            "asset_id": asset.asset_id,
            "asset_name": asset.asset_name,
            "brand": asset.brand,
            "warranty_expiry": asset.warranty_expiry,
            "days_left": (asset.warranty_expiry - today).days
        })

    return Response(data)