from django.db import models


class Task(models.Model):
    user_id = models.IntegerField(null=False)
    title = models.CharField(max_length=255, null=False)
    done = models.BooleanField(default=False)
    expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
