from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # API routes
    path("api/users/", include("users.urls")),
    path("api/products/", include("products.urls")),
    path("api/inventory/", include("inventory.urls")),
    path("api/sales/", include("sales.urls")),
    path("api/notifications/", include("notifications.urls")),
    path("api/cart/", include("cart.urls")),


]
