import './App.css'
import React from 'react'
import Header from "../Bars/Header"
import Footer from "../Bars/Footer"
import TopNavbar from "../Bars/TopNavbar"
import Button from 'react-bootstrap/Button'
import { Outlet } from "react-router-dom"



class App extends React.Component {
	constructor(props) {
		super(props)
		this.refresh = this.refresh.bind(this)
	}

	refresh() {
		this.props.refresh()
	}

	render() {
		return (

			<div className="App">
	
				<Header refresh={this.refresh} cartSize={this.props.cartSize}/>
	
				<TopNavbar logout={this.props.logout} username={this.props.username}/>
	
				<Outlet/>

				{/* <Footer/> */}
				
			</div>
	
		)
	}
}
export default App



class Cookies extends React.Component {
	constructor(props) {
		super(props)
		this.state = {acceptCookies:false}
	}

	render() {

		const cookie = {
			position:"fixed",
			bottom: "10px",
			right: "10px",
			width: '16rem',
			backgroundColor: "lightgrey",
			padding: '5px',
		}

		return (
			<>
				<div style={cookie}>
				<Button variant="primary" name="cancel"  onClick={this.handleClick}>ACCEPT COOKIES</Button>{' '}
				<p>This website uses cookies</p>
				</div>
			</>
		)
	}
}