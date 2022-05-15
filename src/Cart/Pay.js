import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'
import PayForm from './PayForm'
import { countTotalPrice } from './Cart'



function Pay(props) {

    const {cart, cartMethods, returnToSummary} = props

    const handleReturn = (e) => {
        e.preventDefault()
        returnToSummary()
    }

    const price = countTotalPrice(cart)

    return(
        <Container>
        <br/><br/>
        <Row className="justify-content-md-center">
        <Col md={6}>
                
            <Card style={{borderRadius: "2px"}}>
            <Card.Header className="color-secondary" as="h6"><i class="bi bi-cash-coin"></i> Payment</Card.Header>
            <Card.Body style={{backgroundColor: "#fafafa"}}>

                <PayForm cart={cart} cartMethods={cartMethods} price={price} />

            </Card.Body>

            <Card.Body>
                <Card.Link href="#" onClick={handleReturn}>Return to summary</Card.Link>
            </Card.Body>

            </Card>

        </Col>
        </Row>
        </Container>
    )

}
export default Pay