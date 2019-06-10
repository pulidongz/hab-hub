from django.shortcuts import render


def habdb(request):
	template = 'habdb/dashboard.html'
	return render(request, template)

def new(request):
	template = 'habdb/db_new.html'
	return render(request, template)
def view(request):
	template = 'habdb/db_view.html'
	return render(request, template)
def update(request):
	template = 'habdb/db_update.html'
	return render(request, template)
def delete(request):
	template = 'habdb/db_delete.html'
	return render(request, template)

def personal_information(request):
	template = 'habdb/account_info.html'
	return render(request, template)	
def inbox(request):
	template = 'habdb/account_inbox.html'
	return render(request, template)
def recent_downloads(request):
	template = 'habdb/account_downloads.html'
	return render(request, template)
def recent_contributions(request):
	template = 'habdb/account_contri.html'
	return render(request, template)