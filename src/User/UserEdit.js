import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useContext } from 'react'
import { MainContext } from '../MainContext.js'



const schema = yup.object().shape({
    phone: yup.string().max(20),
})



function UserEdit(props) {

    const user = props.user

    let initialValues = {phone: ""}

    const context = useContext(MainContext)

    const editUser = (userName, values, setUser) => {

        const token = sessionStorage.getItem('token')
    
        if (token === "") return
    
        context.Post('/users/'+userName+'/edit')
        .Body(values)
        .Success((result)=>{
            setUser(result)
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
        <Formik
        innerRef={props.innerRef}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values) => {
            editUser(user.name, values, props.setUser)
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
                
                <Col xs={10}>
                
                <h5>Edit</h5>
                <hr/>

                <InputGroup>

                    <InputGroup.Text variant="outline-secondary" id="phone-group" style={{borderRadius: "2px"}}>Phone</InputGroup.Text>

                    <FormControl
                    placeholder=""
                    aria-label="Phone"
                    aria-describedby="phone-group"
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={touched.phone && !!errors.phone}
                    />

                    <Button type="submit" variant="secondary" style={{borderRadius: "2px"}}>
                    Change
                    </Button>

                    <Form.Control.Feedback type="invalid">
                            {errors.phone}
                    </Form.Control.Feedback>

                </InputGroup>

                </Col>

            </Row>

            <br/><br/><br/><br/>

            </Form>
        )}
        </Formik>
    )
}
export default UserEdit