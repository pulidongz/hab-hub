# Generated by Django 2.1.5 on 2019-05-07 03:11

import datetime
import django.contrib.auth.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HabsUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('username', models.CharField(help_text='Required. 150 characters or fewer. Usernames may contain alphanumeric, _, @, +, . and - characters.', max_length=30, unique=True, verbose_name='Username')),
                ('first_name', models.CharField(blank=True, help_text='Enter first name', max_length=30, verbose_name='First Name')),
                ('last_name', models.CharField(blank=True, help_text='Enter last name', max_length=30, verbose_name='Last Name')),
                ('email', models.EmailField(help_text='Enter a valid email address', max_length=200, unique=True, verbose_name='Email')),
                ('institution', models.CharField(help_text='UP-MSI, BFAR, DENR, etc.', max_length=30, verbose_name='Institution')),
                ('position', models.CharField(help_text='i.e. Professor, SRS, etc.', max_length=30, verbose_name='Position')),
                ('date_joined', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'ordering': ['date_joined'],
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='user_permissions',
        ),
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]