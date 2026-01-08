from rest_framework import serializers
from .models import Sale
from products.models import Product

class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price"]

class SaleSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True)

    class Meta:
        model = Sale
        fields = ["id", "product", "quantity", "total_price", "created_at"]
