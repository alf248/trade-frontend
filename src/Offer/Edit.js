import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Globe from '../javascript/Globe';
import { Formik } from 'formik'
import * as yup from 'yup'
import { InputGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useRef } from "react"



const EditOffer=(props)=> {

    let navigate = useNavigate()

    const ref = useRef(null)

    return (
        
        <Row className="justify-content-md-center">
         
            <Col xs={12} >

                <Card>
                <Card.Header><h4 style={{marginBottom:"0px"}}>EDIT OFFER</h4></Card.Header>
                    <Card.Body >

                    <OfferFormFormik offer={props.offer} updateOffer={props.updateOffer} user={props.user} innerRef={ref} />

                    </Card.Body>
                </Card>

            </Col>
        
        </Row>
        
    )
}
export default EditOffer



async function submitForm(values, offer, callback) {

    const token = sessionStorage.getItem('token')

    if (token === null || token == "") {
        console.log("SUBMIT FORM: NO TOKEN FOUND")
        return
    }

    let form = {}

    let p = parseFloat(values["price"])
    let o = parseFloat(offer.price)
    if (p != o) {
        form["price"] = p
    }

    if (values["name"] != "") form["name"] = values["name"]
    if (values["description"] != "") form["description"] = values["description"]
    if (values["currency"] != "") form["currency"] = values["currency"]

    const formLength = Object.keys(form).length
    if (formLength < 1) {
        console.log("EDIT: NO CHANGES: DOING NOTHING")
        return
    }

    Globe.Post('/offers/' + offer.id + '/edit')
    .Body(form)
    .Success((result)=>{
        callback()
    })
    .Fail((status, message)=>{
        if (status === null) {
            
        } else {
            //const msg = status + ' - ' + message
        }
    })
    .CallAuth()

}



const schema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    price: yup.number().min(0, "must be a positive number"),
})



function OfferFormFormik(props) {

    let initialValues
    if (Globe.makeform) initialValues = Globe.makeform
    else initialValues = {
        name: '',
        description: '',
        price: props.offer.price,
        currency: '',
    }

    const offer = props.offer

    return (
        <Formik
            innerRef={props.innerRef}
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={(values) => {
                submitForm(values, offer, () => {
                    props.updateOffer()
                })
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
            <Form noValidate onSubmit={handleSubmit} >

            <Row className="mb-3">

                <Form.Group as={Col} xs="6" controlId="validationFormik01" >

                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder={offer.name}
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

            <Row>

                <Form.Group as={Col} xs="12" controlId="validationFormik02">

                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder={offer.description}
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

            <Row>

                <Form.Group as={Col} controlId="validationFormikUsername">

                    <InputGroup hasValidation>

                        <InputGroup.Text id="inputGroupPrepend">Price</InputGroup.Text>
                        <Form.Control
                            type="text"
                            aria-describedby="inputGroupPrepend"
                            name="price"
                            placeholder={offer.price}
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
                        placeholder={offer.currency}
                    >
                            <option value="Default">Unchanged ({offer.currency})</option>
                            <option value="Euro">Euro</option>
                            <option value="Dollars">Dollars</option>
                    </Form.Select>

                </Form.Group>

            </Row>

            <br></br>

            {props.user == "" ?
                <>
                    <Button type="submit" disabled variant="secondary">Edit</Button>
                    {' '}<Button onClick={props.gologin} variant="link">Please LOGIN first</Button>
                </>
            :
                <>
                    <Button type="submit">Edit</Button>
                </>
            }

            </Form>
        )}
        </Formik>
    )
}