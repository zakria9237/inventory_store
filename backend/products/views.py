from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Product
from .serializers import ProductSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "inventory_manager":
            raise PermissionDenied("Only Inventory Manager can add products")
        serializer.save(created_by=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user.role != "inventory_manager":
            raise PermissionDenied("Only Inventory Manager can update products")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.role != "inventory_manager":
            raise PermissionDenied("Only Inventory Manager can delete products")
        instance.delete()
