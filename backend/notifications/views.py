from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_notifications(request):
    qs = Notification.objects.filter(user=request.user).order_by("-created_at")
    return Response(NotificationSerializer(qs, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_as_read(request):
    nid = request.data.get("notification_id")
    Notification.objects.filter(id=nid, user=request.user).update(is_read=True)
    return Response({"success": True})
