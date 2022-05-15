import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import { countTotalPrice } from './Cart'
import { useNavigate } from 'react-router-dom'
import Globe from '.././javascript/Globe.js'



function Summary(props) {

    const {cart, signedUser, goPay, payFast} = props

    const navigate = useNavigate()
    const devMode = Globe.devMode

    const navigateToLogin = () => {
        navigate("/login", { state: "/cart" })
    }

    const handlePayClick = (e) => {
        e.preventDefault()
        goPay()
    }

    const handlePayFastClick = (e) => {
        e.preventDefault()
        payFast()
    }

    const totalPrice = countTotalPrice(cart)
    const isSignedIn = signedUser === "" ? false : true
    const payDisabled = (cart.length < 1) || (!isSignedIn)

    return (

        <Container>
        
        <br/><br/>

        <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
            
            <Card style={{borderRadius: "2px"}}>
            <Card.Header className="color-secondary" as="h6"><i className="bi bi-cart"></i> Summary</Card.Header>
            <Card.Body>

                <Row>
                    <Col sm={7} className="d-flex">
                        <Button disabled={payDisabled} className="my-auto squareButton" type="button" onClick={handlePayClick} variant="primary">Go Pay</Button>
                        {isSignedIn ? null :
                            <>
                                {' '}<Button onClick={navigateToLogin} variant="link">Please LOGIN first</Button>
                            </>
                        }
                    </Col>

                    <Col sm={5} className="d-flex flex-row-reverse">
                        <div className="my-auto">Total&nbsp;&nbsp;<span className="price">{totalPrice} €</span></div>
                    </Col>
                </Row>
                
            </Card.Body>
            </Card>

            {devMode? <>&nbsp;<a href="#" onClick={handlePayFastClick}>Test: Pay fast</a></> : null }
            
        </Col>
        </Row>

        <br/><br/>

        <Row className="justify-content-md-center">
        <Col md={6}>
            {props.children}
        </Col>
        </Row>

        </Container>
    )
    
}
export default Summary