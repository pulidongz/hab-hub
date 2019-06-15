// @flow

import * as React from "react";
import Leaflet from 'leaflet';

import SimpleExample from "./leaflet/simple";

import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
  Form,
} from "tabler-react";

import C3Chart from "react-c3js";

import SiteWrapper from "./SiteWrapper.react";

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

function Home() {
  return (
    <SiteWrapper>
      <Page.Content title="Welcome to the HAB Portal Website">
        <Grid.Row>
            <Grid.Col lg={6}>
              <Grid.Row>
                <Form.Group>
                  <Form.StaticText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Dolor morbi non arcu risus quis varius quam. Nunc congue nisi vitae suscipit tellus mauris. Tincidunt id aliquet risus feugiat in.
                  </Form.StaticText>
                </Form.Group>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col lg={6}>
                  <Card
                    statusColor="green"
                    title="View and Download Data From Monitoring Sites"
                    body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur
                      perferendis sed suscipit velit vitae voluptatem. A consequuntur,
                      deserunt eaque error nulla temporibus!`}
                  />
                </Grid.Col>
                <Grid.Col lg={6}>
                  <Card
                    statusColor="green"
                    title="View Official HAB Event Advisory"
                    body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur
                      perferendis sed suscipit velit vitae voluptatem. A consequuntur,
                      deserunt eaque error nulla temporibus!`}
                  />
                </Grid.Col>
                <Grid.Col lg={6}>
                  <Card
                    statusColor="green"
                    title="Contribute Monitoring Data and Report HAB Incidences"
                    body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur
                      perferendis sed suscipit velit vitae voluptatem. A consequuntur,
                      deserunt eaque error nulla temporibus!`}
                  />
                </Grid.Col>
                <Grid.Col lg={6}>
                  <Card
                    statusColor="green"
                    title="Know More About HABs and The Project"
                    body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur
                      perferendis sed suscipit velit vitae voluptatem. A consequuntur,
                      deserunt eaque error nulla temporibus!`}
                  />
                </Grid.Col>
              </Grid.Row>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Grid.Row className="align-items-right">
                <Alert type="info" icon="radio">
                  <strong>HAB Advisory</strong>
                </Alert>
                <Alert type="success" icon="check">
                  <strong>No HAB Warning for today.</strong> All sites are safe.
                </Alert>
              </Grid.Row>
              <Grid.Row>
                <SimpleExample>
                </SimpleExample>
              </Grid.Row>
            </Grid.Col> 
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default Home;
