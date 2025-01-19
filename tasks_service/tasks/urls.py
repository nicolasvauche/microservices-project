from django.urls import path
from .views import TaskListCreateView, TaskDetailView, UserTasksView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/user/<int:user_id>/', UserTasksView.as_view(), name='user-tasks'),
]
