from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cart.models import Cart, CartItem
from .models import Sale
from .serializers import SaleSerializer
from notifications.models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()


# -------------------------
# Checkout
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

    # 🔔 SELF
    Notification.objects.create(
        user=request.user,
        message="Checkout completed successfully"
    )

    # 👥 OTHER SALES STAFF
    for staff in User.objects.filter(role="sales_staff").exclude(id=request.user.id):
        Notification.objects.create(
            user=staff,
            message=f"{request.user.username} completed checkout"
        )

    # 📦 INVENTORY MANAGER
    for manager in User.objects.filter(role="inventory_manager"):
        Notification.objects.create(
            user=manager,
            message=f"Checkout completed by {request.user.username}"
        )

    items.delete()
    return Response({"detail": "Checkout successful"}, status=201)


# -------------------------
# My sales ✅ (MISSING THA)
# -------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_sales(request):
    sales = Sale.objects.filter(user=request.user).order_by("-created_at")
    return Response(SaleSerializer(sales, many=True).data)


# -------------------------
# All sales
# -------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_sales(request):
    if request.user.role != "inventory_manager":
        return Response({"detail": "Not allowed"}, status=403)

    sales = Sale.objects.all().order_by("-created_at")
    return Response(SaleSerializer(sales, many=True).data)
