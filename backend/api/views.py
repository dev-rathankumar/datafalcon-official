from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response



class HomePageView(APIView):
    def get(self, request):
        return Response({
            "success": True,
            "message": "Welcome to DataFalcon API",
            "version": "1.0.0"
        })