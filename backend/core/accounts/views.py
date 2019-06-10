from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic

from .forms import HabsUserCreationForm

class SignUp(generic.CreateView):
    form_class = HabsUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'