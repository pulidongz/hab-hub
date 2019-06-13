import React from "react";
import axios from "axios";

export default class Station extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      station: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/station/")
      .then(res => {
        const station = res.data;
        this.setState({ station });
      })
  }

  render() {
    return (
      <ul>
        { this.state.station.map(station => <li>{station.station_name} {station.longitude} {station.latitude} {station.station_depth} </li>)}
      </ul>
    )
  }

}