from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from habdb.models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.filters import OrderingFilter

### API Viewsets for list, create, retrieve, update, partial_update, destroy ###

# HABS Recent Data
class StationView(viewsets.ModelViewSet):
	queryset = Station.objects.all()
	serializer_class = StationSerializer
	filter_backends = (DjangoFilterBackend,)
	filterset_fields = ('station_name',)

	@action(methods=['get'], detail=False)
	def newest(self, request):
		newest = self.get_queryset().order_by('id').last()
		serializer = self.get_serializer_class()(newest)
		return Response(serializer.data)
	
class SensorView(viewsets.ModelViewSet):
	queryset = Sensor.objects.all()
	serializer_class = SensorSerializer
	filter_backends = (DjangoFilterBackend, OrderingFilter)
	filterset_fields = ('station_name__station_name',)
	ordering_fields = ('time',)
	ordering = ('-time')

class PlanktonView(viewsets.ModelViewSet):
	queryset = Plankton.objects.all()
	serializer_class = PlanktonSerializer

class SampleView(viewsets.ModelViewSet):
	queryset = Sample.objects.all()
	serializer_class = SampleSerializer

class PlanktonSampleView(viewsets.ModelViewSet):
	queryset = PlanktonSample.objects.all()
	serializer_class = PlanktonSampleSerializer

class ClimateView(viewsets.ModelViewSet):
	queryset = Climate.objects.all()
	serializer_class = ClimateSerializer

class HabDataView(viewsets.ModelViewSet):
	queryset = HabData.objects.all()
	serializer_class = HabDataSerializer


# HABS Static Data
class RegionDataView(viewsets.ModelViewSet):
	queryset = RegionData.objects.all()
	serializer_class = RegionDataSerializer

class ProvSocioDataView(viewsets.ModelViewSet):
	queryset = ProvSocioData.objects.all()
	serializer_class = ProvSocioDataSerializer

class MuniSocioDataView(viewsets.ModelViewSet):
	queryset = MuniSocioData.objects.all()
	serializer_class = MuniSocioDataSerializer


# HABS Historical Data
class SourceView(viewsets.ModelViewSet):
	queryset = Source.objects.all()
	serializer_class = SourceSerializer

class OwnershipView(viewsets.ModelViewSet):
	queryset = Ownership.objects.all()
	serializer_class = OwnershipSerializer

class ChemOceDataView(viewsets.ModelViewSet):
	queryset = ChemOceData.objects.all()
	serializer_class = ChemOceDataSerializer

class PODataView(viewsets.ModelViewSet):
	queryset = POData.objects.all()
	serializer_class = PODataSerializer

class CellCountView(viewsets.ModelViewSet):
	queryset = CellCount.objects.all()
	serializer_class = CellCountSerializer

class ToxicityView(viewsets.ModelViewSet):
	queryset = Toxicity.objects.all()
	serializer_class = ToxicitySerializer