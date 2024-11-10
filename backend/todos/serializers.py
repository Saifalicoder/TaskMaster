from rest_framework import serializers
from .models import Todo
from django.contrib.auth import get_user_model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'name', 'email']  # Include the fields you want to display for the author

class TodoSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)  # Nested serializer to display author details

    class Meta:
        model = Todo
        fields = ['id', 'title', 'body', 'author', 'created_at','is_completed','duedate','setreminder']