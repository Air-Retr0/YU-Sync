from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend.views import CourseViewSet

router = DefaultRouter()
router.register(r'coursedata/courses', CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
]