from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from user.models import User
from course.models import Course
from rating.models import Rating
from api.serializers import CourseSerializer
import random


class ApiTests(APITestCase):
    def setUp(self):
        url = reverse('register')
        new_user = {
            "email": "123@example.com",
            "first_name": "John",
            "last_name": "Smith",
            "password": "test12345",
            "password2": "test12345"
        }
        response = self.client.post(url, new_user, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.created_user = User.objects.get(email=new_user["email"])
        self.assertTrue(self.created_user)

        url = reverse('token_obtain_pair')
        cred = {
            'email': '123@example.com',
            'password': 'test12345'
        }
        response = self.client.post(url, cred, format='json')
        self.user_access_token = response.data['access']
        self.user_refresh_token = response.data['refresh']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.c1 = Course.objects.create(title="test_course_1", course_detail="test_course_detail_1",
                                        instructor_first_name="firstname_1", instructor_last_name="lastname_1")
        self.c2 = Course.objects.create(title="test_course_2", course_detail="test_course_detail_2",
                                        instructor_first_name="firstname_2", instructor_last_name="lastname_2")
        self.c3 = Course.objects.create(title="test_course_3", course_detail="test_course_detail_3",
                                        instructor_first_name="firstname_3", instructor_last_name="lastname_3")

    def test_view_all_courses(self):
        url = reverse('courses')
        response = self.client.get(url, format='json')
        serializer = CourseSerializer(Course.objects.all(), many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_registration(self):
        url = reverse('register')
        duplicate_user = {
            "email": "123@example.com",
            "first_name": "Another",
            "last_name": "User",
            "password": "test12345",
            "password2": "test12345"
        }
        response = self.client.post(url, duplicate_user, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual({
            "email": [
                "This field must be unique."
            ]
        },
            response.data
        )

    def test_post_course_ratings(self):
        rand_course_id = random.choice([self.c1, self.c2, self.c3]).id
        ratings = [
            {
                "student_rating": random.randint(1, 5),
                "course": rand_course_id,
                "comment": "my comment"
            } for _ in range(random.randint(0, 60))
        ]
        correct_rating = round(sum(map(lambda n: n["student_rating"], ratings))/len(ratings), 1)
        resp = self.client.post(reverse('ratings-list'), data=ratings[0])
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.user_access_token)
        for rating in ratings:
            resp = self.client.post(reverse('ratings-list'), data=rating)
            self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertTrue(str(Course.objects.get(id=rand_course_id).avg_rating), str(correct_rating))

    def test_view_ratings(self):
        url = reverse('home-rating-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_rating(self):
        r1 = Rating.objects.create(student_rating=1, comment='bad', course=self.c1, author=self.created_user)
        r2 = Rating.objects.create(student_rating=5, comment='bad', course=self.c1, author=self.created_user)
        self.assertTrue(r1)
        self.assertTrue(r2)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.user_access_token)
        response = self.client.patch(reverse('ratings-detail', kwargs={'pk': r1.id}), data={
            'student_rating': 4
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Rating.objects.get(pk=r1.id).student_rating, 4)
        self.assertEqual(Course.objects.get(pk=self.c1.id).avg_rating, 4.5)

    def test_access_fail_if_not_rating_creator(self):
        user2 = {
            "email": "user2@example.com",
            "first_name": "U2",
            "last_name": "U2",
            "password": "test12345",
            "password2": "test12345"
        }
        url = reverse('register')
        self.client.post(url, user2, format='json')
        url = reverse('token_obtain_pair')
        cred = {
            'email': 'user2@example.com',
            'password': 'test12345'
        }
        response = self.client.post(url, cred, format='json')
        user2_access_token = response.data['access']
        r = Rating.objects.create(student_rating=5, comment='bad', course=self.c1, author=self.created_user)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + user2_access_token)
        response = self.client.patch(reverse('ratings-detail', kwargs={'pk': r.id}), data={
            'student_rating': 4
        }, format='json')
        self.assertEqual(response.status_code, 404)
