from django.shortcuts import render
from django.http import HttpResponse

def portal(request):
	# return HttpResponse("Welcome to HAB Portal Home page!");
	template = 'portal/home.html'
	return render(request, template)