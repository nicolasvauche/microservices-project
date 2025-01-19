from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Task


class TaskAPITests(APITestCase):
    def setUp(self):
        self.task_1 = Task.objects.create(user_id=1, title="Task 1", done=False)
        self.task_2 = Task.objects.create(user_id=1, title="Task 2", done=True)
        self.task_3 = Task.objects.create(user_id=2, title="Task 3", done=False)

        # URLs pour les endpoints
        self.list_create_url = reverse('task-list-create')
        self.user_tasks_url = lambda user_id: reverse('user-tasks', kwargs={'user_id': user_id})
        self.detail_url = lambda pk: reverse('task-detail', kwargs={'pk': pk})

    def test_list_all_tasks(self):
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_create_task(self):
        data = {
            "user_id": 3,
            "title": "New Task",
            "done": False
        }
        response = self.client.post(self.list_create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 4)
        self.assertEqual(Task.objects.last().title, "New Task")

    def test_list_user_tasks(self):
        response = self.client.get(self.user_tasks_url(user_id=1))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_task_by_id(self):
        response = self.client.get(self.detail_url(self.task_1.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.task_1.title)

    def test_update_task(self):
        data = {
            "user_id": 1,
            "title": "Updated Task",
            "done": True
        }
        response = self.client.put(self.detail_url(self.task_1.id), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task_1.refresh_from_db()
        self.assertEqual(self.task_1.title, "Updated Task")
        self.assertTrue(self.task_1.done)

    def test_delete_task(self):
        response = self.client.delete(self.detail_url(self.task_1.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 2)
