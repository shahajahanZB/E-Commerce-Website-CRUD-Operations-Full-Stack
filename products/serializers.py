from rest_framework import serializers
from .models import Product, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class ProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True,
        required=False,
        help_text="List of tag names to assign to the product.",
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "stock",
            "is_active",
            "created_at",
            "updated_at",
            "tags",
            "tag_names",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def _get_or_create_tags(self, tag_names):
        """Ensure all provided tag names exist and return Tag queryset."""
        tags = []
        for name in tag_names:
            normalized_name = name.strip()
            if not normalized_name:
                continue
            tag, _ = Tag.objects.get_or_create(name=normalized_name)
            tags.append(tag)
        return tags

    def create(self, validated_data):
        tag_names = validated_data.pop("tag_names", [])
        product = super().create(validated_data)
        if tag_names:
            product.tags.set(self._get_or_create_tags(tag_names))
        return product

    def update(self, instance, validated_data):
        tag_names = validated_data.pop("tag_names", None)
        product = super().update(instance, validated_data)
        if tag_names is not None:
            product.tags.set(self._get_or_create_tags(tag_names))
        return product
