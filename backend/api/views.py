from django.conf import settings
from django.core.mail import send_mail
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import resend

from .models import TeamMember
from .serializers import ContactInquirySerializer, TeamMemberSerializer


class HomePageView(APIView):
    def get(self, request):
        return Response({
            "success": True,
            "message": "Welcome to Kaizen Agentics API",
            "version": "1.0.0",
        })


class TeamMemberListView(APIView):
    def get(self, request):
        members = TeamMember.objects.filter(is_active=True)
        serializer = TeamMemberSerializer(members, many=True, context={"request": request})
        return Response({"success": True, "results": serializer.data})


@method_decorator(csrf_exempt, name="dispatch")
class ContactInquiryView(APIView):
    def post(self, request):
        serializer = ContactInquirySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        inquiry = serializer.save()
        self._send_notification(inquiry)

        return Response(
            {"success": True, "message": "Your inquiry has been received. We'll be in touch shortly."},
            status=status.HTTP_201_CREATED,
        )

    def _send_notification(self, inquiry):
        recipient = settings.CONTACT_RECIPIENT_EMAIL
        subject = f"New inquiry from {inquiry.full_name} — {inquiry.company}"
        body = (
            f"Name: {inquiry.full_name}\n"
            f"Company: {inquiry.company}\n"
            f"Email: {inquiry.email}\n"
            f"Phone: {inquiry.phone or '—'}\n"
            f"Country: {inquiry.country}\n"
            f"Service: {inquiry.service}\n"
            f"Budget: {inquiry.budget}\n\n"
            f"Project Details:\n{inquiry.details}\n"
        )

        resend.api_key = settings.RESEND_API_KEY
        resend.Emails.send({
            "from": settings.DEFAULT_FROM_EMAIL,
            "to": [recipient],
            "subject": subject,
            "text": body,
        })