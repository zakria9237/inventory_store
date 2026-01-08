from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from cart.models import Cart, CartItem

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
        item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id)

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()
        return Response({"detail": "Added to cart"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)

# ---------------------------
# Get cart items (always array)
# ---------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    try:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = cart.cartitem_set.all()

        data = [
            {
                "id": item.id,
                "product": getattr(item.product, "name", ""),
                "price": getattr(item.product, "price", 0),
                "quantity": item.quantity or 0,
                "subtotal": getattr(item, "subtotal", 0),
            }
            for item in items
        ]
        return Response(data)
    except Exception:
        # ⚡ Hamesha array return karo
        return Response([], status=200)

# ---------------------------
# Update cart item
# ---------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    try:
        item_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 0))

        item = CartItem.objects.get(id=item_id)
        item.quantity = quantity
        item.save()
        return Response({"detail": "Updated"})
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

# ---------------------------
# Remove cart item
# ---------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    try:
        item_id = request.data.get("item_id")
        CartItem.objects.filter(id=item_id).delete()
        return Response({"detail": "Removed"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)
