from django.urls import path
from .views import add_to_cart, get_cart, update_cart_item, remove_from_cart

urlpatterns = [
    path("get/", get_cart, name="get_cart"),
    path("add/", add_to_cart, name="add_to_cart"),
    path("update/", update_cart_item, name="update_cart_item"),
    path("remove/", remove_from_cart, name="remove_from_cart"),
]
