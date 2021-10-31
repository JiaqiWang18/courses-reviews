from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.decorators.cache import cache_page
from . import views

router = DefaultRouter()
router.register(r'ratings', views.RatingViewSet, basename='ratings')

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('logout/', views.LogoutUserView.as_view(), name='logout'),
    path('courses/', views.course_list, name='courses'),
    path('home-rating-list/', views.HomeRatingList.as_view({'get': 'list'}), name='home-rating-list'),
    path('', include(router.urls)),
]
