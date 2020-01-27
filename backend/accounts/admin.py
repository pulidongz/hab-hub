from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import HabsUserCreationForm, HabsUserChangeForm
from .models import HabsUser

class HabsUserAdmin(UserAdmin):
	add_form = HabsUserCreationForm
	form = HabsUserChangeForm
	model = HabsUser
	list_display = ['username','first_name','last_name','email','institution','position']

admin.site.register(HabsUser, HabsUserAdmin)