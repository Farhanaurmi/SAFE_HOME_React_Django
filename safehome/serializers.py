from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    isAdmin=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields= ['id','username','email','isAdmin']

    def get_isAdmin(self,obj):
        return obj.is_staff

    

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields= ['id','username','email','isAdmin','token']

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)


class ApartmentdetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Apartmentdetails
        fields= '__all__'


class BookingSerializer(serializers.ModelSerializer):
    apartmentdetails=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Booking
        fields= '__all__'

    def get_apartmentdetails(self,obj):
        serializer=ApartmentdetailsSerializer(obj.apartmentdetails, many=False)
        return serializer.data

    def get_user(self,obj):
        user=obj.user
        serializer=UserSerializer(user, many=False)
        return serializer.data

