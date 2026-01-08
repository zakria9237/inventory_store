from django.db import models, transaction
from django.conf import settings
from products.models import Product

class Sale(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.pk:
            return super().save(*args, **kwargs)

        if self.product.stock < self.quantity:
            raise ValueError("Not enough stock")

        with transaction.atomic():
            self.total_price = self.product.price * self.quantity
            self.product.stock -= self.quantity
            self.product.save()
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"
