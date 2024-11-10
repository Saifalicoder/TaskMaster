from django.urls import path
from .views import *
urlpatterns = [
 path("<int:pk>/", TodoDetail.as_view(), name="tododetail"),
 path("", TodoList.as_view(), name="todolist"),
]