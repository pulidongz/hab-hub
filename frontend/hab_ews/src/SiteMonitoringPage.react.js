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
      exportData  : [],
      bolinao     : false,
      manilaBay   : false,
      roxas       : false,
      samarLeyte  : false,
      temp        : false,
      salinity    : false,
      turbidity   : false,
      ph          : false,
      do          : false,
      chl_a       : false,
      toxicity    : false,
      speciesList : false,
      pmr         : false,
      goDownload  : false
    };

    this.handleAllCheck = this.handleAllCheck.bind(this);
    this.handleAllUncheck = this.handleAllUncheck.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }
  /*  NOTE: Upon initial click (onchange), toggle button acquires the current this.state.value
   *  that is set, and then changes after the next several clicks (onchange).
   *  Basically, if this.state.value : false, then state:false is state:true and vice versa.
   */
  toggleBolinao = () => {
    this.setState({bolinao : !this.state.bolinao});
    if(this.state.bolinao === false){
      console.log("Bolinao:" + this.state.bolinao);
      this.setState({goDownload: true});
    }
    else{
      console.log("Bolinao:" + this.state.bolinao);
    }
  }
  toggleManilaBay = () => {
    this.setState({manilaBay: !this.state.manilaBay});
    if(this.state.manilaBay === false){
      console.log("Manila Bay:" + this.state.manilaBay);
      this.setState({goDownload: true});
    }
    else{
      console.log("Manila Bay:" + this.state.manilaBay);
    }
  }
  toggleRoxas = () => {
    this.setState({roxas: !this.state.roxas});
    if(this.state.roxas === false){
      console.log("Roxas:" + this.state.roxas);
      this.setState({goDownload: true});
    }
    else{
      console.log("Roxas:" + this.state.roxas);
    }
  }
  toggleSamarLeyte = () => {
    this.setState({samarLeyte: !this.state.samarLeyte});
    if(this.state.samarLeyte === false){
      console.log("Samar-Leyte:" + this.state.samarLeyte);
      this.setState({goDownload: true});
    }
    else{
      console.log("Samar-Leyte:" + this.state.samarLeyte);
    }
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
        bolinao     : true,
        manilaBay   : true,
        roxas       : true,
        samarLeyte  : true,
        temp        : true,
        salinity    : true,
        turbidity   : true,
        ph          : true,
        do          : true,
        chl_a       : true,
        toxicity    : true,
        speciesList : true,
        pmr         : true,
        goDownload  : true
      }
    );
  }

  handleAllUncheck(){
    this.setState(
      {
        bolinao     : false,
        manilaBay   : false,
        roxas       : false,
        samarLeyte  : false,
        temp        : false,
        salinity    : false,
        turbidity   : false,
        ph          : false,
        do          : false,
        chl_a       : false,
        toxicity    : false,
        speciesList : false,
        pmr         : false,
        goDownload  : false
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

  async downloadFile(){
    let obj = [];
    if(this.state.bolinao === false){
      obj = this.state.exportData.find(station_name => station_name === 10);
      console.log(obj);
    }
  }

  render(){
    const goDownload = this.state.goDownload;
    const {exportData} = this.state;
    /*var csv = [];
    if(exportData !== ''){
      csv = Papa.unparse(exportData);
    }*/
    console.log({exportData});
    console.log(exportData);

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
                <Form.Checkbox
                  label="Bolinao, Pangasinan"
                  name="example-radios"
                  value="bolinao"
                  checked={this.state.bolinao}
                  onChange={this.toggleBolinao}
                />
                <Form.Checkbox
                  label="Manila Bay"
                  name="example-radios"
                  value="manila_bay"
                  checked={this.state.manilaBay}
                  onChange={this.toggleManilaBay}
                />
                <Form.Checkbox
                  label="Roxas, Capiz"
                  name="example-radios"
                  value="roxas"
                  checked={this.state.roxas}
                  onChange={this.toggleRoxas}
                />
                <Form.Checkbox
                  label="Samar - Leyte"
                  name="example-radios"
                  value="samar_leyte"
                  checked={this.state.samarLeyte}
                  onChange={this.toggleSamarLeyte}
                />
              </Form.Group>
              <Form.Group label="Sensor Data">
                <Form.Checkbox
                  label="Temperature"
                  name="example-radios"
                  value="temp"
                  checked={this.state.temp}
                  onChange={this.toggleTemp}
                />
                <Form.Checkbox
                  label="Salinity"
                  name="example-radios"
                  value="salinity"
                  checked={this.state.salinity}
                  onChange={this.toggleSalinity}
                />
                <Form.Checkbox
                  label="Turbidity"
                  name="example-radios"
                  value="turbidity"
                  checked={this.state.turbidity}
                  onChange={this.toggleTurbidity}
                />
                <Form.Checkbox
                  label="pH"
                  name="example-radios"
                  value="ph"
                  checked={this.state.ph}
                  onChange={this.togglePH}
                />
                <Form.Checkbox
                  label="Dissolved Oxygen"
                  name="example-radios"
                  value="do"
                  checked={this.state.do}
                  onChange={this.toggleDO}
                />
                <Form.Checkbox
                  label="Chlorophyll-A"
                  name="example-radios"
                  value="chl_a"
                  checked={this.state.chl_a}
                  onChange={this.toggleChlA}
                />
              </Form.Group>
              <Form.Group label="Biological Data">
                <Form.Checkbox
                  label="Toxicity"
                  name="example-radios"
                  value="toxicity"
                  checked={this.state.toxicity}
                  onChange={this.toggleToxicity}
                />
                <Form.Checkbox
                  label="Species List"
                  name="example-radios"
                  value="species_list"
                  checked={this.state.speciesList}
                  onChange={this.toggleSpeciesList}
                />
                <Form.Checkbox
                  label="Predictive Model Results"
                  name="example-radios"
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
                  <CsvDownloader datas={exportData} filename="habdata">
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
