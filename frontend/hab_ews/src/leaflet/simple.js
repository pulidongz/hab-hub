import React from 'react';
import axios from 'axios';
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  GeoJSON,
} from 'react-leaflet'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

const { BaseLayer, Overlay } = LayersControl

export default class SimpleExample extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      station: []
    };
  }

  componentDidMount() {
    axios.get("http://10.199.20.25:8000/api/station/")
      .then(res => {
        const station = res.data;
        this.setState({ station });
      })
  }

  render() {
    const position = [12.599512, 121.984222];
    const {station} = this.state;
    return (
      <Map center={[12.599512, 121.984222]} zoom={6}>
        <LayersControl position="topright">
          <BaseLayer checked name="Hyda">
            <TileLayer
              attribution='Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="ESRI">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>

          <Overlay checked name="Stations">
            {station.map((station, i) => {
              return ( 
                <LayerGroup>
                  <Marker 
                    key={i} 
                    position={{lat:station.latitude, lng:station.longitude}}>
                    <Popup>
                      <span>
                        station: <b>{station.station_name}</b><br />
                        [{station.latitude}, {station.longitude}]<br />
                        depth: {station.station_depth}<br />
                      </span>
                    </Popup>
                  </Marker>
                </LayerGroup>
              )
            })}
          </Overlay>

          <GeoJSON addData={this.state.station} /> 
        </LayersControl>
      </Map>
    )
  }
}