import * as React from "react";

import { 
  Page, 
  Grid,
  Container,
  Table, 
  Card,
  Button,
  Badge,
  Icon,
  Form,
} from "tabler-react";

import SiteWrapper from "./SiteWrapper.react";

import json from "./data/Gallery.Items";
// TODO:Add GalleryCardList component to avoid insert extra className
// TODO:Update Page.Header to additional components

function DataContributionPage(): React.Node {

  return (
    <SiteWrapper>
      <Page.Content>
      <Grid.Row>
        <Grid.Col lg={12}>     
            <Card>
              <Card.Header>
                <Card.Title><strong>Submit Monitoring Data</strong></Card.Title>
              </Card.Header>
              <Card.Body>  
               <p>Upload site monitoring data as .xls files following the prescribed format<a href="/">(?)</a>.</p>  
                <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>File Number</Table.ColHeader>
                    <Table.ColHeader>File Type Selector (Sensor Data, Species Count, Toxins)</Table.ColHeader>
                    <Table.ColHeader>File Location in Folder</Table.ColHeader>
                    <Table.ColHeader>Status</Table.ColHeader>
                    <Table.ColHeader />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Col>100000</Table.Col>
                    <Table.Col>Species Count</Table.Col>
                    <Table.Col className="text-nowrap">C:\Documents\bol_species_count.xls</Table.Col>
                    <Table.Col className="w-1">
                      <Badge color="success" className="mr-1">
                        success
                      </Badge>
                    </Table.Col>
                    <Table.Col className="w-1">
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>100001</Table.Col>
                    <Table.Col>Sensor Data</Table.Col>
                    <Table.Col className="text-nowrap">C:\Documents\bol_sensor_data.xls</Table.Col>
                    <Table.Col className="w-1">
                      <Badge color="warning" className="mr-1">
                        uploading
                      </Badge>
                    </Table.Col>
                    <Table.Col className="w-1">
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                </Table.Body>
              </Table>

              </Card.Body>
              <Card.Footer>
            <div className="col text-center">
              <Button pill color="primary" icon="upload">
                Upload Files
              </Button>
            </div>
          </Card.Footer>
            </Card>
        </Grid.Col>
        <Grid.Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title><strong>Report a HAB Incident</strong></Card.Title>
          </Card.Header>
          <Card.Body>
            <p>Report a HAB-related incident(i.e. water discoloration, fish kill, poisoning occurence). To contribute
            other information <a href="/about-hab"><u>contact us here</u></a>.</p>
            <Form.Group
              isRequired
              label="Contributor"
            >
              <Form.Input name="example-text-input" />
            </Form.Group>
            <Form.Group
              isRequired
              label="Email address"
            >
              <Form.Input name="example-text-input" />
            </Form.Group>
            <Form.Group
              isRequired
              label="Location of incident"
            >
              <Form.Input name="example-text-input" />
            </Form.Group>
            <Form.Group label="Date of incident">
              <Form.DatePicker
                defaultDate={new Date("2020-01-28T05:56:26.338Z")}
                format="mm/dd/yyyy"
                maxYear={2100}
                minYear={2020}
                monthLabels={[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December'
                ]}
              />
            </Form.Group>
            <Form.Group label="Type of incident">
              <Form.Select>
                <option>
                  Water Discoloration
                </option>
                <option>
                  Fish Kill
                </option>
                <option>
                  Poisoning
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group label={<Form.Label aside="56/100">Tell us about the incident</Form.Label>}>
            <Form.Textarea
              placeholder="Content.."
              rows={6}
            />
          </Form.Group>
          <Form.Group label="Upload photos">
            <Form.FileInput />
          </Form.Group>
          </Card.Body>
          <Card.Footer>
            <div className="col text-center">
              <Button pill color="primary" icon="upload">
                Submit Report
              </Button>
            </div>
          </Card.Footer>
        </Card>
        </Grid.Col>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default DataContributionPage;
