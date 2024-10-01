from django.db import models

# Create your models here.
# models.py
from django.db import models

class Course(models.Model):
    dept = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    credit = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.dept} {self.code} - {self.name}"
