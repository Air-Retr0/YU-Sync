from django.http import JsonResponse
from coursedata.models import Course 

def get_course_data(request):
    search_query = request.GET.get('search', '')
    # Fetch courses based on the search query
    courses = Course.objects.filter(name__icontains=search_query)  # Adjust filtering as needed

    # Prepare the response data
    response_data = []
    for course in courses:
        response_data.append({
            "dept": course.dept,
            "code": course.code,
            "credit": course.credit,
            "name": course.name,
            "prereqs": course.prereqs if course.prereqs else 'None',
            "desc": course.desc if course.desc else 'No description available',
        })

    return JsonResponse(response_data, safe=False)
