from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand

from api.models import TeamMember


class Command(BaseCommand):
    help = "Seed initial team members with demo photos"

    def handle(self, *args, **options):
        seed_dir = Path(__file__).resolve().parents[2] / "seed_assets"
        demo_photo = seed_dir / "founder_demo.jpg"

        if not demo_photo.exists():
            self.stderr.write(self.style.ERROR(f"Demo photo not found at {demo_photo}"))
            return

        member, created = TeamMember.objects.get_or_create(
            name="Kajal Poojari",
            defaults={
                "designation": "Founder",
                "role": TeamMember.Role.FOUNDER,
                "bio": (
                    "Kajal Poojari founded Kaizen Agentics with a vision to help organizations "
                    "build intelligent systems — combining AI, software engineering, and modern "
                    "data platforms to deliver measurable business impact."
                ),
                "display_order": 1,
                "is_active": True,
            },
        )

        if created or not member.photo:
            with demo_photo.open("rb") as f:
                member.photo.save("kajal_poojari.jpg", File(f), save=True)

        member.designation = "Founder"
        member.role = TeamMember.Role.FOUNDER
        member.is_active = True
        member.save()

        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{action} team member: {member.name}"))
