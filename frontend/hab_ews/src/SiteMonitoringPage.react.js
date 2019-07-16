// @flow

import * as React from "react";
import Leaflet from 'leaflet';

import MapMonitoring from "./leaflet/map_monitoring";

import { 
  Page, 
  Grid,
  Container, 
  Form,
  Card,
  Button,

} from "tabler-react";

import SiteWrapper from "./SiteWrapper.react";

import json from "./data/Gallery.Items";
// TODO:Add GalleryCardList component to avoid insert extra className
// TODO:Update Page.Header to additional components

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

function SiteMonitoringPage(): React.Node {
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
            <MapMonitoring>
            </MapMonitoring>
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
                value="1"
              />
              <Form.Checkbox
                label="Manila Bay"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Monitoring Site 3"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Monitoring Site 4"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Monitoring Site 5"
                name="example-radios"
                value="1"
              />
            </Form.Group>
            <Form.Group label="Sensor Data">
              <Form.Checkbox
                label="Temperature"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Salinity"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="pH"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Dissolved Oxygen"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Chlorophyll-a"
                name="example-radios"
                value="1"
              />
            </Form.Group>
            <Form.Group label="Biological Data">
              <Form.Checkbox
                label="Toxicity"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Species List"
                name="example-radios"
                value="1"
              />
              <Form.Checkbox
                label="Predictive Model Results"
                name="example-radios"
                value="1"
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Form.Group label="Download to">
              <Form.FileInput />
            </Form.Group>
            <Button pill color="primary" icon="download">
              Download
            </Button>
          </Card.Footer>
        </Card>
        </Grid.Col>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default SiteMonitoringPage;
