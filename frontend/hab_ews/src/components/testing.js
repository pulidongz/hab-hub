import React, {Component} from 'react';

export default class TimeTesting extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  data : [],
		  name : props.name,
		  stationName : props.stationName,
		  showTimeseries : props.showTimeseries
   		}
		console.log(this.props);
		console.log(this.props.name, this.props.stationName, this.props.showTimeseries);
		console.log(this.state.name, this.state.stationName, this.state.showTimeseries);
	}

	render(){
		return (
			<table>
				<tbody>
					<tr>
						<td>STATE</td>
	          <td>{this.state.name}</td>
	          <td>{this.state.stationName}</td>
	          <td>{this.state.showTimeseries}</td>  
	        </tr>
	       {/* <tr>
						<td>PROPS</td>
	          <td>{props.name}</td>
	          <td>{props.stationName}</td>
	          <td>{props.showTimeseries}</td>  
	        </tr>*/}
				</tbody>
			</table>
		);
	}
}