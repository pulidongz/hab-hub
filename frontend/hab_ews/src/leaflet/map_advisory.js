import React from 'react';
import axios from 'axios';
import {
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
} from 'react-leaflet'

import { popupContent, popupHead, popupText, okText } from "./popupStyle";

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

const { BaseLayer, Overlay } = LayersControl

export default class MapAdvisory extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      station: []
    };
  }

  componentDidMount() {
    /*axios.get("http://10.199.20.25:8000/api/station/")*/ // [for Ubuntu-001]--NOTE:when deploying from remote server, always set url to that of remote url so axios will get values from remote and not from localhost
    axios.get("http://localhost:8000/api/station/")     //for localhost
      .then(res => {
        const station = res.data;
        this.setState({ station });
      })
      .catch(function (error) {
      console.log(error);
      })
  }

  render() {
    const position = [12.599512, 121.984222];
    const {station} = this.state;
    return (
      <Map center={[12.599512, 121.984222]} zoom={6}>
        <LayersControl position="topright">
          <BaseLayer name="ESRI">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
          <BaseLayer checked name="Hydda">
            <TileLayer
              attribution='Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          
            {station.map((station, i) => {
              return ( 

                <Overlay checked name={station.station_name}>
                  <LayerGroup>
                    <Marker 
                      key={i} 
                      position={{lat:station.latitude, lng:station.longitude}}>
                      <Popup>
                        <div style={popupContent}>
                          <div style={popupHead}>
                            {station.station_name}
                          </div>
                          <div style={popupText}>
                          <table>
                            <tr>
                              <td>Sensor Last Updated:</td>
                              <td>dummy</td> 
                            </tr>
                            <tr>
                              <td>Predictive Model Status:</td>
                              <td>0</td> 
                            </tr>
                          </table>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </LayerGroup>
                </Overlay>
                )
              })}


        </LayersControl>
      </Map>
    )
  }
}
