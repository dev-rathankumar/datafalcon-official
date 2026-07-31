from django.contrib import admin

from .models import ContactInquiry, TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "role", "display_order", "is_active")
    list_filter = ("role", "is_active")
    search_fields = ("name", "designation")
    ordering = ("display_order", "name")


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("full_name", "company", "email", "service", "budget", "created_at")
    list_filter = ("service", "budget", "created_at")
    search_fields = ("full_name", "company", "email")
    readonly_fields = ("created_at",)
