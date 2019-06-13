import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Station from "./components/site_monitoring_viewer/index";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Station} />
    </Router>
    );
  }
}

export default App;
