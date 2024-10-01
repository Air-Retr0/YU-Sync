from rest_framework import viewsets
from django.db.models import Q
from coursedata.models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    # Override the get_queryset method to filter based on the 'search' query param
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(dept__icontains=search) | 
                Q(code__icontains=search)
            )
        return queryset