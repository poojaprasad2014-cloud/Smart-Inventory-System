from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    AssetViewSet,
    EmployeeViewSet,
    AssetAssignmentViewSet,
    MaintenanceViewSet,
    RecyclingViewSet,
    employee_login,
    warranty_alert,
)

router = DefaultRouter()

router.register("categories", CategoryViewSet)
router.register("assets", AssetViewSet)
router.register("employees", EmployeeViewSet)
router.register("assignments", AssetAssignmentViewSet)
router.register("maintenance", MaintenanceViewSet)
router.register("recycling", RecyclingViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("employee-login/", employee_login),
    path("warranty-alert/", warranty_alert),
]