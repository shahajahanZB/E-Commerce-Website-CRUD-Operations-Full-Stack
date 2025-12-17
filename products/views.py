from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, Tag
from .serializers import ProductSerializer, TagSerializer


@api_view(["GET", "POST"])
def product_list_create(request):
    """List all products or create a new one. Supports filtering by ?tag=name."""
    if request.method == "GET":
        tag_name = request.query_params.get("tag")
        products = Product.objects.all()
        if tag_name:
            products = products.filter(tags__name__iexact=tag_name).distinct()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    serializer = ProductSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def product_detail(request, pk):
    """Retrieve a single product."""
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(["PUT", "PATCH"])
def product_update(request, pk):
    """Update an existing product."""
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(
        product, data=request.data, partial=request.method == "PATCH"
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(["DELETE"])
def product_delete(request, pk):
    """Delete an existing product."""
    product = get_object_or_404(Product, pk=pk)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def tag_list_create(request):
    """List all tags or create a new one."""
    if request.method == "GET":
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

    serializer = TagSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def products_by_tag(request, name):
    """Return products that have the given tag name."""
    tag = get_object_or_404(Tag, name__iexact=name)
    products = tag.products.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

