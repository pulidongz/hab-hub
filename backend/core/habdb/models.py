from django.contrib.auth import get_user_model
from django.db import models


# S T A R T   O F   H A B S   R E C E N T   D A T A
class Station(models.Model):
    station_name 	=	models.CharField(max_length=100, unique=True)
    longitude 		= 	models.DecimalField(max_digits=13, decimal_places=10)
    latitude 		= 	models.DecimalField(max_digits=13, decimal_places=10)
    station_depth 	= 	models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
    	return self.station_name

class Sensor(models.Model):
	station_name	=	models.ForeignKey(Station, on_delete=models.CASCADE)
	sensor_id 		= 	models.CharField(max_length=50)
	date 			= 	models.DateField(auto_now=True)
	time 			=	models.DateTimeField(auto_now=True)
	station_depth 	=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	do 				= 	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	temp 			= 	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	salinity 		= 	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	turbidity 		= 	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ph 				= 	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	chl_a 			=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	uv 				=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)

	def __str__(self):
		return self.sensor_id

class Plankton(models.Model):
	group			=	models.CharField(max_length=200)
	species			=	models.CharField(max_length=200, unique=True)
    
	def __str__(self):
		return self.species

class Sample(models.Model):
	sample_id 		= 	models.AutoField(primary_key=True)
	station 		=	models.ForeignKey(Station, on_delete=models.CASCADE)
	sample_date		= 	models.DateField()
	sample_depth	= 	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	pressure 		=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	chl_a			=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	NO2 			=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	NO3				=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	NH3 			=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	NH4				=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)
	PO4				=	models.DecimalField(max_digits=20, decimal_places=5, null=True, default=0)

	def __str__(self):
		return self.sample_id

class PlanktonSample(models.Model):
	sample 			=	models.ForeignKey(Sample, on_delete=models.CASCADE)
	plankton 		=	models.ForeignKey(Plankton, on_delete=models.CASCADE)
	cell_count 		= 	models.IntegerField()
	method 			= 	models.CharField(max_length=200)
	sample_number 	=	models.CharField(max_length=100, null=True, blank=True, default=' ')
    
	def __str__(self):
		return self.cell_count

class Climate(models.Model):
    weather_station_name	=	models.CharField(max_length=200)
    province 				=	models.CharField(max_length=200)
    longitude 				=	models.DecimalField(max_digits=10, decimal_places=5)
    latitude				=	models.DecimalField(max_digits=10, decimal_places=5)
    date 					=	models.DateField()
    rainfall 				=	models.DecimalField(max_digits=10, decimal_places=2)
    wind_speed				=	models.DecimalField(max_digits=10, decimal_places=2)
    wind_direction 			=	models.IntegerField()
    temp_max 				=	models.DecimalField(max_digits=4, decimal_places=2)
    temp_min				=	models.DecimalField(max_digits=4, decimal_places=2)
    temp_mean				=	models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
    	return self.weather_station_name

