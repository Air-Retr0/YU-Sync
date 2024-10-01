from django.urls import path, include
from rest_framework.routers import DefaultRouter
from courseviews import get_course_data



urlpatterns = [
    path('coursedata/courses/', get_course_data, name='get_course_data'),
]