from django.http import JsonResponse
from django.views import View
from django.db.models import Q
from coursedata.models import Course
from backend.serializers import CourseSerializer
from django.shortcuts import get_object_or_404
from rest_framework import generics

class CourseListView(View):
    def get(self, request):
        
        courses = Course.objects.all()

        #
        search_query = request.GET.get('search', '').strip().lower()
        if search_query:
           
            courses = courses.filter(
                Q(dept__icontains=search_query) | 
                Q(code__icontains=search_query) | 
                Q(name__icontains=search_query)
            )

        data = list(courses.values('dept', 'code', 'credit', 'name', 'prereqs', 'desc'))
        return JsonResponse(data, safe=False)

class CourseDetailView(View):
    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        data = {
            'dept': course.dept,
            'code': course.code,
            'credit': course.credit,
            'name': course.name,
            'prereqs': course.prereqs,
            'desc': course.desc,
        }
        return JsonResponse(data)

class SubPageCourseDept(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        dept = self.kwargs['dept']
        return Course.objects.filter(dept=dept)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = CourseSerializer(queryset, many=True)  
        return JsonResponse(serializer.data, safe=False)


class SubPageCourseDetails(generics.RetrieveAPIView):
    serializer_class = CourseSerializer

    def get_object(self):
        queryset = Course.objects.all()
        dept = self.kwargs['dept']
        code = self.kwargs['code']
        return get_object_or_404(queryset, dept=dept, code=code)