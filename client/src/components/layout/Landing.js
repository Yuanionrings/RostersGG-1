import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Landing extends Component {
    componentDidMount(){
      // This will check to see if JWT is found in cookies
      // sent to dashboard if so.
      
      if (localStorage.jwtToken) {
        window.location.href = "./dashboard";
      }
    }
    render() {
        return (
            <div className="landing-page-display">
                <Container fluid className="full-width-ctnr">

                  <Row className="row-padding-lg purple-bg-1">
                    <Col sm={8} xs={12}>
                      <div className="text-field">
                        <h1>Welcome to RostersGG (BETA)!</h1>
                        <h3>
                          The *future* most powerful, useful tool for eSports team management. Loved 
                          by team owners, captains, and players alike!
                        </h3>
                      </div>
                    </Col>
                    <Col sm={4} xs={6}>
                      <p>This is where the picture will go! Consider yourself lucky if you see this text!</p>
                    </Col>
                  </Row>

                  <Row className="row-padding-lg white-bg-1">
                    <Col sm={4} xs={6}> 
                      <div className="text-field-content">
                        <h3>
                          WHY USE THIS TOOL?
                        </h3>
                      </div>
                    </Col>
                    <Col sm={8} xs={12}>
                      <div className="text-field-content">
                        <h4>
                          Let's be real - managing an eSports team is not as easy as it looks. Communicating with your players, coordinating matches against other teams, and tracking team rosters are no longer a headache with RostersGG!
                        </h4>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="present-box-yellow flexbox justify-content-center">
                      <div className="text-field-sm">
                        <h3>Roster Management</h3>
                        <p>
                          Seamlessly invite, retain, and remove players from your team. Keep track 
                          of the team's calendar and upcoming events!
                        </p>
                      </div>
                    </Col>
                    <Col className="present-box-blue flexbox justify-content-center">
                      <div className="text-field-sm">
                        <h3>Event Scheduling</h3>
                        <p>
                          Schedule practice sessions with your teams and scrimmages with other teams in 
                          a pinch. View upcoming events on your dashboard in chronological order so you 
                          don't miss another damn scrim!
                        </p>
                      </div>
                    </Col>
                    <Col className="present-box-green flexbox justify-content-center">
                      <div className="text-field-sm">
                        <h3>Team Communication</h3>
                        <p>
                          Easily send mass messages to team members so they never miss a practice or an event, or even 
                          configure automated messages with the RostersGG Discord Bot!
                        </p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="row-padding-lg purple-bg-2">
                    <Col sm={4} xs={6}>
                      <p>This is where ANOTHER picture will go! [Lk] is my favorite Mordhau team.</p>
                    </Col>
                    <Col sm={8} xs={12}>
                      <div className="text-field">
                        <h1>Another header!</h1>
                        <h3>
                          This is some fill-in for another sub section or part of feature!
                        </h3>
                      </div>
                    </Col>
                  </Row>

                </Container>
            </div>
        );
    }
}

export default Landing;