class HabData(models.Model):
	sample_id 					=	models.AutoField(primary_key=True)
	source 						=	models.CharField(max_length=200, verbose_name="Source", help_text="Data source and/or author")
	date 						=	models.DateField(auto_now=True)
	time 						=	models.DateTimeField(auto_now=True)
	timestamp 					=	models.DateTimeField(auto_now_add=True)
	cruise_id 					=	models.CharField(max_length=50, blank=True, null=True,  verbose_name="Cruise ID", help_text="Cruise ID")
	station_depth 				=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Station Depth", help_text="Depth in Meters")
	station_name 				=	models.ForeignKey(Station, on_delete=models.CASCADE)
	latitude 					=	models.DecimalField(max_digits=16, decimal_places=10, default=0, verbose_name="Latitude") 
	longitude 					=	models.DecimalField(max_digits=16, decimal_places=10, default=0, verbose_name="Longitude")
	sample_depth 				=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Sample Depth")
	sample_num 					=	models.CharField(max_length=50, verbose_name="Sample Number", help_text="Depth in meters")
	bottom_depth 				=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Bottom Depth", help_text="Depth in meters")
	pressure 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Pressure", help_text="units in Decibel(dB)")
	temp 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Temperature", help_text="units in Celcius (°C)")
	ave_no2 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Average Nitrite", help_text="units in mg/L/uM")
	ave_no3 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Average Nitrate", help_text="units in mg/L/uM")
	ave_po4 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Average Phosphate", help_text="units in mg/L/uM")
	no2 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Nitrite", help_text="units in mg/m^3")
	no3 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Nitrate", help_text="units in mg/m^3")
	po4 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Phosphate", help_text="units in mg/m^3")
	ave_sio2 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Average Silica", help_text="units in mg/L/uM")
	ave_sio3 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Average Silicate", help_text="units in mg/L/uM")
	ave_sio4 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Average Silicate", help_text="units in mg/L/uM")
	sio2 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Silica", help_text="units in mg/m^3")
	sio3 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Silicate", help_text="units in mg/m^3")
	sio4 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Silicate", help_text="units in mg/m^3")
	nox 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Nitrate + Nitrite", help_text="units in mg/m^3")
	nh4 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Ammonia", help_text="units in mg/m^3")
	cdom 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Colored Dissolved Organic Matter", help_text="units in mg/m^3")
	chl_a 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Chlorophyll-A", help_text="units in mg/m^3")
	conductivity 				=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Conductivity", help_text="units in S/m")
	density 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Water Density", help_text="units in kg/m^3")
	do 							=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Dissolved Oxygen", help_text="units in mg/L")
	fluorescence				=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Pigment Concentration", help_text="units in mg/m^3")
	n_p 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="N_P", help_text="derived parameter; ration of N to P")
	p 							=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Total Phosphorous", help_text="units in mg/m^3")
	peroxide 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Peroxide", help_text="units in ___")
	tin 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Total Inorganic Nitrogen", help_text="units in mg/m^3")
	tss 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Total Suspended Solids", help_text="units in NTU or ppm")
	salinity 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Salinity", help_text="parts per thousand or practical salinity units")
	salinity_unit 				=	models.CharField(max_length=50, blank=True, null=True, verbose_name="PPT or PSU", help_text="units in PPT or PSU")
	group 						=	models.CharField(max_length=50, blank=True, null=True, verbose_name="Plankton Group", help_text="Diatom, Dinoflagellate, etc.")
	shellfish 					=	models.CharField(max_length=50, blank=True, null=True, verbose_name="Shellfish Species", help_text="Shellfish Species")
	species 					=	models.CharField(max_length=50, blank=True, null=True, verbose_name="Plankton Species", help_text="Plankton Species")
	plankton_sampling_method	=	models.CharField(max_length=50, blank=True, null=True, verbose_name="Plankton Sampling Method", help_text="i.e. Niskin, Plankton Net, etc.")
	cell_count					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Plankton Abundance", help_text="units in cell/L")
	toxicity 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Shellfish Meat Toxicity", help_text="units in ug[toxin]/100g")
	toxicity_remarks 			=	models.CharField(max_length=200, blank=True, null=True, verbose_name="Toxicty Remarks", help_text="Additional details about the toxicity data")
	toxin 						=	models.CharField(max_length=200, blank=True, null=True, verbose_name="Toxin", help_text="units in STX")
	toxicity_method 			=	models.CharField(max_length=200, blank=True, null=True, verbose_name="Toxicty Method", help_text="method used t obtain toxicity value")
	turbidity 					=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Turbidity", help_text="units in mg/m^3")
	doc 						=	models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True, verbose_name="Dissolved Organic Carbon", help_text="units in ___")
	class Meta:
		ordering = ['-date']
	def __str__(self):
		return self.sample_id

# E N D   O F   H A B S   R E C E N T   D A T A

#________________________________________________________________________________________#

