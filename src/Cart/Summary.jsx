import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import { countTotalPrice } from './Cart'
import { useNavigate } from 'react-router-dom'
import Globe from '.././Main/Globe.js'
import firebase from 'firebase/compat/app'



function Summary(props) {

    const {cart, goPay, payFast} = props

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

    const emptyCart = (cart.length < 1) ? true : false

    return (

        <Container>
        
        <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
            
            <Card>
            <Card.Header className="color-secondary" as="h6"><i className="bi bi-cart"></i> Summary</Card.Header>
            <Card.Body>

                <Row>

                    <Col sm={7} className="d-flex">
                        <PayButton emptyCart={emptyCart} handlePayClick={handlePayClick} navigateToLogin={navigateToLogin} />
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



function PayButton(props) {

    const {emptyCart, handlePayClick, navigateToLogin} = props

    if (emptyCart) {
        return null
    }

	const user = firebase.auth().currentUser

    if (user) {
        return (
            <Button type="button" onClick={handlePayClick} variant="primary">Go Pay</Button>
        )
    }
    else {
        return (
            <>
            <Button disabled type="button" onClick={handlePayClick} variant="secondary">Go Pay</Button>
            {' '}<Button onClick={navigateToLogin} variant="link">You must Sign in first</Button>
            </>
        )
    }
}