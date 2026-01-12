from django.urls import path
from .views import checkout, my_sales, all_sales

urlpatterns = [
    path("checkout/", checkout),
    path("my-sales/", my_sales),
    path("", all_sales),  # inventory manager → all sales
]
