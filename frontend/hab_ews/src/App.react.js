import * as React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
  Empty,
  Email,
  ProfilePage,
} from "./pages";

import HomePage from "./HomePage.react";
import FormElementsPage from "./FormElementsPage.react";
import PricingCardsPage from "./interface/PricingCardsPage.react";
import CardsDesignPage from "./interface/CardsDesignPage.react";
import StoreCardsPage from "./components/StoreCardsPage.react.js";
import IconPage from "./components/IconPage.react.js";
import ChartsPage from "./interface/ChartsPage.react";
import SiteMonitoringPage from "./SiteMonitoringPage.react";
import MapCardsPage from "./components/MapCardsPage.react";
import BlogPage from "./components/BlogPage.react";

import "tabler-react/dist/Tabler.css";

import VideoOverlayExample from "./leaflet/examples/video-overlay";
import VectorLayersExample from "./leaflet/examples/vector-layers";
import TooltipExample from "./leaflet/examples/tooltip";
import PaneExample from "./leaflet/examples/pane";
import OtherLayersExample from "./leaflet/examples/other-layers";
import LayersControlExample from "./leaflet/examples/layers-control";



type Props = {||};

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/video-overlay" component={VideoOverlayExample} />
          <Route exact path="/vector-layers" component={VectorLayersExample} />
          <Route exact path="/tooltip" component={TooltipExample} />
          <Route exact path="/pane" component={PaneExample} />
          <Route exact path="/other-layers" component={OtherLayersExample} />
          <Route exact path="/layerscontrol" component={LayersControlExample} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/cards" component={CardsDesignPage} />
          <Route exact path="/charts" component={ChartsPage} />
          <Route exact path="/email" component={Email} />
          <Route exact path="/empty-page" component={Empty} />
          <Route exact path="/form-elements" component={FormElementsPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/site-monitoring" component={SiteMonitoringPage} />
          <Route exact path="/icons" component={IconPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/maps" component={MapCardsPage} />
          <Route exact path="/pricing-cards" component={PricingCardsPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/store" component={StoreCardsPage} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
