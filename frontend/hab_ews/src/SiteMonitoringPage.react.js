// @flow

import * as React from "react";

import { 
  Page, 
  Grid,
  Container, 
  GalleryCard, 
  Form, 
  Text,
  StatsCard,

} from "tabler-react";

import SiteWrapper from "./SiteWrapper.react";

import json from "./data/Gallery.Items";
// TODO:Add GalleryCardList component to avoid insert extra className
// TODO:Update Page.Header to additional components

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
        <Text size="sm" muted>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Dolor morbi non arcu risus quis varius quam. Nunc congue nisi vitae suscipit tellus mauris. Tincidunt id aliquet risus feugiat in.
        </Text>
        <Container>
          <Grid.Row>
            <Grid.Col lg={8} md={6}>
            <StatsCard layout={1} movement={50} total="X" label="Leaflet Map Here" />
            </Grid.Col>
            <Grid.Col lg={4} md={2}>
            <StatsCard layout={1} movement={50} total="X" label="Download Section Here" />
            </Grid.Col>
          </Grid.Row>
        </Container>
      </Page.Content>
    </SiteWrapper>
  );
}

export default SiteMonitoringPage;
