from django.urls import path
from .views import inventory_list, update_inventory

urlpatterns = [
    path("list/", inventory_list),
    path("update/", update_inventory),
]
