# Generated by Django 3.2 on 2021-06-13 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rating', '0004_alter_rating_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='comment',
            field=models.TextField(default='idk', max_length=100),
            preserve_default=False,
        ),
    ]
