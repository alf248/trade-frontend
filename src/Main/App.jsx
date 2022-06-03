import './App.css'
import React from 'react'
import Header from "../Bars/Header"
//import Footer from "../Bars/Footer"
import TopNav from "../Bars/TopNav"
import { Outlet } from "react-router-dom"



function App(props) {
	
	const {logout, refresh, cartSize, username} = props
	
	return (

		<div className="App">

			<Header refresh={refresh} cartSize={cartSize}/>

			<TopNav logout={logout} username={username}/>

			<br/><br/>

			<Outlet/>

			{/* <Footer/> */}
			
		</div>

	)
}
export default App