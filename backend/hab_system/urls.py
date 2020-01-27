from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from habdb import views as habdb_views
from portal import views as portal_views
from .router import router
# Use static() to add url mapping to serve static files during development (only)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	# path('', RedirectView.as_view(url='/main/')),	
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')), #template folder is located in habdb folder
    
    #App URLs 
    path('', include('portal.urls', namespace='portal')),
    path('dashboard/', include('habdb.urls', namespace='habdb')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
