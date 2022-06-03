import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'



function Privacy(props) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={6}>

                <Card>
                <Card.Header className="color-secondary" as="h5">About</Card.Header>
                <Card.Body>
                    <p>This is a test site</p>
                </Card.Body>
                </Card>

                </Col>
            </Row>
        </Container>
    )
}
export default Privacy