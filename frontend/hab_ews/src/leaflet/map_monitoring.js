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

export default class MapMonitoring extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      station: [],
    };
  }

  componentDidMount() {
    /*NOTE:when deploying from remote server, always set url to that of remote url 
    so axios will get values from remote and not from localhost*/
    axios.get("http://10.199.20.25:8000/api/station/")                  // for Ubuntu-001
    /*axios.get("http://localhost:8000/api/sensor-latest-data/")*/      // for localhost
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
    const {sensor} = this.state;
    return (
      <Map center={position} zoom={6}>
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
                              <td>Location:</td>
                              <td>{station.longitude}, {station.latitude}</td> 
                            </tr>
                            <tr>
                              <td>Station Depth:</td>
                              <td>{station.station_depth} m</td> 
                            </tr>
                            <tr>
                              <td>Last Updated:</td>
                              <td>{station.date}; {station.time}</td> 
                            </tr>
                            <br />
                            <tr>
                              <td>Temperature:</td>
                              <td>{station.temp}</td> 
                            </tr>
                            <tr>
                              <td>Salinity</td>
                              <td>{station.salinity}</td> 
                            </tr>
                            <tr>
                              <td>Turbidity</td>
                              <td>{station.turbidity}</td> 
                            </tr>
                            <tr>
                              <td>pH</td>
                              <td>{station.ph}</td> 
                            </tr>
                            <tr>
                              <td>Dissolved Oxygen</td>
                              <td>{station.do}</td> 
                            </tr>
                            <tr>
                              <td>Chlorophyll-a</td>
                              <td>{station.chl_a}</td> 
                            </tr>
                            <br />
                            <tr>
                              <td>Predictive Model Status:</td>
                              <td>{station.has_hab}</td> 
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
