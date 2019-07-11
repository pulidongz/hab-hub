from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from .models import *

class StationAdmin(LeafletGeoAdmin):
    # fields to show in admin listview
    list_display = ('station_name', 'location')

admin.site.register(Station, StationAdmin)
admin.site.register(Sensor)
admin.site.register(Plankton)
admin.site.register(Sample)
admin.site.register(PlanktonSample)
admin.site.register(Climate)
admin.site.register(HabData)