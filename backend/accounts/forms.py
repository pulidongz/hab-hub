from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import HabsUser

class HabsUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model	= HabsUser
        fields	= ('username','first_name','last_name','email','institution','position')

class HabsUserChangeForm(UserChangeForm):

    class Meta:
        model	= HabsUser
        fields	= ('username','first_name','last_name','email','institution','position')

