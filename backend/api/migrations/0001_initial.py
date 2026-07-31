# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactInquiry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("full_name", models.CharField(max_length=120)),
                ("company", models.CharField(max_length=160)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("country", models.CharField(max_length=120)),
                ("service", models.CharField(max_length=120)),
                ("budget", models.CharField(max_length=60)),
                ("details", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name_plural": "Contact inquiries",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="TeamMember",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("designation", models.CharField(max_length=160)),
                ("role", models.CharField(choices=[("founder", "Founder"), ("co_founder", "Co-Founder"), ("team", "Team Member")], default="team", max_length=20)),
                ("photo", models.ImageField(upload_to="team/")),
                ("bio", models.TextField(blank=True)),
                ("linkedin_url", models.URLField(blank=True)),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["display_order", "name"],
            },
        ),
    ]
