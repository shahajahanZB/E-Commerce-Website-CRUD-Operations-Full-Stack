from django.urls import path
from .views import (
    product_list_create,
    product_detail,
    product_update,
    product_delete,
    tag_list_create,
    products_by_tag,
)

urlpatterns = [
    path("products/", product_list_create),
    path("products/<int:pk>/", product_detail),
    path("products/<int:pk>/update/", product_update),
    path("products/<int:pk>/delete/", product_delete),
    path("tags/", tag_list_create),
    path("tags/<str:name>/products/", products_by_tag),
]