# S T A R T  O F  H A B S  S T A T I C  D A T A
class RegionData(models.Model):
	reg_id		= models.IntegerField(primary_key=True)
	reg_name 	= models.CharField(max_length=200)
	longitude 	= models.DecimalField(max_digits=13, decimal_places=10, default=0)
	latitude 	= models.DecimalField(max_digits=13, decimal_places=10, default=0)

	def __str__(self):
		return self.reg_name

class ProvSocioData(models.Model):
	reg_id 		= models.ForeignKey(RegionData, on_delete=models.CASCADE)
	prov_id 	= models.IntegerField(primary_key=True)
	prov_name 	= models.CharField(max_length=200)
	num_muni 	= models.IntegerField()
	num_city 	= models.IntegerField()
	num_brgy 	= models.IntegerField()

	prov_1p = "1st CLASS PROVINCE"
	prov_2p = "2nd CLASS PROVINCE"
	prov_3p = "3rd CLASS PROVINCE"
	prov_4p = "4th CLASS PROVINCE"
	prov_5p = "5th CLASS PROVINCE"

	prov_incomeclass_choices = (
		(prov_1p, "1st Class Province"),
		(prov_2p, "2nd Class Province"),
		(prov_4p, "4th Class Province"),
		(prov_5p, "5th Class Province")
	)
	income_class	= models.CharField(max_length=22, choices=prov_incomeclass_choices)
	area 			= models.IntegerField(default=0)
	longitude 		= models.DecimalField(max_digits=13, decimal_places=10, default=0)
	latitude 		= models.DecimalField(max_digits=13, decimal_places=10, default=0)

	def __str__(self):
		return self.prov_name

class MuniSocioData(models.Model):
	prov_id 			= models.ForeignKey(ProvSocioData, on_delete=models.CASCADE)
	muni_id 			= models.IntegerField(primary_key=True)
	muni_name 			= models.CharField(max_length=200)

	muni = "MUNICIPALITY"
	city = "CITY"
	muni_or_city_choices = (
		(muni, "Municipality"),(city, "City")
	)
	muni_or_city 		= models.CharField(max_length=12, choices=muni_or_city_choices, blank=True, null=True)

	coastal = "COASTAL"
	inland 	= "INLAND"
	coast_inld_choices = (
		(coastal, "Coastal"),(inland, "Inland")
	)
	coast_inld 			= models.CharField(max_length=7, choices=coast_inld_choices, blank=True, null=True)
	muni_1c = "1st CLASS MUNICIPALITY"
	muni_2c = "2nd CLASS MUNICIPALITY"
	muni_3c = "3rd CLASS MUNICIPALITY"
	muni_4c = "4th CLASS MUNICIPALITY"
	muni_5c = "5th CLASS MUNICIPALITY"
	muni_6c = "6th CLASS MUNICIPALITY"
	city_1c = "1st CLASS CITY"
	city_2c = "2nd CLASS CITY"
	city_3c = "3rd CLASS CITY"
	city_4c = "4th CLASS CITY"

	muni_incomeclass_choices = (
		(muni_1c, "1st Class Municipality"),
		(muni_2c, "2nd Class Municipality"),
		(muni_3c, "3rd Class Municipality"),
		(muni_4c, "4th Class Municipality"),
		(muni_5c, "5th Class Municipality"),
		(muni_6c, "6th Class Municipality"),
		(city_1c, "1st Class City"),
		(city_2c, "2nd Class City"),
		(city_3c, "3rd Class City"),
		(city_4c, "4th Class City")
	)
	income_class 		= models.CharField(max_length=22, choices=muni_incomeclass_choices, blank=True, null=True)
	num_brgy 			= models.IntegerField(blank=True, null=True)
	area 				= models.IntegerField(blank=True, null=True)
	pop_1990 			= models.IntegerField(blank=True, null=True)
	pop_1995 			= models.IntegerField(blank=True, null=True)
	pop_2000 			= models.IntegerField(blank=True, null=True)
	pop_2007 			= models.IntegerField(blank=True, null=True)
	pop_2010 			= models.IntegerField(blank=True, null=True)
	pop_2015 			= models.IntegerField(blank=True, null=True)
	anpopgrowth9015 	= models.DecimalField(max_digits=11, decimal_places=2, blank=True, null=True)
	num_hhold 			= models.IntegerField(blank=True, null=True)
	hhold_pop2010 		= models.IntegerField(blank=True, null=True)
	hhold_pop0_14y 		= models.IntegerField(blank=True, null=True)
	hhold_pop15_64y 	= models.IntegerField(blank=True, null=True)
	hhold_pop_65above 	= models.IntegerField(blank=True, null=True)
	hhold_pop_female 	= models.IntegerField(blank=True, null=True)
	hhold_popf0_14y 	= models.IntegerField(blank=True, null=True)
	hhold_popf15_64y 	= models.IntegerField(blank=True, null=True)
	hhold_popf_65above 	= models.IntegerField(blank=True, null=True)
	hhold_pop_male 		= models.IntegerField(blank=True, null=True)
	hhold_popm0_14y 	= models.IntegerField(blank=True, null=True)
	hhold_popm15_64y 	= models.IntegerField(blank=True, null=True)
	hhold_popm_65above 	= models.IntegerField(blank=True, null=True)
	sex_ratio_2010 		= models.IntegerField(blank=True, null=True)
	dependency_2010 	= models.IntegerField(blank=True, null=True)
	povinc_2003 		= models.IntegerField(blank=True, null=True)
	povinc_2006 		= models.IntegerField(blank=True, null=True)
	povinc_2009 		= models.IntegerField(blank=True, null=True)
	povinc_2012 		= models.IntegerField(blank=True, null=True)
	num_fisher 			= models.IntegerField(blank=True, null=True)
	male_fisher 		= models.IntegerField(blank=True, null=True)
	female_fisher 		= models.IntegerField(blank=True, null=True)
	num_boats 			= models.IntegerField(blank=True, null=True)

	def __str__(self):
		return self.muni_name

