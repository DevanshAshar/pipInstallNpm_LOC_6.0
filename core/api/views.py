from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CheckDamageSerializer
from ML.object_detect import detect


class checkDamageAPI(APIView):

    def post(self, request):
        try:
            
            img = request.data["url"]
            l = [
                "bed",
                "laptop",
                "cupboard",
                "TV",
                "pillow",
                "blankets",
                "human",
                "lamp",
            ]
            result = detect(img, l)
            return Response({"result": result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"expection": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
