import React, { Component } from 'react';
import SensorDataGraph from './sensordatagraph';

import { Page, Card, Button, Form, Container } from "tabler-react";
import SiteWrapper from "../SiteWrapper.react";

export default class Timeseries extends Component {
	render() {
	  return (
	  	<SiteWrapper>
			<Page.Content>
		        <Card>
		          <Card.Header>
		            <Card.Title>Graph of Site: </Card.Title>
		            <Card.Options>
		              <Form>
		                <Form.InputGroup>
		                  <Form.Input
		                    className="form-control-sm"
		                    placeholder="Search something..."
		                    name="s"
		                  />
		                  <span className="input-group-btn ml-2">
		                    <Button
		                      size="sm"
		                      color="default"
		                      type="submit"
		                      icon="search"
		                    />
		                  </span>
		                </Form.InputGroup>
		              </Form>
		            </Card.Options>
		          </Card.Header>
		          <Card.Body>
		          <Container>
								<SensorDataGraph />
							</Container>
						  </Card.Body>
		        </Card>
			</Page.Content>
	  	</SiteWrapper>

	  );
	}
}