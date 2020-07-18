import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function Footer(){
    return (
        <footer className="mt-5">
            <Container fluid={true} className="footer-spec">
                <Row className="border-top justify-content-between p-4">
                    <Col className="p-0 d-flex justify-content-center footer-text">
                        Copyright © Owen Moreau 2020
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;