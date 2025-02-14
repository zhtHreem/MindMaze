# models.py
from django.db import models
from django.contrib.auth.models import User

class LearningProgress(models.Model):
    user = models.CharField(max_length=100)  # We'll use session ID for now
    topic = models.CharField(max_length=200)
    lessons_completed = models.IntegerField(default=0)
    last_lesson_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user} - {self.topic}"

class LessonHistory(models.Model):
    progress = models.ForeignKey(LearningProgress, on_delete=models.CASCADE)
    lesson_content = models.TextField()
    quiz_question = models.TextField(null=True, blank=True)
    quiz_answer = models.TextField(null=True, blank=True)
    completed_date = models.DateTimeField(auto_now_add=True)