from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Inventory
from products.models import Product
from notifications.models import Notification


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def inventory_list(request):
    if request.user.role != "inventory_manager":
        return Response({"detail": "Unauthorized"}, status=403)

    inventory = Inventory.objects.select_related("product").all()

    from .serializers import InventorySerializer
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_inventory(request):
    if request.user.role != "inventory_manager":
        return Response({"detail": "Unauthorized"}, status=403)

    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 0))

    if not product_id:
        return Response({"detail": "Product ID required"}, status=400)

    try:
        product = Product.objects.get(id=product_id)
        inventory, _ = Inventory.objects.get_or_create(product=product)

        inventory.quantity += quantity
        if inventory.quantity < 0:
            inventory.quantity = 0
        inventory.save()

        # sync product stock
        product.stock = inventory.quantity
        product.save()

        # 🔔 SAFE NOTIFICATION (sirf inventory manager ke liye)
        Notification.objects.create(
            user=request.user,
            message=f"Inventory updated: {product.name} → Qty {inventory.quantity}"
        )

        return Response({
            "message": "Inventory updated successfully",
            "quantity": inventory.quantity
        })

    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)
