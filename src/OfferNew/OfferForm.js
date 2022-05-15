import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Globe from '../javascript/Globe'
import { Formik } from 'formik'
import * as yup from 'yup'
import { InputGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { MainContext } from '../MainContext.js'
import { useContext } from 'react'



const OfferForm=(props)=> {

    const context = useContext(MainContext)
    const navigate = useNavigate()
    const formRef = useRef(null)

    const navigateToLogin = () => {
        // save the form globabally, so that when you return from login, it can be restored
        Globe["makeform"] = formRef.current.values
        navigate("/login", { state: "/offers/new" })
    }

    const navigateToOffer = (offerId) => {
        navigate("/offers/"+offerId, { })
    }
   
    const submitForm = (values) => {

        const token = sessionStorage.getItem('token')
    
        if (token === null || token === "") {
            console.log("SUBMIT FORM: NO TOKEN FOUND")
            return
        }
    
        values["price"] = parseFloat(values["price"])
    
        context.Post("/offers/new")
        .Body(values)
        .Success((result)=>{
            navigateToOffer(result)
        })
        .Fail((status, message)=>{
            if (status === null) {
                alert("Error: can not connect to server")
            } else {
                
            }
        })
        .CallAuth()
    }
    
    return (
        <>

        <Card>
            <Card.Header className="color-secondary"><h5 style={{marginBottom:"0px"}}>New Offer</h5></Card.Header>
            <Card.Body >

                <OfferFormFormik navigateToLogin={navigateToLogin} innerRef={formRef} submitForm={submitForm} signedUser={context.signedUser} />

            </Card.Body>
        </Card>

        </>
    )

}
export default OfferForm



const schema = yup.object().shape({
    name: yup.string().min(3).max(20).required(),
    description: yup.string().max(200),
    price: yup.number().min(0, "must be a positive number").max(99999999999999999999999999999999999999999),
})



function OfferFormFormik(props) {

    let initialValues
    if (Globe.makeform) initialValues = Globe.makeform
    else initialValues = {
        name: '',
        description: '',
        price: "0.0",
        way: 'give',
        currency: 'Euro',
    }

    return (
        <Formik
        innerRef={props.innerRef}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values) => {
            props.submitForm(values)
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

            <Row>
                <Col>

                <Form.Check
                    inline
                    label="Selling"
                    name="way"
                    value="give"
                    type="radio"
                    id="PChoiceGive"
                    checked={values.way === "give" ? true:false}
                    onChange={handleChange}
                />
                <Form.Check
                    inline
                    label="Buying"
                    name="way"
                    value="receive"
                    type="radio"
                    id="PChoiceReceive"
                    checked={values.way === "receive" ? true:false}
                    onChange={handleChange}
                />

                </Col>
            </Row>


            <Row className="mb-3">

                <Form.Group as={Col} xs="6" controlId="validationFormik01" >

                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && !!errors.name}
                    />
                    
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                            {errors.name}
                    </Form.Control.Feedback>

                </Form.Group>

            </Row>


            <Row>

            <Form.Group as={Col} xs="12" controlId="validationFormik02">

                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    as="textarea"
                    value={values.description}
                    onChange={handleChange}
                    isValid={touched.description && !errors.description}
                    isInvalid={!!errors.description}
                />

                <Form.Control.Feedback type="invalid">
                        {errors.description}
                </Form.Control.Feedback>

            </Form.Group>

            </Row>

            <br></br>

            <Row style={{backgroundColor: 'white'}}>


                <Form.Group as={Col} controlId="validationFormikUsername">

                    <InputGroup hasValidation>

                        <InputGroup.Text id="inputGroupPrepend">Price</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="0.0"
                            aria-describedby="inputGroupPrepend"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            isInvalid={!!errors.price}
                            isValid={touched.price && !errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>

                    </InputGroup>


                </Form.Group>


                <Form.Group as={Col}  controlId="selection">

                    <Form.Select aria-label="Currency"
                        name="currency"
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                            <option value="Euro">Euro</option>
                            <option value="Dollars">Dollars</option>
                    </Form.Select>

                </Form.Group>


            </Row>


            <br></br>


            {props.signedUser === "" ?
                <>
                <Button type="submit" disabled variant="secondary">Create</Button>
                {' '}<Button onClick={props.navigateToLogin} variant="link">Please LOGIN first</Button>
                </>
            :
                <>


                <Button type="submit">Create</Button>
                </>
            }

            </Form>
        )}
        </Formik>
    )
}