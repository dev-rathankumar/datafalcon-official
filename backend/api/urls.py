from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.HomePageView.as_view(), name="home"),
    path("team/", views.TeamMemberListView.as_view(), name="team-list"),
    path("contact/", views.ContactInquiryView.as_view(), name="contact"),
]
