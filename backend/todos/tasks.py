from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from todos.models import Todo
from django.core.mail import send_mass_mail
from django.conf import settings

@shared_task
def send_reminders():
    # Get the current time and time 30 minutes from now
    now = timezone.now()
    reminder_time = now + timedelta(minutes=30)

    # Find todos where the reminder is set and the due date is within the next 30 minutes
    tasks_to_remind = Todo.objects.filter(is_completed=False,setreminder=True, duedate__lte=reminder_time, duedate__gte=now)

    if tasks_to_remind.exists():
        messages = []
        for task in tasks_to_remind:
            user_email = task.author.email
            subject = f"Reminder: Your task '{task.title}' is due soon!"
            message = f"Hello {task.author.email},\n\nThis is a reminder that your task '{task.title}' is due at {task.duedate}. Please complete it before the deadline."
            messages.append((subject, message, settings.DEFAULT_FROM_EMAIL, [user_email]))

        # Send emails in bulk
        send_mass_mail(messages, fail_silently=False)
