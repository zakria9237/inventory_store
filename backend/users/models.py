from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("inventory_manager", "Inventory Manager"),
        ("sales_staff", "Sales Staff"),
    )

    phone = models.CharField(max_length=20, blank=True, null=True)  # FIX ADDED

    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="sales_staff")

    def __str__(self):
        return self.username
