from rest_framework import serializers

class CheckDamageSerializer(serializers.Serializer):
    img_url = serializers.URLField()
    img_name = serializers.CharField()
    damage = serializers.CharField()
    