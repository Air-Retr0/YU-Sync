# # your_app/views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from coursedata.models import Course  # Make sure your Course model is imported
# from backend.serializers import CourseSerializer  # Import your serializer

# @api_view(['GET'])
# def course_list(request):
#     # Fetch all courses from the database
#     courses = Course.objects.all()  # This should return all courses
#     serializer = CourseSerializer(courses, many=True)  # Serialize the data
#     return Response(serializer.data)  # Return the serialized data as JSON
