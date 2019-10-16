import React, {Component} from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';


class SensorDataGraph extends Component {
	
	constructor(){
		super();
		this.state = {
		  data : []
   		}
	}

	async componentDidMount(){
		let res = await axios.get('http://localhost:8000/api/sensor_do/?ordering=time&station_name=10');
		let data = res.data;
		data = data.map(el => [
			el[0] = (Number(el.unixtime) + (3600*16))*1000, /*Add 16 hours to adjust unix time to local timezone GMT+8*/
			el[1] = Number(el.do)
			]);
		this.setState({data})
	}
	
	render(){
	
		const options = {
			title: {
				text: 'My Stock Chart'
			},
			series: [{
				name: 'Dissolved Oxygen',
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
			<div>
			  <HighchartsReact
			   highcharts={Highcharts}
			   constructorType={'stockChart'}
			   options={options} />
			</div>
		);
	}
}

export default SensorDataGraph;