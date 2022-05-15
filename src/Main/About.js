import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class About extends React.Component {

    render() {
        return (

            <Container>
                <br></br><br></br>

                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <p>About</p>
                    </Col>
                </Row>

            </Container>

        )
    }

}
export default About