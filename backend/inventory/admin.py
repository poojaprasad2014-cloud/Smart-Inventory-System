from django.contrib import admin
from .models import Category, Asset, Employee, AssetAssignment, Maintenance

admin.site.register(Category)
admin.site.register(Asset)
admin.site.register(Employee)
admin.site.register(AssetAssignment)
admin.site.register(Maintenance)