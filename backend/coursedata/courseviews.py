from django.http import JsonResponse
from django.views import View
from coursedata.models import Course
from django.shortcuts import get_object_or_404

class CourseListView(View):
    def get(self, request):
        # Retrieve all courses or filter based on query parameters
        courses = Course.objects.all()

        # Optionally, handle search queries from the frontend
        search_query = request.GET.get('search', '').strip().lower()
        if search_query:
            courses = courses.filter(name__icontains=search_query)

        # Convert the queryset to a list of dictionaries
        data = list(courses.values('dept', 'code', 'credit', 'name', 'prereqs', 'desc'))
        return JsonResponse(data, safe=False)

# Optionally, create a detailed view for individual courses
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
