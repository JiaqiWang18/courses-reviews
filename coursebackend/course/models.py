from django.db import models

# Create your models here.


class Course(models.Model):
    title = models.CharField(max_length=30)
    course_detail = models.TextField(null=True)
    avg_rating = models.DecimalField(null=True, max_digits=3, decimal_places=1, blank=True)
    instructor_first_name = models.CharField(max_length=20)
    instructor_last_name = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.title} - {self.avg_rating} - {self.instructor_first_name} {self.instructor_last_name}"

