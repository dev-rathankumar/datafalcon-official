from django.db import models


class TeamMember(models.Model):
    class Role(models.TextChoices):
        FOUNDER = "founder", "Founder"
        CO_FOUNDER = "co_founder", "Co-Founder"
        TEAM = "team", "Team Member"

    name = models.CharField(max_length=120)
    designation = models.CharField(max_length=160)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.TEAM)
    photo = models.ImageField(upload_to="team/")
    bio = models.TextField(blank=True)
    linkedin_url = models.URLField(blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return f"{self.name} — {self.get_role_display()}"


class ContactInquiry(models.Model):
    full_name = models.CharField(max_length=120)
    company = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    country = models.CharField(max_length=120)
    service = models.CharField(max_length=120)
    budget = models.CharField(max_length=60)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Contact inquiries"

    def __str__(self):
        return f"{self.full_name} — {self.company}"
