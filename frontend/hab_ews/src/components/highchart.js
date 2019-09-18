import React, {Component} from "react";
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


class Highchart extends Component {
	
}

  	constructor(props) {
	    super(props);
		this.state = {
	      // To avoid unnecessary update keep all options in the state.
	      chartOptions: {
	        xAxis: {
	          categories: ['A', 'B', 'C'],
	        },
	        series: [
	          { data: [1, 2, 3] }
	        ],
	        plotOptions: {
	          series: {
	            point: {
	              events: {
	                mouseOver: this.setHoverData.bind(this)
	              }
	            }
	          }
	        }
	      },
	      hoverData: null,
	      apidata: []
	    };
  	}

	componentDidMount() {
	    /*NOTE:when deploying from remote server, always set url to that of remote url 
	    so axios will get values from remote and not from localhost*/
	    /*axios.get("http://10.199.20.25:8000/api/station/")*/                // for Ubuntu-001
	    axios.get("http://localhost:8000/api/sensor_do/")                       // for localhost
	      .then(res => {
	        const apidata = res.data;
	        this.setState({ apidata });
	      })
	      .catch(function (error) {
	      console.log(error);
	      })
  	}

	setHoverData = (e) => {
		// The chart is not updated because `chartOptions` has not changed.
		this.setState({ hoverData: e.target.category })
	}
 
	updateSeries = () => {
	    // The chart is updated only with new options.
	    this.setState({
	      chartOptions: {
	        series: [
	          { data: apidata }
	        ]
	      }
	    });
	}

	render(){
		return(

			<h3>Hovering over {hoverData}</h3>
			<button onClick={this.updateSeries.bind(this)}>Update Series</button>
		)
	}