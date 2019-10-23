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
} from 'react-leaflet'

import { popupContent, popupHead, popupText } from "./popupStyle";
import { redMarker, blueMarker } from "./mapMarker";

//Change value for localhost or development server
//Localhost
//const URL = 'localhost';
//Biome Server
const URL = '10.199.20.25';

export default class MapAdvisory extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      center: [12.599512, 121.984222],
      zoom: 5,
      station: [],
    };
  }

  componentDidMount() {
    this.loadStation();
    /*this.interval = setInterval(this.loadStation(), 3000);*/
  }

  async loadStation() {
    /*NOTE:when deploying from remote server, always set url to that of remote url 
    so axios will get values from remote and not from localhost*/
    /*await axios.get("http://10.199.20.25:8000/api/station/")*/        // for Ubuntu-001
    await axios.get('http://'+URL+':8000/api/station/')      // for localhost
      .then(res => {
        const station = res.data;
        this.setState({ station });
      })
      .catch(function (error) {
      console.log(error);
      })
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.station !== this.props.station) {
      this.timer = setTimeout(this.loadStation(), 3000);
    }

    /*this.timer = setTimeout(this.loadStation(), 3000);*/
    /*setTimeout(this.loadStation(), 3000);*/
    /*this.interval = setInterval(this.loadStation(), 3000);*/
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timer);
  }

  render() {
    const {station} = this.state;

    return (
      <Map className="leaflet_advisory_map" center={this.state.center} zoom={this.state.zoom} scrollWheelZoom="false">
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="ESRI World Imagery">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="ESRI World Street Map">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="HAB Advisory">
            <LayerGroup>
              {station.map((station, i) => {
                return( 
                  <FeatureGroup name={station.station_name} key={i}>
                    <Marker
                      position={{lat:station.latitude, lng:station.longitude}}
                      icon={station.has_hab ? redMarker : blueMarker}>
                      <Popup>
                        <div style={popupContent}>
                          <div style={popupHead}>
                            {station.station_name}
                          </div>
                          <div style={popupText}>
                          <table>
                            <tbody>
                              <tr>
                                <td>Location:</td>
                                <td>{station.longitude}, {station.latitude}</td> 
                              </tr>
                              <tr>
                                <td>Last Updated:</td>
                                <td>{station.timestamp}</td> 
                              </tr>
                              </tbody>
                          </table>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </FeatureGroup>
                )
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    )
  }
}
