# Generated by Django 2.1.5 on 2019-05-28 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('habdb', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habdata',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
