import React, {Component} from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import {Page, Card, Button, Form} from 'tabler-react';
import SiteWrapper from '../SiteWrapper.react';

export default class Timeseries extends Component {

	constructor(props){
		super(props);
		this.state = {
		  data : [],
		  label: ''
   		}
	}

	async componentDidMount(){
		let res = await axios.get('http://localhost:8000/api/sensor/?ordering=time', {
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
	  	//<SiteWrapper>
			//<Page.Content>
		        <Card>
		          <Card.Header>
		            <Card.Title>Graph of Site: </Card.Title>
		            <Card.Options>
		              <Form>
		                <Form.InputGroup>
		                  <Form.Input
		                    className="form-control-sm"
		                    placeholder="Search something..."
		                    name="s"
		                  />
		                  <span className="input-group-btn ml-2">
		                    <Button
		                      size="sm"
		                      color="default"
		                      type="submit"
		                      icon="search"
		                    />
		                  </span>
		                </Form.InputGroup>
		              </Form>
		            </Card.Options>
		          </Card.Header>
		          <Card.Body>
		          	<HighchartsReact
							   highcharts={Highcharts}
							   constructorType={'stockChart'}
							   options={options} />
						  </Card.Body>
		        </Card>
			//</Page.Content>
	  	//</SiteWrapper>

	  );
	}
}