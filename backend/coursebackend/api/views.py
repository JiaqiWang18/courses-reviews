from django.db.models.functions import Lower
from rest_framework.response import Response
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from user.models import User
from .serializers import CourseSerializer, RatingSerializer, RegisterSerializer
from course.models import Course
from rating.models import Rating


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class LogoutUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=e.__str__())


class CourseList(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search')
        order = self.request.query_params.get('order') or "alpha"
        if search:
            course_obj = Course.objects.filter(title__icontains=search)
        else:
            course_obj = Course.objects.all()
        if order == "alpha":
            return course_obj.order_by(Lower("title"))
        elif order == "rating":
            return course_obj.order_by("-avg_rating")
        return course_obj


class HomeRatingList(viewsets.ModelViewSet):
    permissions = [permissions.AllowAny]
    serializer_class = RatingSerializer

    def get_queryset(self):
        course_id = self.request.query_params.get('course')
        if course_id is not None:
            return Rating.objects.filter(course=course_id)
        return Rating.objects.all()


class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    # override create to set the author as the authenticated user
    def create(self, request, *args, **kwargs):
        serializer = RatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        return Rating.objects.filter(author=self.request.user.id)
