from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField
from habdb.models import *
import time

### Custom Serializers from DRF ###

# converts ISO8601 DateTime format to Unix Timestamp
class UnixformatTimeField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))

# A ModelSerializer that takes an additional `fields` argument that
# controls which fields should be displayed.
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

### HABS Recent Data Serializers ###
# GET, POST for Station model
class StationSerializer(serializers.ModelSerializer):
	timestamp 	=	serializers.DateTimeField(format="%b %d, %Y: %I:%M:%p", required=False, read_only=True)
	longitude	=	serializers.DecimalField(max_digits=6, decimal_places=3)
	latitude	=	serializers.DecimalField(max_digits=6, decimal_places=3)
	class Meta:
		model 	= 	Station
		fields	=	"__all__"

# GET, POST for Sensor model (w/c displays "station_name=0,1,2,etc." in number format)
class SensorSerializer(DynamicFieldsModelSerializer):
	name	 		=	serializers.CharField(source='station_name.station_name', read_only=True)
	date 			=	serializers.DateField(format="%b %d, %Y", required=False, read_only=True)
	time 			=	serializers.DateTimeField(format="%I:%M:%p", required=False, read_only=True)
	unixtime 		=	UnixformatTimeField(source='time')
	longitude		=	serializers.DecimalField(max_digits=6, decimal_places=3, source='station_name.longitude', read_only=True)
	latitude		=	serializers.DecimalField(max_digits=6, decimal_places=3, source='station_name.latitude', read_only=True)
	station_depth	=	serializers.DecimalField(max_digits=5, decimal_places=2, source='station_name.station_depth', read_only=True)
	has_hab			=	serializers.CharField(source='station_name.has_hab', read_only=True)
	class Meta:
		model 	= 	Sensor
		fields 	=	"__all__" 

# GET, for Sensor model - displays 'latest' entry per station
class SensorLatestDataSerializer(serializers.ModelSerializer):
	name	 		=	serializers.CharField(source='station_name.station_name', read_only=True)
	date 			=	serializers.DateField(format="%b %d, %Y", required=False, read_only=True)
	time 			=	serializers.DateTimeField(format="%I:%M:%p", required=False, read_only=True)
	unixtime 		=	UnixformatTimeField(source='time')
	longitude		=	serializers.DecimalField(max_digits=6, decimal_places=3, source='station_name.longitude', read_only=True)
	latitude		=	serializers.DecimalField(max_digits=6, decimal_places=3, source='station_name.latitude', read_only=True)
	station_depth	=	serializers.DecimalField(max_digits=5, decimal_places=2, source='station_name.station_depth', read_only=True)
	has_hab			=	serializers.CharField(source='station_name.has_hab', read_only=True)
	class Meta:
		model 	= 	Sensor
		fields 	=	"__all__" 

# GET, arranged chronologically from latest entry
class SensorDOSerializer(serializers.ModelSerializer):
	station_name	=	serializers.CharField(source='station_name.station_name', read_only=True)
	date 			=	serializers.DateField(format="%b %d, %Y", required=False, read_only=True)
	unixtime 		=	UnixformatTimeField(source='time')
	class Meta:
		model 	= 	Sensor
		fields 	=	('station_name','do','date', 'unixtime')

# GET, POST for Sensor model (w/c displays "station_name=0,1,2,etc." in number format)
class DownloadDataSerializer(DynamicFieldsModelSerializer):
	name	 		=	serializers.CharField(source='station_name.station_name', read_only=True)
	date 			=	serializers.DateField(format="%b-%d-%Y", required=False, read_only=True)
	time 			=	serializers.DateTimeField(format="%I:%M:%p", required=False, read_only=True)
	longitude		=	serializers.DecimalField(max_digits=6, decimal_places=3, source='station_name.longitude', read_only=True)
	latitude		=	serializers.DecimalField(max_digits=6, decimal_places=3, source='station_name.latitude', read_only=True)
	station_depth	=	serializers.DecimalField(max_digits=5, decimal_places=2, source='station_name.station_depth', read_only=True)
	has_hab			=	serializers.CharField(source='station_name.has_hab', read_only=True)
	class Meta:
		model 	= 	Sensor
		fields 	=	"__all__" 

class PlanktonSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Plankton
		fields	=	"__all__"

class SampleSerializer(serializers.ModelSerializer):
	station 	=	serializers.CharField(source='station.station_name', read_only=True)
	class Meta:
		model 	= 	Sample
		fields	=	"__all__"

class PlanktonSampleSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	PlanktonSample
		fields	=	"__all__"

class ClimateSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Climate
		fields	=	"__all__"

class HabDataSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	HabData
		fields	=	"__all__"


# HABS Static Data
class RegionDataSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	RegionData
		fields	=	"__all__"
		read_only_fields = ['reg_name']

class ProvSocioDataSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	ProvSocioData
		fields	=	"__all__"

class MuniSocioDataSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	MuniSocioData
		fields	=	"__all__"


# HABS Historical Data
class SourceSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Source
		fields	=	"__all__"

class OwnershipSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Ownership
		fields	=	"__all__"

class ChemOceDataSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	ChemOceData
		fields	=	"__all__"

class  PODataSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	 POData
		fields	=	"__all__"

class CellCountSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	CellCount
		fields	=	"__all__"

class ToxicitySerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Toxicity
		fields	=	"__all__"