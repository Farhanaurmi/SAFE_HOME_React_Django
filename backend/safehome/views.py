from django.core.checks import messages
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from datetime import datetime
from django.core.paginator import Paginator
from .models import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v


        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user=User.objects.create( 
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={'details':'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createApartment(request):
    user=request.user
    apartment=Apartmentdetails.objects.create(
        title=' ',
        price=0,
        details=' ',
    )
    serializer=ApartmentdetailsSerializer(apartment, many=False)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateApartment(request,pk):
    user=request.user
    data=request.data
    apartment= Apartmentdetails.objects.get(id=pk)

    apartment.title=data['title']
    apartment.price=data['price']
    apartment.details=data['details']
    apartment.availability=data['availability']


    apartment.save()
    serializer=ApartmentdetailsSerializer(apartment, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def updateImage(request):
    data = request.data
    apartmentId = data['apartment_id']
    apartment = Apartmentdetails.objects.get(id=apartmentId)
    apartment.photo = request.FILES.get('image')
    apartment.save()

    return Response("picture was uploaded")


@api_view(['GET'])
def getApartment(request):
    user = request.user
    apartment = Apartmentdetails.objects.filter(availability=True)
    serializer = ApartmentdetailsSerializer(apartment, many = True)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteApartment(request,pk):
    apartmentDeletion= Apartmentdetails.objects.get(id=pk)
    apartmentDeletion.delete()

    return Response("Apartment deleted")

@api_view(['GET'])
def getApartmentById(request,pk):
    apartmentDetails= Apartmentdetails.objects.get(id=pk)
    serializer = ApartmentdetailsSerializer(apartmentDetails, many = False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBooking(request):
    user=request.user
    data=request.data
    apartment=Apartmentdetails.objects.get(id=data['apartment_id'])

    booking=Booking.objects.create(
        user=user,
        apartmentdetails=apartment,
    )

    serializers=BookingSerializer(booking, many=False)

    apartment.availability=False
    apartment.save()
    
    return Response(serializers.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBookingToPaid(request,pk):
    booking= Booking.objects.get(id=pk)
    booking.isPaid=True
    booking.paidAt= datetime.now()
    order.save()

    return Response("booking paid")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBooking(request):
    user = request.user
    booking = user.booking_set.all()
    serializer = BookingSerializer(booking, many = True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBookingById(request,pk):
    booking = Booking.objects.get(id=pk)
    serializer = BookingSerializer(booking, many = False)

    return Response(serializer.data)

