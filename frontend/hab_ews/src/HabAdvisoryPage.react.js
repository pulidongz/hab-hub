// @flow

import * as React from "react";
import Calendar from 'react-calendar';

import { 
  Page, 
  Grid,
  Container, 
  Card,

} from "tabler-react";

import SiteWrapper from "./SiteWrapper.react";

function HabAdvisoryPage(): React.Node {

  return (
    <SiteWrapper>
      <Page.Content title="Harmful Algal Bloom Advisory">
      <Grid.Row>
        <Grid.Col lg={8}>
          <Container>
            <Card>
              <Card.Header>
                <Card.Title>PDF Viewer</Card.Title>
              </Card.Header>
              <Card.Body>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti
                fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit
                velit vitae voluptatem. A consequuntur, deserunt eaque error nulla
                temporibus!
              </Card.Body>
              <Card.Footer>
                <a href="https://www.bfar.da.gov.ph/index.jsp" target="_blank">View in BFAR Website </a>
              </Card.Footer>
            </Card>
          </Container>
        </Grid.Col>
        <Grid.Col lg={4}>
        <Card>
          <Card.Header>
            <Card.Title>View Previous Advisories</Card.Title>
          </Card.Header>
          <Card.Body>
            <Calendar
            />
          </Card.Body>
          <Card.Footer>

          </Card.Footer>
        </Card>
        </Grid.Col>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default HabAdvisoryPage;
