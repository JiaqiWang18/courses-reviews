# Generated by Django 3.2 on 2021-05-13 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('course_detail', models.TextField(null=True)),
                ('avg_rating', models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ('instructor_first_name', models.CharField(max_length=10)),
                ('instructor_last_name', models.CharField(max_length=10)),
            ],
        ),
    ]