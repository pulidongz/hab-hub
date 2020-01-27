from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
#from .managers import HabsUserManager

class HabsUser(AbstractUser):
	username = models.CharField(max_length=30, blank=False, unique=True, verbose_name="Username", help_text='Required. 150 characters or fewer. Usernames may contain alphanumeric, _, @, +, . and - characters.')
	first_name = models.CharField(max_length=50, blank=True, verbose_name="First Name", help_text='Enter first name')
	last_name = models.CharField(max_length=50, blank=True, verbose_name="Last Name", help_text='Enter last name')
	email = models.EmailField(max_length=200, blank=False, unique=True, verbose_name="Email", help_text="Enter a valid email address")
	institution = models.CharField(max_length=100, blank=False, verbose_name="Institution", help_text='UP-MSI, BFAR, DENR, etc.')
	position = models.CharField(max_length=50, verbose_name="Position", help_text='i.e. Professor, SRS, etc.')
	date_joined = models.DateTimeField(default=datetime.now, blank=True)

#	objects = HabsUserManager()


	class Meta:
		ordering = ['date_joined']

	def __str__(self):
		return self.username

	def get_full_name(self):
		return '%s %s' % (self.first_name, self.last_name)

	def get_short_name(self):
		return self.first_name

	def get_institution(self):
		return self.institution


