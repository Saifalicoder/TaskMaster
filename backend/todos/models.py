from django.db import models
from django.conf import settings

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    duedate = models.DateTimeField(null=True, blank=True)  # Allow null and blank for optional due dates.
    setreminder = models.BooleanField(default=False)  # Default is false (no reminder).
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title