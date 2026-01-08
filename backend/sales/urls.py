from django.urls import path
from .views import checkout, my_sales

urlpatterns = [
    path("checkout/", checkout),
    path("my-sales/", my_sales),
]
