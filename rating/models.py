from django.db import models
from course.models import Course
from user.models import User


class Rating(models.Model):
    student_rating = models.DecimalField(max_digits=3, decimal_places=1)
    comment = models.TextField(null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Review for {self.course.title}"
