from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CheckDamageSerializer
from ML.object_detect import detect
from ML.obj_detect_inv import detect_obj
from ML.prompt2 import generate_reports
import re


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


class generateReportsAPI(APIView):
    def post(self, request):
        try:
            url = request.data["url"]
            prompt = "Give a detail report of the given room in terms of organisation, cleaniness, abnormalities, damageness(if any)."
            report = generate_reports(url, prompt)

            return Response({"result": report}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"expection": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class rateCustomerAPI(APIView):
    def post(self, request):
        try:
            url = request.data["url"]
            prompt = "this image is clicked after the staff has cleaned the room, rate the staff's work out of 10 based on hotel management policy and also give appropriate reason for this rating"
            report = generate_reports(url, prompt)
            score = re.search(r"\b\d+\b", report)
            if score:
                score = int(score.group())
                print(score)
            else:
                score = 5
            return Response({"result": report,"score":score}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"expection": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class checkInventoryAPI(APIView):
    def post(self, request):
        try:
            before = request.data["before_url"]
            after = request.data["after_url"]
            print(before, after)
            l = [
                "towels",
                "waterbottle",
                "hair dyer",
                "tissue box",
                "hand wash",
                "glass",
            ]
            before_list = detect_obj(before, l)
            after_list = detect_obj(after, l)
            print(before_list)
            print(after_list)
            before_indices = set(item[1] for item in before_list)
            after_indices = set(item[1] for item in after_list)

            # Find missing indices in after_array
            missing_indices = before_indices - after_indices

            # Print missing items based on the first index
            missing_items = [item for item in before_list if item[1] in missing_indices]
            for item in missing_items:
                print(item)
            return Response({"result": missing_items}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"expection": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
