import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom"
import LoginBar from './LoginBar'
import Globe from './../javascript/Globe.js'



class TopNavbar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		const username = this.props.username

		const textStyle = {color: "white"}

		return (
			<>
			<Navbar expand="md" className="py-1" style={{backgroundColor: "#4D77FF"}}> {/* bg="primary" */}
			<Container fluid>

				{/* 
				<Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
				*/}

				<Navbar.Toggle/>
				<Navbar.Collapse>

					<Nav className="me-auto my-2 my-lg-0">

						<Nav.Link className="navbar-link" as={Link} to="offers" style={textStyle}>Offers</Nav.Link>
						
						<Nav.Link className="navbar-link" as={Link} to="/offers/new" style={textStyle}>Sell</Nav.Link>
						
						{/*
						<Nav.Link href="#" disabled>
						Link
						</Nav.Link>
						*/}
					
					</Nav>

					<Nav className="ml-auto">
						{this.props.username !== ""?
							<Nav.Link className="navbar-link" as={Link} to={"/users/"+username+"/orders/"} style={textStyle}>Your Orders</Nav.Link>
						:
							<Nav.Link href="#" disabled>Your Offers</Nav.Link>
						}
					</Nav>
					
					<LoginBar username={this.props.username} logout={this.props.logout} />

				</Navbar.Collapse>

			</Container>

			
			</Navbar>
			<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
			<div style={{position: "relative", top: "0px", height: "0px", fontSize: "80%", color: "grey"}}>
				Made by {Globe.author} at github: <a href={Globe.authorGit}>{Globe.authorGit}</a>
			</div>
			</div>
			</>
		)
	}
}
export default TopNavbar