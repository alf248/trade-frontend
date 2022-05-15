import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useNavigate, useLocation } from "react-router-dom"
import { MainContext } from './../MainContext.js'



const Login=(props)=> {
    const navigate = useNavigate()
    let location = useLocation()

    // after login, go to the next page automatically
    const afterLoginGoto = () => {

        // if location state was set in a previous page, then go there
        if (location.state && location.state !== "") {
            navigate(location.state, { } )
        }
        // otherwise go to frontpage
        else {
            navigate("/", {  })
        }
    }

    return ( <LoginPage goto={afterLoginGoto} login={props.login} /> )
}
export default Login



class LoginPage extends React.Component {
    constructor(props) {
    	super(props)
		this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = { email: "joe@example.com", password: "pass", error: null, isLoading: false }
    }
    
	handleChange(e) {
		this.setState( { [e.target.name]: e.target.value } )
	}

    handleSubmit(e) {
        e.preventDefault()

        this.setState( {isLoading: true} )

        this.context.Post("/login")
        .Body({email: this.state.email, password: this.state.password})
        .Success((result)=>{
            this.props.login(result)
            this.props.goto()
        })
        .Fail((status, message)=>{
            if (status === null) {
                alert("can not connect to server")
            } else {
                this.setState({error: "not authorized", isLoading: false})
            }
        })
        .Call()

    }

    render() {
        return (
  
        <Container>

        <br></br><br></br>

        <Row>
        <Col></Col>
        <Col>

        <h5 className="card-subtitle mb-2 text-muted text-start">
        LOGIN
        </h5>
        <br></br>

        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} value={this.state.email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password}/>
        </Form.Group>

        
        <Button variant="primary" type="submit" disabled={this.state.isLoading} >
            {this.state.isLoading? "Loading...": "Login"}
        </Button>
        

        </Form>

        { this.state.error === null ? "" : <><br></br><p style={{color: "red"}}>Login failed - email or password is wrong</p></> }
        

        <br></br><br></br>
        <p>You can login with the following emails:</p>
        <ul>
            <li>joe@example.com</li>
            <li>mia@example.com</li>
        </ul>
        <p>Password is "pass"</p>

                
        </Col>

        <Col></Col>
        </Row>

        </Container>

        )
    }
  
}
LoginPage.contextType = MainContext