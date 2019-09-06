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
  withLeaflet,
  Circle,
  Rectangle,
} from 'react-leaflet';
import { popupContent, popupHead, popupText, okText } from "./popupStyle";
import { redMarker, blueMarker, orangeMarker } from "./mapMarker";

export default class MapMonitoring extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      center: [12.599512, 121.984222],
      zoom: 6,
      advisoryAPI: [],
      monitoringAPI: [],
      habHistoryAPI: [],
      siteHistoryAPI: [],
      station: [],
    };
  }

  componentDidMount() {
    /*NOTE:when deploying from remote server, always set url to that of remote url 
    so axios will get values from remote and not from localhost*/
    /*axios.get("http://10.199.20.25:8000/api/station/")*/                // for Ubuntu-001
    axios.get("http://localhost:8000/api/station/")                       // for localhost
      .then(res => {
        const advisoryAPI = res.data;
        this.setState({ advisoryAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

    /*axios.get("http://10.199.20.25:8000/api/sensor-latest-data/")*/     // for Ubuntu-001
    axios.get("http://localhost:8000/api/sensor-latest-data/")            // for localhost
      .then(res => {
        const monitoringAPI = res.data;
        this.setState({ monitoringAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

    axios.get("http://localhost:8000/api/sensor-latest-data/")            // for localhost
      .then(res => {
        const habHistoryAPI = res.data;
        this.setState({ habHistoryAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

      axios.get("http://localhost:8000/api/sensor-latest-data/")            // for localhost
      .then(res => {
        const siteHistoryAPI = res.data;
        this.setState({ siteHistoryAPI });
      })
      .catch(function (error) {
      console.log(error);
      })
    
  }
  
  render() {
    const {advisoryAPI} = this.state;
    const {monitoringAPI} = this.state;
    const {habHistoryAPI} = this.state;
    const {siteHistoryAPI} = this.state;
    return (
      <Map
        center={this.state.center} 
        zoom={this.state.zoom}>
        <LayersControl collapsed="false" position="topright">
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
              {advisoryAPI.map((e, i) => {
                return( 
                  <FeatureGroup name={e.station_name}>
                    <Marker 
                      key={i} 
                      position={{lat:e.latitude, lng:e.longitude}}
                      icon={e.has_hab ? redMarker : blueMarker}>
                      <Popup>
                        <div style={popupContent}>
                          <div style={popupHead}>
                            {e.station_name}
                          </div>
                          <div style={popupText}>
                          <table>
                            <tr>
                              <td>Location:</td>
                              <td>{e.longitude}, {e.latitude}</td> 
                            </tr>
                            <tr>
                              <td>Last Updated:</td>
                              <td>{e.timestamp}</td> 
                            </tr>
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
          <LayersControl.Overlay name="Monitoring Sites">
            <LayerGroup>
              {monitoringAPI.map((e, i) => {
                return ( 
                  <FeatureGroup name={e.station_name}>
                      <Marker 
                        key={i} 
                        position={{lat:e.latitude, lng:e.longitude}}>
                        <Popup>
                          <div style={popupContent}>
                            <div style={popupHead}>
                              {e.station_name}
                            </div>
                            <div style={popupText}>
                            <table>
                              <tr>
                                <td>Location:</td>
                                <td>{e.longitude}, {e.latitude}</td> 
                              </tr>
                              <tr>
                                <td>Station Depth:</td>
                                <td>{e.station_depth} m</td> 
                              </tr>
                              <tr>
                                <td>Last Updated:</td>
                                <td>{e.date}; {e.time}</td> 
                              </tr>
                              <br />
                              <tr>
                                <td>Temperature:</td>
                                <td>{e.temp} <a href="/charts" target="_blank"><i class="fa fa-area-chart"></i></a></td> 
                              </tr>
                              <tr>
                                <td>Salinity</td>
                                <td>{e.salinity} <a href="/charts" target="_blank"><i class="fa fa-area-chart"></i></a></td> 
                              </tr>
                              <tr>
                                <td>Turbidity</td>
                                <td>{e.turbidity} <a href="/charts" target="_blank"><i class="fa fa-area-chart"></i></a></td> 
                              </tr>
                              <tr>
                                <td>pH</td>
                                <td>{e.ph} <a href="/charts" target="_blank"><i class="fa fa-area-chart"></i></a></td> 
                              </tr>
                              <tr>
                                <td>Dissolved Oxygen</td>
                                <td>{e.do} <a href="/charts" target="_blank"><i class="fa fa-area-chart"></i></a></td> 
                              </tr>
                              <tr>
                                <td>Chlorophyll-a</td>
                                <td>{e.chl_a} <a href="/charts" target="_blank"><i class="fa fa-area-chart"></i></a></td> 
                              </tr>
                              <br />
                              <tr>
                                <td>Predictive Model Status:</td>
                                <td>{e.has_hab}</td> 
                              </tr>
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
          <LayersControl.Overlay name="Historical HAB Events">
            <LayerGroup>
              {habHistoryAPI.map((e, i) => {
                return ( 
                  <FeatureGroup name={e.station_name}>
                      <Marker 
                        key={i} 
                        position={{lat:e.latitude, lng:e.longitude}}>
                        <Popup>
                          <div style={popupContent}>
                            <div style={popupHead}>
                              {e.station_name}
                            </div>
                            <div style={popupText}>
                            <table>
                              <tr>
                                <td>Location:</td>
                                <td>{e.longitude}, {e.latitude}</td> 
                              </tr>
                              <tr>
                                <td>Station Depth:</td>
                                <td>{e.station_depth} m</td> 
                              </tr>
                              <tr>
                                <td>Last Updated:</td>
                                <td>{e.date}; {e.time}</td> 
                              </tr>
                              <br />
                              <tr>
                                <td>Temperature:</td>
                                <td>{e.temp}</td> 
                              </tr>
                              <tr>
                                <td>Salinity</td>
                                <td>{e.salinity}</td> 
                              </tr>
                              <tr>
                                <td>Turbidity</td>
                                <td>{e.turbidity}</td> 
                              </tr>
                              <tr>
                                <td>pH</td>
                                <td>{e.ph}</td> 
                              </tr>
                              <tr>
                                <td>Dissolved Oxygen</td>
                                <td>{e.do}</td> 
                              </tr>
                              <tr>
                                <td>Chlorophyll-a</td>
                                <td>{e.chl_a}</td> 
                              </tr>
                              <br />
                              <tr>
                                <td>Predictive Model Status:</td>
                                <td>{e.has_hab}</td> 
                              </tr>
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
          <LayersControl.Overlay name="Historical Site Data">
            <LayerGroup>
              {siteHistoryAPI.map((e, i) => {
                return ( 
                  <FeatureGroup name={e.station_name}>
                      <Marker 
                        key={i} 
                        position={{lat:e.latitude, lng:e.longitude}}>
                        <Popup>
                          <div style={popupContent}>
                            <div style={popupHead}>
                              {e.station_name}
                            </div>
                            <div style={popupText}>
                            <table>
                              <tr>
                                <td>Location:</td>
                                <td>{e.longitude}, {e.latitude}</td> 
                              </tr>
                              <tr>
                                <td>Station Depth:</td>
                                <td>{e.station_depth} m</td> 
                              </tr>
                              <tr>
                                <td>Last Updated:</td>
                                <td>{e.date}; {e.time}</td> 
                              </tr>
                              <br />
                              <tr>
                                <td>Temperature:</td>
                                <td>{e.temp}</td> 
                              </tr>
                              <tr>
                                <td>Salinity</td>
                                <td>{e.salinity}</td> 
                              </tr>
                              <tr>
                                <td>Turbidity</td>
                                <td>{e.turbidity}</td> 
                              </tr>
                              <tr>
                                <td>pH</td>
                                <td>{e.ph}</td> 
                              </tr>
                              <tr>
                                <td>Dissolved Oxygen</td>
                                <td>{e.do}</td> 
                              </tr>
                              <tr>
                                <td>Chlorophyll-a</td>
                                <td>{e.chl_a}</td> 
                              </tr>
                              <br />
                              <tr>
                                <td>Predictive Model Status:</td>
                                <td>{e.has_hab}</td> 
                              </tr>
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
