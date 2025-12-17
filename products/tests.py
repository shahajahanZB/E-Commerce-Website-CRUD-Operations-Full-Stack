from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Product


class ProductUpdateDeleteAPITests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name="Old name",
            description="Old description",
            price=Decimal("9.99"),
            stock=10,
            is_active=True,
        )

    def test_update_product(self):
        url = reverse("product-update", args=[self.product.pk])
        payload = {
            "name": "Updated name",
            "description": "Updated description",
            "price": "19.99",
            "stock": 5,
            "is_active": True,
        }

        response = self.client.put(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, payload["name"])
        self.assertEqual(self.product.description, payload["description"])
        self.assertEqual(self.product.price, Decimal(payload["price"]))
        self.assertEqual(self.product.stock, payload["stock"])
        self.assertTrue(self.product.is_active)

    def test_delete_product(self):
        url = reverse("product-delete", args=[self.product.pk])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(pk=self.product.pk).exists())
