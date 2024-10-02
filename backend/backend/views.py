# from django.db.models import Q
# from django.http import JsonResponse
# from coursedata.models import Course
# import json

# def search_courses(request):
#     query = request.GET.get('query', '')
#     print(f"Received search query: {query}")  # Debug print
    
#     if query:
#         courses = Course.objects.filter(
#             Q(dept__icontains=query) |
#             Q(code__icontains=query) |
#             Q(name__icontains=query)
#         ).values('dept', 'code', 'name', 'credit')[:20]  # Limit to 20 results for performance
        
#         results = list(courses)
#         print(f"Found {len(results)} results")  # Debug print
#         print(f"Results: {json.dumps(results, indent=2)}")  # Debug print
#         return JsonResponse(results, safe=False)
    
#     print("No query provided, returning empty list")
#     return JsonResponse([], safe=False)
# from django.http import JsonResponse
# from coursedata.models import Course  # Assuming the Course model exists in your app

# def course_list(request):
#     search_query = request.GET.get('search', '')
    
#     # Filtering courses based on search query (assuming case-insensitive search)
#     courses = Course.objects.filter(name__icontains=search_query) | Course.objects.filter(dept__icontains=search_query) | Course.objects.filter(code__icontains=search_query)
    
#     # Format the results
#     course_data = list(courses.values('dept', 'code', 'credit', 'name', 'prereqs', 'desc'))
    
#     return JsonResponse(course_data, safe=False)
