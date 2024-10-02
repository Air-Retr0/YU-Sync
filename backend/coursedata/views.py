# from django.http import JsonResponse
# from .models import Course

# def course_list(request):
#     search_query = request.GET.get('search', '')
#     # Fetch courses based on the search query, ensure fields are correct
#     courses = Course.objects.filter(name__icontains=search_query)

#     # Prepare the response data
#     response_data = []
#     for course in courses:
#         response_data.append({
#             "dept": course.dept or 'N/A',  
#             "code": course.code or 'N/A', 
#             "credit": course.credit or 0,  
#             "name": course.name or 'Unnamed Course', 
#             "prereqs": course.prereqs or 'None',  
#             "desc": course.desc or 'No description available',  #
#         })

#     # Log response data for debugging
#     print('Response Data:', response_data)  # Add logging here

#     return JsonResponse(response_data, safe=False)
