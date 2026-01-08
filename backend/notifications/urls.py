from django.urls import path
from .views import my_notifications, mark_as_read

urlpatterns = [
    path("my/", my_notifications),
    path("read/", mark_as_read),
]