# E N D  O F  H A B S  S T A T I C  D A T A

#________________________________________________________________________________________#

# S T A R T  O F  H A B S  H I S T O R I C A L  D A T A
class Source(models.Model):
	source_id	= models.AutoField(primary_key=True)
	laboratory 	= models.CharField(max_length=200)
	institution = models.CharField(max_length=200)
	method 		= models.CharField(max_length=200, blank=True, null=True)
	equipment 	= models.CharField(max_length=200, blank=True, null=True)
	summary 	= models.CharField(max_length=200, blank=True, null=True)
	remarks 	= models.CharField(max_length=200, blank=True, null=True)

	def __str__(self):
		return self.institution
		#return '%s %s' % (self.laboratory, self.institution)

class Ownership(models.Model):
	owner_id	= models.AutoField(primary_key=True)
	data_type 	= models.CharField(max_length=100)
	year		= models.CharField(max_length=50)
	source 		= models.CharField(max_length=50)
	method 		= models.CharField(max_length=50, blank=True, null=True)
	equipment 	= models.CharField(max_length=50, blank=True, null=True)
	summary 	= models.CharField(max_length=50, blank=True, null=True)
	remarks 	= models.CharField(max_length=200, blank=True, null=True)

	def __str__(self):
		return self.data_type

class ChemOceData(models.Model):
	sample_id 		= models.AutoField(primary_key=True)
	muni_id 		= models.ForeignKey(MuniSocioData, on_delete=models.CASCADE)
	year 			= models.IntegerField()
	month 			= models.CharField(max_length=20)
	day 			= models.IntegerField(blank=True, null=True)
	date 			= models.DateField(blank=True, null=True)
	time 			= models.CharField(max_length=8, blank=True, null=True)
	cruise_id	 	= models.CharField(max_length=200, blank=True, null=True)
	station_id	 	= models.CharField(max_length=50)
	longitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	latitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	bot_depth 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	depth 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	station_depth 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	sampling_depth 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	chl_a 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	no2 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	no3 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ave_no3 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	nh3 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ave_nh3 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	nh4 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	nox 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	po4 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ave_po4 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	p 				= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	tin 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	si 				= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	sio2 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ave_sio2 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	sio3 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ave_sio3 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ave_sio4 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	n_p 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	tss 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	o2 				= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ta 				= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	dic 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ph 				= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	lab_temp 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	field_temp 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	salinity 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	pco2_out 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	revelle_out 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	wca_out 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	war_out 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	xco2_out 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	source_id 		= models.ForeignKey(Source, on_delete=models.CASCADE)
	
	daily 	= "DAILY"
	monthly = "MONTHLY"
	cruise 	= "CRUISE"
	spatial = "SPATIAL"
	data_type_choices = (
		(daily, "Daily"),
		(monthly, "Monthly"),
		(cruise, "Cruise"),
		(spatial, "Spatial")
	)
	data_type = models.CharField(max_length=7, choices=data_type_choices)
	method 	= models.CharField(max_length=200)

	
