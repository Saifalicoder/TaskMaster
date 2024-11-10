
from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

class TodoList(generics.ListCreateAPIView):
    def get_queryset(self):
        # Order by 'created_at' in descending order (latest first)
        return Todo.objects.filter(author=self.request.user).order_by('-created_at')
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)
    


class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Todo.objects.filter(author=self.request.user)
    def perform_update(self, serializer):
        todo = self.get_object()
        if todo.author != self.request.user:
            raise PermissionDenied("You do not have permission to update this Todo.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("You do not have permission to delete this Todo.")
        instance.delete()
    