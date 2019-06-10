from rest_framework import serializers
from habdb.models import *

# HABS Recent Data
class StationSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Station
		fields	=	"__all__"

class SensorSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Sensor
		fields	=	"__all__"

class PlanktonSerializer(serializers.ModelSerializer):
	class Meta:
		model 	= 	Plankton
		fields	=	"__all__"

class SampleSerializer(serializers.ModelSerializer):
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