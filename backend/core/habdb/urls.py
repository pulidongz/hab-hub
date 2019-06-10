from django.urls import path, include
from .import views

app_name = 'habdb'

urlpatterns = [
	path('', views.habdb, name='dashboard'),
	path('new/', views.new, name='new'),
	path('view/', views.view, name='view'),
	path('update/', views.update, name='update'),
	path('delete/', views.delete, name='delete'),

	path('personal_information/', views.personal_information, name='personal_information'),
	path('inbox/', views.inbox, name='inbox'),
	path('recent_downloads/', views.recent_downloads, name='recent_downloads'),
	path('recent_contributions/', views.recent_contributions, name='recent_contributions'),


]
