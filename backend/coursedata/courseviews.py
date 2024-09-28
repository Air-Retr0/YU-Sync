import os
import json
from django.http import JsonResponse
from django.conf import settings

def get_course_data(request):
    folder_path = os.path.join(settings.BASE_DIR, 'C:\\Users\\Jahiem\\vscode\\yorku-book-finder\\stack\\backend\\backend\\data\\courses')  # Folder where your JSON files are stored
    data = []
    
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            filePath = os.path.join(folder_path, filename)
            
            with open(filePath, 'r') as f:
                try:
                    course_info = json.load(f)
                    data.append(course_info)
                except json.JSONDecodeError:
                    pass

    return JsonResponse(data, safe=False)
