import pandas as pd
import sys
from django.utils import timezone
import numpy as np
from habdb.models import  Plankton, PlanktonSample, Sample, Station
from decimal import Decimal


orig_stdout = sys.stdout
dt_now = timezone.datetime.now()
logfilename = str(dt_now) + ".log"
f = open(logfilename, 'w')
sys.stdout = f

#file = "/mnt/d/projects/habs_ews/data/bolinao_cell_count.csv"
file="/mnt/d/projects/hab_ews/habdb/data/bolinao_cell_count.csv"
print("Loading %s..." % file)

df = pd.read_csv(file, encoding='ISO-8859-1', parse_dates=['date'], converters={'sample_id': str})
print("Reading %i records..." % len(df))

for i, rows in df.iterrows():
    station_name = df['station_num'].loc[i]
    sample_date = df['date'].loc[i]
    species = str(df['species'].loc[i])
    print("Dataframe row %i:" % i)

    try:
        if pd.isna(station_name):
            print("Row %i station value is nan. Skipping..." % i)
            continue

        station = Station.objects.get(station_name=station_name)
        print("Getting records for station %s." % station.station_name)
    except Station.DoesNotExist:
        print("Station %s is not in the database. Creating new records..."
              % station_name)
    #   station = add_new_station(df, i)
        station = Station(
            station_name=df['station_num'].loc[i],
            longitude=df['longitude'].loc[i],
            latitude=df['latitude'].loc[i],
            station_depth=Decimal(df['station_depth'].loc[i])
            )
        station.save()
        print("Adding station %s to record." %station.station_name)

    try:
        sample = Sample.objects.get(station=station, sample_date=sample_date)
        print("Getting sample records: %s, %s" % (sample.station.station_name, sample.sample_date))
    except Sample.DoesNotExist:
        print("Sample number %s from Station %s taken on %s is not  in the database. Creating new  record..."
              % (df['sample_id'].loc[i],
                 station_name,
                 str(sample_date)))
        sample = Sample(
            station=station,
            sample_date=df['date'].loc[i]
        )
        sample.save()
        print("Adding sample record to station %s: %s"
              % (str(sample.station), str(sample.sample_date)))

    try:
        plankton = Plankton.objects.get(species=species)
        print("Getting records for plankton %s" % plankton.species)
    except Plankton.DoesNotExist:
        print("Adding plankton %s to record." % species)
        #plankton = add_new_plankton(df, i)
        plankton = Plankton(
            species = df['species'].loc[i],
            group = df['group'].loc[i]
            )
        print("Adding plankton %s to record."
            % plankton.species)
        plankton.save()

    try:
        cellcount = PlanktonSample.objects.get(sample=sample, plankton=plankton)
        print("Cell count of plankton %s from  station %s: %s already exists."
              % (plankton.species,
                 sample.station.station_name,
                 str(sample.sample_date)))
#    add_cell_count(df, i, sample, plankton)
    except PlanktonSample.DoesNotExist:
        p = PlanktonSample(
            sample=sample,
            sample_number=df['sample_id'].loc[i],
            plankton=plankton,
            cell_count=df['count'].loc[i]
            )
        p.save()
        print("Adding new cell count record: %d %s in station %s: %s: sample number %s."
              % (p.cell_count,
                    p.plankton.species,
                    str(p.sample.station),
                    str(p.sample.sample_date),
                    str(p.sample_number)))

sys.stdout = orig_stdout
f.close()