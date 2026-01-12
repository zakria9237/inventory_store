from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from cart.models import Cart, CartItem
from .models import Sale
from .serializers import SaleSerializer

# -------------------------
# Checkout (sales staff)
# -------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def checkout(request):
    if request.user.role != "sales_staff":
        return Response({"detail": "Only sales staff can checkout"}, status=403)

    cart = Cart.objects.filter(user=request.user).first()
    if not cart:
        return Response({"detail": "Cart empty"}, status=400)

    items = CartItem.objects.filter(cart=cart)
    if not items.exists():
        return Response({"detail": "Cart empty"}, status=400)

    for item in items:
        Sale.objects.create(
            user=request.user,
            product=item.product,
            quantity=item.quantity,
        )

    items.delete()
    return Response({"detail": "Checkout successful"}, status=201)


# -------------------------
# My Sales (sales staff)
# -------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_sales(request):
    sales = Sale.objects.filter(user=request.user).order_by("-created_at")
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)


# -------------------------
# All Sales (inventory manager)
# -------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_sales(request):
    if request.user.role != "inventory_manager":
        return Response({"detail": "Not allowed"}, status=403)

    sales = Sale.objects.all().order_by("-created_at")
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)
