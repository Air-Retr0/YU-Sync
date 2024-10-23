from django.db import models
from django.forms import ValidationError
from coursedata.models import Course

class ClerkUser(models.Model):
    clerk_id = models.CharField(max_length=255, unique=True)  
    first_name = models.CharField(max_length=255,blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    display_name = models.CharField(max_length=255, blank=False)  # If User does not give first/last name
    username = models.CharField(max_length=255, blank=False, null=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.clerk_id})"

class UserReview(models.Model):
    clerk_user = models.ForeignKey(ClerkUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.clerk_user.display_name or (self.clerk_user.first_name and self.clerk_user.last_name)} on {self.course} at {self.created_at}"
    

    def clean(self):
        if not (1 <= self.rating <= 5):
            raise ValidationError('Rating must be between 1 and 5.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        
class ProcessedEvent(models.Model):
    event_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.event_id
