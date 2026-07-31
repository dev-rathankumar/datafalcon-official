import subprocess

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Build the React frontend into frontend/dist for Django to serve."

    def add_arguments(self, parser):
        parser.add_argument(
            "--collectstatic",
            action="store_true",
            help="Run collectstatic after the frontend build.",
        )

    def handle(self, *args, **options):
        frontend_dir = settings.BASE_DIR.parent / "frontend"
        if not (frontend_dir / "package.json").exists():
            self.stderr.write(self.style.ERROR(f"Frontend not found at {frontend_dir}"))
            return

        self.stdout.write("Building frontend...")
        subprocess.run(["npm", "run", "build"], cwd=frontend_dir, check=True)
        self.stdout.write(self.style.SUCCESS("Frontend built to frontend/dist"))

        if options["collectstatic"]:
            call_command("collectstatic", "--noinput")
            self.stdout.write(self.style.SUCCESS("Static files collected"))
