from django.db import models

class Course(models.Model):
    dept = models.CharField(max_length=50)
    code = models.CharField(max_length=20)
    credit = models.DecimalField(max_digits=4, decimal_places=2)
    name = models.CharField(max_length=255)
    prereqs = models.TextField(null=True, blank=True)
    desc = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.dept} {self.code} - {self.name}"
