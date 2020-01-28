import React, {PureComponent} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import CsvDownloader from 'react-csv-downloader';

import Leaflet from 'leaflet';
import { 
  Page, 
  Grid,
  Container, 
  Form,
  Card,
  Button,
} from "tabler-react";
import MapMonitoring from "./leaflet/map_monitoring";
import SiteWrapper from "./SiteWrapper.react";

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

/*  NOTE: When deploying from remote server, always set url to that
 *  of remote url so axios will get values from remote and not from localhost.
 *  Change value for localhost or development server
 */
//Localhost
const URL = 'localhost';
//Biome Server
//const URL = '10.199.20.25';


export default class SiteMonitoringPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      exportData                  : [],
      dataToCsv                   : [],
      monitoring_site             : 'all_monitoring_sites',
      temp                        : false,
      salinity                    : false,
      turbidity                   : false,
      ph                          : false,
      do                          : false,
      chl_a                       : false,
      toxicity                    : false,
      speciesList                 : false,
      pmr                         : false,
      goDownload                  : false
    };

    this.handleAllCheck = this.handleAllCheck.bind(this);
    this.handleAllUncheck = this.handleAllUncheck.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }
  /*  NOTE: Upon initial click (onchange), toggle button acquires the current this.state.value
   *  that is set, and then changes after the next several clicks (onchange).
   *  Basically, if this.state.value : false, then state:false is state:true and vice versa.
   */
  toggleMonitoringSite = (e) => {
    this.setState({
      monitoring_site: e.target.value,
      goDownload: true
    });
  }
  toggleTemp = () => {
    this.setState({temp: !this.state.temp});
    if(this.state.temp === false){
      this.setState({goDownload: true});
    }
  }
  toggleSalinity = () => {
    this.setState({salinity: !this.state.salinity});
    if(this.state.salinity === false){
      this.setState({goDownload: true});
    }
  }
  toggleTurbidity = () => {
    this.setState({turbidity: !this.state.turbidity});
    if(this.state.turbidity === false){
      this.setState({goDownload: true});
    }
  }
  togglePH = () => {
    this.setState({ph: !this.state.ph});
    if(this.state.ph === false){
      this.setState({goDownload: true});
    }
  }
  toggleDO = () => {
    this.setState({do: !this.state.do});
    if(this.state.do === false){
      this.setState({goDownload: true});
    }
  }
  toggleChlA = () => {
    this.setState({chl_a: !this.state.chl_a});
    if(this.state.chl_a === false){
      this.setState({goDownload: true});
    }
  }
  toggleToxicity = () => {
    this.setState({toxicity: !this.state.toxicity});
    if(this.state.toxicity === false){
      this.setState({goDownload: true});
    }
  }
  toggleSpeciesList = () => {
    this.setState({speciesList: !this.state.speciesList});
    if(this.state.speciesList === false){
      this.setState({goDownload: true});
    }
  }
  togglePMR = () => {
    this.setState({pmr: !this.state.pmr});
    if(this.state.pmr === false){
      this.setState({goDownload: true});
    }
  }

  handleAllCheck(){
    this.setState(
      {
        monitoring_site             : 'all_monitoring_sites',
        temp                        : true,
        salinity                    : true,
        turbidity                   : true,
        ph                          : true,
        do                          : true,
        chl_a                       : true,
        toxicity                    : true,
        speciesList                 : true,
        pmr                         : true,
        goDownload                  : true
      }
    );
  }

  handleAllUncheck(){
    this.setState(
      {
        monitoring_site             : '',
        temp                        : false,
        salinity                    : false,
        turbidity                   : false,
        ph                          : false,
        do                          : false,
        chl_a                       : false,
        toxicity                    : false,
        speciesList                 : false,
        pmr                         : false,
        goDownload                  : false
      }
    );
  }
  
  async componentDidMount(){
    await axios.get('http://'+URL+':8000/api/download/?ordering=time')
      .then(res => {
        const exportData = res.data;
        this.setState({exportData});
      })
      .catch(function (error) {
      console.log(error);
      })
  }

  downloadFile(){
    let obj = [];
    if(this.state.monitoring_site === 'bolinao'){
      obj = this.state.exportData.filter(station => station.station_name === 6);
    }
    else if(this.state.monitoring_site === 'manila_bay'){
      obj = this.state.exportData.filter(station => station.station_name === 13);
    }
    else if(this.state.monitoring_site === 'roxas'){
      obj = this.state.exportData.filter(station => station.station_name === 12);
    }
    else if(this.state.monitoring_site === 'samar_leyte'){
      obj = this.state.exportData.filter(station => station.station_name === 10);
    }
    this.setState({dataToCsv: obj});
    console.log(obj);
    console.log(this.state.dataToCsv);
    console.log(this.state.exportData);
  }

  render(){
     console.log(this.state.monitoring_site);
    const goDownload = this.state.goDownload;
    const {exportData} = this.state;
    const {dataToCsv} = this.state;
    /*var csv = [];
    if(exportData !== ''){
      csv = Papa.unparse(exportData);
    }*/
    /*console.log({exportData});
    console.log(exportData);*/

    const options = (
      <React.Fragment>
        <Form.Select className="w-auto mr-2">
          <option value="asc">Newest</option>
          <option value="desc">Oldest</option>
        </Form.Select>
        <Form.Input icon="search" placeholder="Search photo" />
      </React.Fragment>
    );
    return (
      <SiteWrapper>
        <Page.Content title="Site Monitoring Data Viewer and Downloader">
        <Grid.Row>
          <Form.Group>
            <Form.StaticText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Dolor morbi non arcu risus quis varius quam. Nunc congue nisi vitae suscipit tellus mauris. Tincidunt id aliquet risus feugiat in.
            </Form.StaticText>
          </Form.Group>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col lg={9}>
            <Container>
              <MapMonitoring />
            </Container>
          </Grid.Col>
          <Grid.Col lg={3}>
          <Card>
            <Card.Header>
              <Card.Title>Data Download Selection</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group label="Monitoring Sites">
                <Form.Radio
                  label="Bolinao, Pangasinan"
                  name="radio_monitoring_sites"
                  value="bolinao"
                  checked={this.state.monitoring_site === 'bolinao'}
                  onChange={this.toggleMonitoringSite}
                />
                <Form.Radio
                  label="Manila Bay"
                  name="radio_monitoring_sites"
                  value="manila_bay"
                  checked={this.state.monitoring_site === 'manila_bay'}
                  onChange={this.toggleMonitoringSite}
                />
                <Form.Radio
                  label="Roxas, Capiz"
                  name="radio_monitoring_sites"
                  value="roxas"
                  checked={this.state.monitoring_site === 'roxas'}
                  onChange={this.toggleMonitoringSite}
                />
                <Form.Radio
                  label="Samar - Leyte"
                  name="radio_monitoring_sites"
                  value="samar_leyte"
                  checked={this.state.monitoring_site === 'samar_leyte'}
                  onChange={this.toggleMonitoringSite}
                />
                <Form.Radio
                  label="All Sites"
                  name="radio_monitoring_sites"
                  value="all_monitoring_sites"
                  checked={this.state.monitoring_site === 'all_monitoring_sites'}
                  onChange={this.toggleMonitoringSite}
                />
              </Form.Group>
              <Form.Group label="Sensor Data">
                <Form.Checkbox
                  label="Temperature"
                  name="radio_sensor_data"
                  value="temp"
                  checked={this.state.temp}
                  onChange={this.toggleTemp}
                />
                <Form.Checkbox
                  label="Salinity"
                  name="radio_sensor_data"
                  value="salinity"
                  checked={this.state.salinity}
                  onChange={this.toggleSalinity}
                />
                <Form.Checkbox
                  label="Turbidity"
                  name="radio_sensor_data"
                  value="turbidity"
                  checked={this.state.turbidity}
                  onChange={this.toggleTurbidity}
                />
                <Form.Checkbox
                  label="pH"
                  name="radio_sensor_data"
                  value="ph"
                  checked={this.state.ph}
                  onChange={this.togglePH}
                />
                <Form.Checkbox
                  label="Dissolved Oxygen"
                  name="radio_sensor_data"
                  value="do"
                  checked={this.state.do}
                  onChange={this.toggleDO}
                />
                <Form.Checkbox
                  label="Chlorophyll-A"
                  name="radio_sensor_data"
                  value="chl_a"
                  checked={this.state.chl_a}
                  onChange={this.toggleChlA}
                />
              </Form.Group>
              <Form.Group label="Biological Data">
                <Form.Checkbox
                  label="Toxicity"
                  name="radio_biological_data"
                  value="toxicity"
                  checked={this.state.toxicity}
                  onChange={this.toggleToxicity}
                />
                <Form.Checkbox
                  label="Species List"
                  name="radio_biological_data"
                  value="species_list"
                  checked={this.state.speciesList}
                  onChange={this.toggleSpeciesList}
                />
                <Form.Checkbox
                  label="Predictive Model Results"
                  name="radio_biological_data"
                  value="pmr"
                  checked={this.state.pmr}
                  onChange={this.togglePMR}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <div className="col text-center">
                <button type="button" className="btn btn-link" onClick={() => {this.handleAllCheck()}}>Select All</button>|
                <button type="button" className="btn btn-link" onClick={() => {this.handleAllUncheck()}}>Unselect All</button>
              </div>
              <div className="col text-center">
                {goDownload ? (
                  <CsvDownloader datas={dataToCsv} filename="habdata">
                  <Button pill color="primary" type="button" icon="download" onClick={() => {this.downloadFile()}}>Download</Button>
                </CsvDownloader>)
                :(
                  <Button pill color="primary" type="button" icon="download" onClick={() => {this.handleAllUncheck()}}>Download</Button>
                )
                }
              </div>
            </Card.Footer>
          </Card>
          </Grid.Col>
        </Grid.Row>
        </Page.Content>
      </SiteWrapper>
    );
  }
}
