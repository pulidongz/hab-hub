from rest_framework import routers
from habdb.api.viewsets import *

router = routers.DefaultRouter()
# HABS Recent Data
router.register('station', StationView)
router.register('sensor', SensorView)
router.register('sensor-latest-data', SensorLatestData)
# Sensor data per nutrient
router.register('sensor_do', Sensor_DO)

#HABS Data Download
router.register('download', DownloadData)

router.register('plankton', PlanktonView)
router.register('sample', SampleView)
router.register('plankton_sample', PlanktonSampleView)
router.register('climate', ClimateView)
router.register('habdata', HabDataView)


# HABS Static Data
router.register('region', RegionDataView)
router.register('province', ProvSocioDataView)
router.register('municity', MuniSocioDataView)


# HABS Historical Data
router.register('source', SourceView)
router.register('ownership', OwnershipView)
router.register('chemocedata', ChemOceDataView)
router.register('podata', PODataView)
router.register('cell_count', CellCountView)
router.register('toxicity', ToxicityView)