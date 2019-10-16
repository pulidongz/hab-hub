import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { popupContent, popupHead, popupText } from "./popupStyle";
import { redMarker, blueMarker } from "./mapMarker";
import { modal, modalMain, displayBlock, displayNone } from "../components/modalStyle";
import Timeseries from "../components/timeseries";
import TimeTesting from "../components/testing";
/*import PropTypes from 'prop-types';*/

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



export default class MapMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [12.599512, 121.984222],
      zoom: 6,
      advisoryAPI: [],
      monitoringAPI: [],
      habHistoryAPI: [],
      siteHistoryAPI: [],
      stationName: '',
      stationID: null,
      showTimeSeries: '',
      showModal: false
    };

    // Our event handlers
    this.getStationName = this.getStationName.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  getStationName(name, id, timeseries){
    this.setState(
      {
        stationName: name,
        stationID: id,
        showTimeSeries: timeseries,
        showModal: true
      }
    );
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  async componentDidMount() {
    
  Modal.setAppElement('body');

    /*NOTE:when deploying from remote server, always set url to that of remote url 
    so axios will get values from remote and not from localhost*/
    /*await axios.get("http://10.199.20.25:8000/api/station/")*/                // for Ubuntu-001
    await axios.get("http://localhost:8000/api/station/")                       // for localhost
      .then(res => {
        const advisoryAPI = res.data;
        this.setState({ advisoryAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

    /*await axios.get("http://10.199.20.25:8000/api/sensor-latest-data/")*/     // for Ubuntu-001
    await axios.get("http://localhost:8000/api/sensor-latest-data/")            // for localhost
      .then(res => {
        const monitoringAPI = res.data;
        this.setState({ monitoringAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

    await axios.get("http://localhost:8000/api/sensor-latest-data/")            // for localhost
      .then(res => {
        const habHistoryAPI = res.data;
        this.setState({ habHistoryAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

    await axios.get("http://localhost:8000/api/sensor-latest-data/")            // for localhost
      .then(res => {
        const siteHistoryAPI = res.data;
        this.setState({ siteHistoryAPI });
      })
      .catch(function (error) {
      console.log(error);
      })

    /*this.getStationName(this.state.stationName, this.state.stationID, this.state.showTimeSeries);*/
  }
  
  render() {
    const {advisoryAPI} = this.state;
    const {monitoringAPI} = this.state;
    const {habHistoryAPI} = this.state;
    const {siteHistoryAPI} = this.state;



    return (
      <Map center={this.state.center} zoom={this.state.zoom}>
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
          <LayersControl.Overlay name="HAB Advisory">
            <LayerGroup>
              {advisoryAPI.map((e, i) => {
                return( 
                  <FeatureGroup name={e.station_name} key={i}>
                    <Marker 
                      position={{lat:e.latitude, lng:e.longitude}}
                      icon={e.has_hab ? redMarker : blueMarker}>
                      <Popup>
                        <div style={popupContent}>
                          <div style={popupHead}>
                            {e.station_name}
                          </div>
                          <div style={popupText}>
                          <table>
                            <tbody>
                              <tr>
                                <td>Location:</td>
                                <td>{e.longitude}, {e.latitude}</td> 
                              </tr>
                              <tr>
                                <td>Last Updated:</td>
                                <td>{e.timestamp}</td> 
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
          <LayersControl.Overlay checked name="Monitoring Sites">
            <LayerGroup>
              {monitoringAPI.map((e, i) => {
                return ( 
                  <FeatureGroup name={e.name} key={i}>
                      <Marker 
                        position={{lat:e.latitude, lng:e.longitude}}>
                        <Popup>
                          <div style={popupContent}>
                            <div style={popupHead}>
                              {e.name}
                            </div>
                            <div style={popupText}>
                            <table>
                              <tbody>
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
                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Temperature (°C)</td>
                                  <td>{e.temp}</td>
                                  <td>
                                    <div>
                                      <button onClick={() => {this.getStationName(e.name, e.station_name, 'temp')}}><i className="fa fa-area-chart"></i></button>
                                      <Modal 
                                       isOpen={this.state.showModal}
                                       contentLabel="onRequestClose Example"
                                       onRequestClose={this.handleCloseModal}
                                       shouldCloseOnOverlayClick={true}
                                      >
                                        <Timeseries name={this.state.stationName} id={this.state.stationID} timeseries={this.state.showTimeSeries} />
                                        <button onClick={this.handleCloseModal}>Close Modal</button>
                                      </Modal>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                 <td>Salinity (ppt):</td>
                                  <td>{e.salinity}</td> 
                                  <td>
                                    <div>
                                      <button onClick={() => {this.getStationName(e.name, e.station_name, 'salinity')}}><i className="fa fa-area-chart"></i></button>
                                      <Modal 
                                       isOpen={this.state.showModal}
                                       contentLabel="onRequestClose Example"
                                       onRequestClose={this.handleCloseModal}
                                       shouldCloseOnOverlayClick={true}
                                      >
                                        <Timeseries name={this.state.stationName} id={this.state.stationID} timeseries={this.state.showTimeSeries} />
                                        <button onClick={this.handleCloseModal}>Close Modal</button>
                                      </Modal>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Turbidity (mg/m3):</td>
                                  <td>{e.turbidity}</td> 
                                  <td>
                                    <div>
                                      <button onClick={() => {this.getStationName(e.name, e.station_name, 'turbidity')}}><i className="fa fa-area-chart"></i></button>
                                      <Modal 
                                       isOpen={this.state.showModal}
                                       contentLabel="onRequestClose Example"
                                       onRequestClose={this.handleCloseModal}
                                       shouldCloseOnOverlayClick={true}
                                      >
                                        <Timeseries name={this.state.stationName} id={this.state.stationID} timeseries={this.state.showTimeSeries} />
                                        <button onClick={this.handleCloseModal}>Close Modal</button>
                                      </Modal>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>pH:</td>
                                  <td>{e.ph}</td> 
                                  <td>
                                    <div>
                                      <button onClick={() => {this.getStationName(e.name, e.station_name, 'ph')}}><i className="fa fa-area-chart"></i></button>
                                      <Modal 
                                       isOpen={this.state.showModal}
                                       contentLabel="onRequestClose Example"
                                       onRequestClose={this.handleCloseModal}
                                       shouldCloseOnOverlayClick={true}
                                      >
                                        <Timeseries name={this.state.stationName} id={this.state.stationID} timeseries={this.state.showTimeSeries} />
                                        <button onClick={this.handleCloseModal}>Close Modal</button>
                                      </Modal>
                                    </div>      
                                  </td>
                                </tr>
                                <tr>
                                  <td>Dissolved Oxygen (mg/L):</td>
                                  <td>{e.do}</td> 
                                  <td>
                                    <div>
                                      <button onClick={() => {this.getStationName(e.name, e.station_name, 'do')}}><i className="fa fa-area-chart"></i></button>
                                      <Modal 
                                       isOpen={this.state.showModal}
                                       contentLabel="onRequestClose Example"
                                       onRequestClose={this.handleCloseModal}
                                       shouldCloseOnOverlayClick={true}
                                      >
                                        <Timeseries name={this.state.stationName} id={this.state.stationID} timeseries={this.state.showTimeSeries} />
                                        <button onClick={this.handleCloseModal}>Close Modal</button>
                                      </Modal>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Chlorophyll-A (mg/m3):</td>
                                  <td>{e.chl_a}</td> 
                                  <td>
                                    <div>
                                      <button onClick={() => {this.getStationName(e.name, e.station_name, 'chl_a')}}><i className="fa fa-area-chart"></i></button>
                                      <Modal 
                                       isOpen={this.state.showModal}
                                       contentLabel="onRequestClose Example"
                                       onRequestClose={this.handleCloseModal}
                                       shouldCloseOnOverlayClick={true}
                                      >
                                        <Timeseries name={this.state.stationName} id={this.state.stationID} timeseries={this.state.showTimeSeries} />
                                        <button onClick={this.handleCloseModal}>Close Modal</button>
                                      </Modal>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Predictive Model Status:</td>
                                  <td>{e.has_hab}</td> 
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
          <LayersControl.Overlay name="Historical HAB Events">
            <LayerGroup>
              {habHistoryAPI.map((e, i) => {
                return ( 
                  <FeatureGroup name={e.name} key={i}>
                      <Marker 
                        position={{lat:e.latitude, lng:e.longitude}}>
                        <Popup>
                          <div style={popupContent}>
                            <div style={popupHead}>
                              {e.name}
                            </div>
                            <div style={popupText}>
                            <table>
                              <tbody>
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
          <LayersControl.Overlay name="Historical Site Data">
            <LayerGroup>
              {siteHistoryAPI.map((e, i) => {
                return ( 
                  <FeatureGroup name={e.name} key={i} >
                      <Marker 
                        position={{lat:e.latitude, lng:e.longitude}}>
                        <Popup>
                          <div style={popupContent}>
                            <div style={popupHead}>
                              {e.name}
                            </div>
                            <div style={popupText}>
                            <table>
                              <tbody>
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
