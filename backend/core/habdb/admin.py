from django.contrib import admin

from .models import *

admin.site.register(Station)
admin.site.register(Sensor)
admin.site.register(Plankton)
admin.site.register(Sample)
admin.site.register(PlanktonSample)
admin.site.register(Climate)
admin.site.register(HabData)