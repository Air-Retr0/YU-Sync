from django.db import models

class Course(models.Model):
    dept = models.CharField(max_length=10)
    code = models.CharField(max_length=10)
    credit = models.IntegerField()
    name = models.CharField(max_length=200)
    prereqs = models.CharField(max_length=200, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.dept} {self.code} - {self.name}"
