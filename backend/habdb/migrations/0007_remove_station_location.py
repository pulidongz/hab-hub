# Generated by Django 2.2.2 on 2019-06-19 07:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('habdb', '0006_auto_20190619_1508'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='station',
            name='location',
        ),
    ]
