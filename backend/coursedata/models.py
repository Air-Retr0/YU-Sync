from django.db import models

class Course(models.Model):
    dept = models.CharField(max_length=10)
    code = models.CharField(max_length=10)
    credit = models.IntegerField()
    name = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.dept} {self.code}: {self.name}"