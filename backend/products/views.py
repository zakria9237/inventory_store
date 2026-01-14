from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model

from .models import Product
from .serializers import ProductSerializer
from notifications.models import Notification

User = get_user_model()


# -------------------------
# Product List + Create
# -------------------------
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "inventory_manager":
            raise PermissionDenied("Only Inventory Manager can add products")

        product = serializer.save(created_by=self.request.user)

        # 🔔 INVENTORY MANAGER NOTIFICATION
        Notification.objects.create(
            user=self.request.user,
            message=f"Product added: {product.name}"
        )


# -------------------------
# Product Detail (Update + Delete)
# -------------------------
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user.role != "inventory_manager":
            raise PermissionDenied("Only Inventory Manager can update products")

        product = serializer.save()

        # 🔔 INVENTORY MANAGER NOTIFICATION
        Notification.objects.create(
            user=self.request.user,
            message=f"Product updated: {product.name}"
        )

    def perform_destroy(self, instance):
        if self.request.user.role != "inventory_manager":
            raise PermissionDenied("Only Inventory Manager can delete products")

        # 🔔 INVENTORY MANAGER NOTIFICATION
        Notification.objects.create(
            user=self.request.user,
            message=f"Product deleted: {instance.name}"
        )

        instance.delete()
