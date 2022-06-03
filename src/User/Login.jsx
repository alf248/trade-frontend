import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useNavigate, useLocation } from "react-router-dom"
import { MainContext } from '../Main/MainContext.js'
import { useState, useEffect } from 'react'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {fireApp, analytics, auth} from '../Main/Firebase.js'

var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
	callbacks: {
	  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
		// User successfully signed in.
		// Return type determines whether we continue the redirect automatically
		// or whether we leave that to developer to handle.
		return true;
	  },
	  uiShown: function() {
		// The widget is rendered.
		// Hide the loader.
		document.getElementById('loader').style.display = 'none';
	  }
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: '/',
	signInOptions: [
	    // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
	    firebase.auth.EmailAuthProvider.PROVIDER_ID,
	    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '/tos',
	// Privacy policy url.
	privacyPolicyUrl: 'privacy'
};



function Login(props) {

    const {login} = props

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

    useEffect(() => { 
        ui.start('#firebaseui-auth-container', uiConfig);

    })

    return (
        <>
            <div id="firebaseui-auth-container"></div>
			<div id="loader">Loading...</div>

            <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <br/><br/>
                    You can use this test account:
                    <br/><br/>
                    <table  className="table table-dark">
                        <tbody>
                        <tr><td><b>Email:</b></td><td>test.mail.700@proton.me</td></tr>
                        <tr><td><b>Password:</b></td><td>password</td></tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            </Container>

            {/*<LoginPage goto={afterLoginGoto} login={login} />*/}

        </>
    )
}
export default Login



function FireLogin(props) {

    const {goto, login, afterLoginGoto} = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

	const handleEmailChange = (e) => {
        setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
        setPassword(e.target.value)
	}

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)

        this.context.Post("/login")
        .Body({email: email, password: password})
        .Success((result)=>{
            login(result)
            goto()
        })
        .Fail((status, message)=>{
            if (status === null) {
                alert("can not connect to server")
            } else {
                setLoading(false)
            }
        })
        .Call()

    }


    return (
        <>
            
            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleEmailChange} value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={handlePasswordChange} value={password}/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} >
                {loading? "Loading...": "Login"}
            </Button>

            </Form>
        </>
    )
}



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
        <p>You can login with the following credentials:</p>
        <ul>
            <li>joe@example.com</li>
            <li>pass</li>
        </ul>

        <ul>
            <li>mia@example.com</li>
            <li>pass</li>
        </ul>
                
        </Col>

        <Col></Col>
        </Row>

        </Container>

        )
    }
  
}
LoginPage.contextType = MainContext