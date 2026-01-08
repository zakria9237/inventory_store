from rest_framework import serializers
from .models import Inventory

class InventorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    is_low_stock = serializers.ReadOnlyField()

    class Meta:
        model = Inventory
        fields = [
            "id",
            "product",
            "product_name",
            "quantity",
            "is_low_stock",
            "updated_at",
        ]
