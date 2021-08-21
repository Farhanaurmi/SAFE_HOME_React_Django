from django.db import models
from django.contrib.auth.models import User


class Apartmentdetails(models.Model):
    title=models.CharField(max_length=200, null=True, blank=True)
    price=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    details=models.CharField(max_length=400, null=True, blank=True)
    availability=models.BooleanField(default=True)
    photo=models.ImageField(null=True, blank=True, default='/images.png')


class Booking(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    apartmentdetails=models.ForeignKey(Apartmentdetails, on_delete=models.SET_NULL, null=True)
    isPaid=models.BooleanField(default=False)
    paidAt=models.DateTimeField(null=True, blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)

