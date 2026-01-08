from rest_framework import serializers
from .models import Cart, CartItem

# Add this serializer for CartItem if it doesn't exist already
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]  # keep the fields you need

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(source="cartitem_set", many=True, read_only=True)
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total_amount"]

    def get_total_amount(self, obj):
        return obj.total_amount
