
from django.urls import path, include
from . import views

app_name = 'portal'

urlpatterns = [
   path('', views.portal, name='portal'),
]
