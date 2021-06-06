from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .serializers import Course, Rating, RatingSerializer
import decimal


@receiver(post_save, sender=Rating)
@receiver(post_delete, sender=Rating)
def update_rating(sender, instance, created=True, **kwargs):
    if created:
        query_set = Rating.objects.filter(course=instance.course)
        serialized_ratings = RatingSerializer(query_set, many=True).data
        total_rating = sum([decimal.Decimal(d['student_rating']) for d in serialized_ratings])
        num_of_rating = len(query_set)
        course_to_update = Course.objects.filter(id=instance.course.id)
        if num_of_rating == 0:
            course_to_update.update(avg_rating=None)
        else:
            course_to_update.update(avg_rating=total_rating / num_of_rating)
