# Generated by Django 5.1.2 on 2024-10-21 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_todo_is_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='duedate',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='todo',
            name='setreminder',
            field=models.BooleanField(default=False),
        ),
    ]
