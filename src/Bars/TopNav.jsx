import React from 'react'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Link } from "react-router-dom"
import firebase from 'firebase/compat/app'



export default TopNav
function TopNav(props) {

	const {logout} = props

	const user = firebase.auth().currentUser

	return (
		<>
		
		<ul className="nav justify-content-end">
			<LoginOrLogout user={user} logout={logout} />
		</ul>


		<ul className="nav justify-content-center">
			<li className="nav-item">
				<Link className="nav-link" to="/offers">All Offers</Link>
			</li>
			<li className="nav-item">
				<NewOfferLink user={user} />
			</li>
			<li className="nav-item">
				<OrdersLink user={user} />
			</li>
		</ul>


		</>
	)
}



function NewOfferLink(props) {

	const {user} = props

	if (user) {
		return (
			<Link className="nav-link" to="/offers/new">New Offer</Link>
		)
	}
	else {
		return (
			<OverlayTrigger
			placement="bottom"
			overlay={ <Tooltip style={{cursor: "default"}}>You must Sign in first</Tooltip> }
			>
			<a className="nav-link" disabled style={{color: "grey", cursor: "default"}}>New Offer</a>
			</OverlayTrigger>
		)
	}
}



function OrdersLink(props) {

	const {user} = props

	if (user) {
		return (
			<Link className="nav-link" to="/orders">Orders</Link>
		)
	}
	else {
		return (
			<OverlayTrigger
			placement="bottom"
			overlay={ <Tooltip style={{cursor: "default"}}>You must Sign in first</Tooltip> }
			>
			<a className="nav-link" disabled style={{color: "grey", cursor: "default"}}>Orders</a>
			</OverlayTrigger>
		)
	}
}



function LoginOrLogout(props) {
		
	const {user, logout} = props

	const style = {backgroundColor: "#f1f1f1"}
	
	if (user) {
		// logged in
		return (
			<>
				<li className="nav-item" style={style}>
					<Link className="nav-link active" to={"users/"+user.uid}>Hello, {user.email}</Link>
				</li>
				<li className="nav-item" style={style}>
					<a className="nav-link active" href="#" onClick={logout}>Sign out</a>
				</li>
			</>
		)

	} else {
		// not logged in
		return (
			<li className="nav-item" style={style}>
				<Link className="nav-link active" to="login">Sign in</Link>
			</li>
		)
	}
}