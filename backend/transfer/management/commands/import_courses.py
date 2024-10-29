import os
import json
from django.conf import settings
from django.core.management.base import BaseCommand
from coursedata.models import Course

class Command(BaseCommand):
    help = 'Import courses from JSON files into the database'

    def handle(self, *args, **kwargs):
        folder_path = os.path.join(settings.BASE_DIR, 'C:\\Users\\Jahiem\\vscode\\yorku-book-finder\\YU-Sync\\backend\\backend\\data\\courses')
        
        for filename in os.listdir(folder_path):
            if filename.endswith('.json'):
                file_path = os.path.join(folder_path, filename)
                
                with open(file_path, 'r') as f:
                    try:
                        data = json.load(f)

                        # Ensure the JSON structure is as expected
                        courses = data.get('courses', [])
                        if not courses:
                            self.stderr.write(f"No courses found in {filename}.")
                            continue  # Skip this file if no courses are found
                        
                        for course_info in courses:
                            # Ensure required fields are present
                            required_fields = ['dept', 'code', 'credit', 'name', 'prereqs', 'desc']
                            if not all(field in course_info for field in required_fields):
                                self.stderr.write(f"Missing fields in {filename}. Required fields: {required_fields}")
                                continue  # Skip this course if required fields are missing
                            
                            Course.objects.update_or_create(
                                dept=course_info.get('dept', 'N/A'),
                                code=course_info.get('code', 'N/A'),
                                defaults={
                                    'credit': course_info.get('credit', 0),
                                    'name': course_info.get('name', 'Unnamed Course').strip(),  # Strip any extra whitespace
                                    'prereqs': course_info.get('prereqs', 'None').strip(),
                                    'desc': course_info.get('desc', 'No description available').strip(),
                                }
                            )
                            self.stdout.write(f"Imported course: {course_info.get('name')} from {filename}")
                    except json.JSONDecodeError:
                        self.stderr.write(f"Error reading {filename}")
                    except Exception as e:
                        self.stderr.write(f"Unexpected error with {filename}: {e}")