import React, {Component} from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

// Load Highcharts modules
require('highcharts/modules/exporting')(Highcharts)

/*  NOTE: When deploying from remote server, always set url to that
 *  of remote url so axios will get values from remote and not from localhost.
 *  Change value for localhost or development server
 */
// Localhost
//const URL = 'localhost';
// Biome Server
const URL = '10.199.20.25';

export default class Timeseries extends Component {

	constructor(props){
		super(props);
		this.state = {
		  data : [],
		  label: ''
   		}
	}

	/*shouldComponentUpdate(nextProps, nextState){
		const differentId = this.props.id !== nextProps.id;
		const differentLabel = this.state.label !== nextState.label;
		return (differentId || differentLabel);
  }
*/
  /*componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.id !== prevProps.id) {
    this.fetchData(this.props.id);
  }
}*/

	async componentDidMount(){
		let res = await axios.get('http://'+URL+':8000/api/sensor/?ordering=time', {
			params: {
				station_name: JSON.stringify(this.props.id)
			}
		});
		let data = res.data;
		if (this.props.timeseries === 'temp') {
			this.setState({label: 'Temperature'});
			data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.temp)
			]);
		} else if (this.props.timeseries === 'salinity') {
			this.setState({label: 'Salinity'});
			data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.salinity)
			]);
		} else if (this.props.timeseries === 'turbidity') {
			this.setState({label: 'Turbidity'});
			data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.turbidity)
			]);
		} else if (this.props.timeseries === 'ph') {
			this.setState({label: 'pH'});
			data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.ph)
			]);
		} else if (this.props.timeseries === 'chl_a') {
			this.setState({label: 'Chlorophyll-A'});
			data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.chl_a)
			]);
		} else {
			this.setState({label: 'Dissolved Oxygen'});
			data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.uv)
			]);
		}
		this.setState({data})
	}

	render() {
		const options = {
			title: {
				text: this.props.name
			},
			series: [{
				name: this.state.label,
				data: this.state.data,
				tooltip: {
				   valueDecimals: 2,
				}
			}],
			chart: {
		     type: 'line'
		  },
		};

	  return (
    	<HighchartsReact
		   highcharts={Highcharts}
		   constructorType={'stockChart'}
		   options={options} />
	  );
	}
}