class POData(models.Model):
	sample_id 		= models.AutoField(primary_key=True)
	muni_id 		= models.ForeignKey(MuniSocioData, on_delete=models.CASCADE)
	year 			= models.IntegerField()
	month 			= models.CharField(max_length=20)
	day 			= models.IntegerField(blank=True, null=True)
	date 			= models.DateField(blank=True, null=True)
	time 			= models.CharField(max_length=8, blank=True, null=True)
	cruise_id 		= models.CharField(max_length=200, blank=True, null=True)
	station_id	 	= models.CharField(max_length=50)
	longitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	latitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	pressure 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	depth 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	temp 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	conductivity 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	salinity 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	density 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	do 				= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	fluorescence	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	chl_a 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	cdom 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	turbidity 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	method 			= models.CharField(max_length=200)
	remarks 		= models.CharField(max_length=200)
	source_id 		= models.ForeignKey(Source, on_delete=models.CASCADE)

class CellCount(models.Model):
	sample_id 		= models.AutoField(primary_key=True)
	year 			= models.IntegerField()
	month 			= models.CharField(max_length=20)
	day 			= models.IntegerField(blank=True, null=True)
	date 			= models.DateField(blank=True, null=True)
	time 			= models.CharField(max_length=8, blank=True, null=True)
	latitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	longitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	station_name 	= models.CharField(max_length=50, blank=True, null=True)
	station_depth 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	sample_depth 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	group 			= models.CharField(max_length=50, blank=True, null=True)
	species 		= models.CharField(max_length=50, blank=True, null=True)
	gs_id 			= models.CharField(max_length=200, blank=True, null=True)
	count 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)

class Toxicity(models.Model):
	muni_id 		= models.ForeignKey(MuniSocioData, on_delete=models.CASCADE)
	sample_id 		= models.AutoField(primary_key=True)
	year 			= models.IntegerField()
	month 			= models.CharField(max_length=20)
	day 			= models.IntegerField(blank=True, null=True)
	date 			= models.DateField(blank=True, null=True)
	time 			= models.CharField(max_length=8, blank=True, null=True)
	station_name 	= models.CharField(max_length=50)
	latitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	longitude 		= models.DecimalField(max_digits=16, decimal_places=10, default=0)
	shellfish_sample = models.CharField(max_length=50)
	results 		= models.CharField(max_length=50, blank=True, null=True)
	periodate 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	peroxide 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	total_stx 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ng_stx_ml 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ng_stx_g 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ng_stx_100g		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	ug_stx_100g 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	domoic_acid 	= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	psts 			= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	toxicity 		= models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
	source_id 		= models.ForeignKey(Source, on_delete=models.CASCADE)



# E N D  O F  H A B S  H I S T O R I C A L  D A T A