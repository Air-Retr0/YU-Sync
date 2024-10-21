from django.db import models

class ClerkUser(models.Model):
    clerk_id = models.CharField(max_length=255, unique=True)  
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255, blank=True)  # If User does not give first/last name
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.clerk_id})"

class UserReview(models.Model):
    clerk_user = models.ForeignKey(ClerkUser, on_delete=models.CASCADE)
    course = models.CharField(max_length=255)
    review_text = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return f"Review by {self.clerk_user.display_name or self.clerk_user.first_name} on {self.course}"
    
    