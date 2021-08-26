from django.urls import path
from . import views


urlpatterns = [
    
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register', views.registerUser ,name="user-register"),
    path('users/profile', views.getUserProfile, name='user'),
    path('users/profile/update', views.updateUserProfile, name="user-profile-update"),
    
    path('apartment', views.getApartment, name="get-Apartment"),
    path('apartment/create', views.createApartment, name="create-Apartment"),
    path('apartment/<int:pk>', views.getApartmentById, name="get-ApartmentById"),
    path('apartment/image/update', views.updateImage, name="update-Image"),
    path('apartment/delete/<int:pk>', views.deleteApartment, name="delete-Apartment"),
    path('apartment/update/<int:pk>', views.updateApartment, name="update-Apartment"),

    path('booking', views.getMyBooking, name="get-MyBooking"),
    path('booking/create', views.createBooking, name="create-Booking"),
    path('booking/pay/update', views.updateBookingToPaid, name="update-Paid"),
    path('booking/<int:pk>', views.getBookingById, name="get-Booking-ID"),
]