from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from course.models import Course
from rating.models import Rating
from user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'password2',)
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()

    def get_first_name(self, obj):
        author = obj.author
        return author.first_name

    def get_last_name(self, obj):
        author = obj.author
        return author.last_name

    def get_course_name(self, obj):
        title = obj.course.title
        return title

    class Meta:
        model = Rating
        fields = ('id', 'student_rating', 'comment', 'first_name', 'last_name', "course", "course_name")
        read_only_fields = ['author']
