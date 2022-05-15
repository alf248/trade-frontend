import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom"
import Globe from '../javascript/Globe'



class LoginBar extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}

	logout() {
		const email = sessionStorage.getItem('email')
		const token = sessionStorage.getItem('token')

		console.log("LOGOUT ", email, token)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify( {email: email, token: token} )
		}
		fetch(Globe.server+'/logout', requestOptions)
		.then(response => {
			console.log("LOGOUT. response status", response.status)
			return response.text()
		})
		.then(data => {
			console.log("LOGOUT: got data", data)
			this.props.logout()
		} )
	}

	render() {
		const username = this.props.username

		if (username && username != "") {
			
			return (

				<Nav >
					
					<Nav.Link className="navbar-link-login" as={Link} to={"users/"+username}>
						(Logged in as {username})
					</Nav.Link>

					<Nav.Link className="navbar-link-login" onClick={this.logout}>
						Logout
					</Nav.Link>

				</Nav>

			)
		}

		return (
			<Nav>
			<Nav.Link className="navbar-link-login" as={Link} to="login">
				Login
        	</Nav.Link>
			</Nav>
		)

	}

}
export default LoginBar