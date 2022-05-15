import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { MainContext } from '../MainContext.js'



const schema = yup.object().shape({
    name: yup.string().label("this").required(),

    cardnumber: yup.number().label("this").typeError('must be a number').required(),
    expires: yup.string().label("this").required(),
    code: yup.number().label("this").typeError('must be a number').required(),

    address: yup.string().label("this").required(),
    country: yup.string().label("this").required(),
    zip: yup.string().label("this").required(),
})



function PayForm(props) {

    const {cart, cartMethods, price} = props

    const navigate = useNavigate()
    const context = useContext(MainContext)

    const goToPaySuccess = () => {
        navigate("/success", {})
    }

    const pay = () => {

        let orders = []
        for (let o of cart) {
            orders.push(o.id)
        }

        context.Post("/orders/new")
        .Body(orders)
        .Success((result)=>{
            cartMethods.resetCart()
            goToPaySuccess()
        })
        .Fail((status, message)=>{
            if (status === null) {
                
            } else {
                //const msg = status + ' - ' + message
            }
        })
        .CallAuth()
    }

    const initialValues = {
        name: "First Last Name",

        cardnumber: '1234 1234 1234 1234',
        expires: '11/99',
        code: '111',
        
        address: 'Somestreet 11',
        country: 'Sweden',
        zip: '90900',
    }

    return (
        <Formik
            innerRef={props.innerRef}
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={(values) => {
                pay(values)
            }}
        >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        }) => (
            <Form noValidate onSubmit={handleSubmit}>

            <Row className="mb-12">

                <Form.Group as={Col} md="12" controlId="validationFormik01" >

                    <Form.Label>Name on Credit Card</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="First Last Name"
                        disabled
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && !!errors.name}
                    />
                    
                    <Form.Control.Feedback type="invalid">
                            {errors.name}
                    </Form.Control.Feedback>

                </Form.Group>

            </Row>


            <br/>


            <Row className="mb-3">

                <Form.Group as={Col} md="6" controlId="validationFormik103" className="position-relative">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                    type="text"
                    name="cardnumber"
                    value={values.cardnumber}
                    onChange={handleChange}
                    isValid={touched.cardnumber && !errors.cardnumber}
                    isInvalid={touched.cardnumber && !!errors.cardnumber}
                    disabled
                    placeholder="1234 1234 1234 1234"
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                    {errors.cardnumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationFormik104" className="position-relative">
                    <Form.Label>Expires</Form.Label>
                    <Form.Control
                    type="text"
                    disabled
                    placeholder="11/99"
                    name="expires"
                    value={values.expires}
                    onChange={handleChange}
                    isValid={touched.expires && !errors.expires}
                    isInvalid={touched.expires && !!errors.expires}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                    {errors.expires}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationFormik105" className="position-relative">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                    type="text"
                    disabled
                    placeholder="111"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    isValid={touched.code && !errors.code}
                    isInvalid={touched.code && !!errors.code}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                    {errors.code}
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>


            <br/>


            <Row className="mb-3">

                <Form.Group as={Col} md="4" controlId="validationFormik103" className="position-relative">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Somestreet 11"
                        disabled
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        isValid={touched.address && !errors.address}
                        isInvalid={touched.address && !!errors.address}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik104"
                className="position-relative"
                >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Sweden"
                        disabled
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        isValid={touched.country && !errors.country}
                        isInvalid={touched.country && !!errors.country}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.country}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik105"
                className="position-relative"
                >
                    <Form.Label>Post Code</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        placeholder="11/99"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                        isValid={touched.zip && !errors.zip}
                        isInvalid={touched.zip && !!errors.zip}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.zip}
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>


            <br/>

            <Row>
                <Col>
                    <span className="price">{price} €</span>
                </Col>

                <Col className="d-flex flex-row-reverse">
                    <Button className="squareButton" type="submit">Pay</Button>    
                </Col>
            </Row>
            

            </Form>
        )}
        </Formik>
    )
}
export default PayForm