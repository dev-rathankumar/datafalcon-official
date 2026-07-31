from rest_framework import serializers

from .models import ContactInquiry, TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    role_label = serializers.CharField(source="get_role_display", read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = [
            "id",
            "name",
            "designation",
            "role",
            "role_label",
            "photo_url",
            "bio",
            "linkedin_url",
            "display_order",
        ]

    def get_photo_url(self, obj):
        if not obj.photo:
            return None
        request = self.context.get("request")
        url = obj.photo.url
        if request:
            return request.build_absolute_uri(url)
        return url


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = [
            "full_name",
            "company",
            "email",
            "phone",
            "country",
            "service",
            "budget",
            "details",
        ]
