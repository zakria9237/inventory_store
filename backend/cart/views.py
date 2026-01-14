from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cart.models import Cart, CartItem
from notifications.models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()


# ---------------------------
# Add item to cart
# ---------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        cart, _ = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_id=product_id
        )

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()

        # 🔔 SALES STAFF SELF
        if request.user.role == "sales_staff":
            Notification.objects.create(
                user=request.user,
                message=f"{item.product.name} added to cart (Qty: {quantity})"
            )

            # 👥 OTHER SALES STAFF
            for staff in User.objects.filter(role="sales_staff").exclude(id=request.user.id):
                Notification.objects.create(
                    user=staff,
                    message=f"{request.user.username} added {item.product.name} to cart"
                )

            # 📦 INVENTORY MANAGER
            for manager in User.objects.filter(role="inventory_manager"):
                Notification.objects.create(
                    user=manager,
                    message=f"{item.product.name} added to cart by {request.user.username}"
                )

        return Response({"detail": "Added to cart"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)


# ---------------------------
# Get cart items  ✅ (MISSING THA)
# ---------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    items = cart.cartitem_set.all()

    data = [
        {
            "id": item.id,
            "product": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity,
            "subtotal": item.subtotal,
        }
        for item in items
    ]
    return Response(data)


# ---------------------------
# Update cart item
# ---------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    item_id = request.data.get("item_id")
    quantity = int(request.data.get("quantity", 0))

    item = CartItem.objects.get(id=item_id)
    item.quantity = quantity
    item.save()
    return Response({"detail": "Updated"})


# ---------------------------
# Remove cart item
# ---------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get("item_id")
    CartItem.objects.filter(id=item_id).delete()
    return Response({"detail": "Removed"})
