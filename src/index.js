import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Main/App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Offers from "./Offer/Offers"
import OffersIndex from "./Offer/OffersIndex"
import Offer from "./Offer/Offer"
import OfferNew from "./OfferNew/OfferNew"
import User from "./User/User"
import Users from "./User/Users"
import UsersIndex from "./User/UsersIndex"
import Login from "./User/Login"
import About from "./Main/About"
import Cart from "./Cart/Cart"
import Frontpage from "./Main/Frontpage"
import PaySuccess from "./Cart/PaySuccess"
import Orders from "./Orders/Orders"
import { MainContext } from './MainContext.js'
import PostData from './javascript/PostData.js'
import CartMethods from './javascript/CartMethods.js'



const root = ReactDOM.createRoot(document.getElementById('root'))



class Index extends React.Component {
	constructor(props) {
		super(props)

		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.refresh = this.refresh.bind(this)

		this.post = this.post.bind(this)

        this.cartMethods = new CartMethods(this)

		this.state = { username: "", refreshCount: 0, cart: [], mainContext: { signedUser: "", Post: this.post  } }
	}

	componentDidMount() {
		const username = sessionStorage.getItem('user')
		const cart = sessionStorage.getItem('cart')
		if (username !== null) this.#setUser(username)
		if (!(cart === null || cart === 'undefined')) {
			this.setState({ cart: JSON.parse(cart) })
		}
	}

	post(urlpath) {
		return new PostData(urlpath, this.logout)
	}

	// refresh state to create an update
	refresh() {
		this.setState({refreshCount: this.state.refreshCount})
	}

	login(user) {
		console.log("LOGIN", user.name)
		sessionStorage.setItem('user', user.name)
		sessionStorage.setItem('email', user.email)
		sessionStorage.setItem('token', user.token)
		this.#setUser(user.name)
	}

	logout() {
		console.log("LOGOUT")
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('email')
		sessionStorage.removeItem('token')
		this.#setUser("")
	}

	#setUser(username) {
		this.setState( { username: username, mainContext: { signedUser: username, Post: this.post } } )
	}

	render() {
		const username = this.state.username
		const cartSize = this.state.cart.length

		return(

			<BrowserRouter>
			<React.StrictMode>
			<MainContext.Provider value={ this.state.mainContext }>

			<Routes>

				<Route path="/" element={
						<App
							refresh={this.refresh} x={this.state.refreshCount} logout={this.logout} username={username}
							cartSize={cartSize}
						/>
						} >
				
					<Route index element={<Frontpage />} />
			
					<Route path="users" element={<Users />} >
						<Route index element={<UsersIndex />} />
						<Route path=":username" element={<User />} />
						<Route path=":username/orders" element={<Orders />} />
					</Route>
			
					<Route path="offers" element={<Offers />} >
						<Route index element={<OffersIndex />} />
						<Route path=":id" element={<Offer cartMethods={this.cartMethods} />} />
						<Route path="new" element={<OfferNew />} />
					</Route>
			
					<Route path="login" element={<Login login={this.login} />} />

					<Route path="cart" element={<Cart cart={this.state.cart} cartMethods={this.cartMethods} />} />

					<Route path="success" element={<PaySuccess username={username} />} />
					<Route path="about" element={<About username={username} />} />
			
				</Route>
			
				{/* 404 */}
				<Route
					path="*"
					element={
					<main style={{ padding: "1rem" }}>
						<p>404 - Nothing here</p>
					</main>
					}
				/>
		
			</Routes>
		
			</MainContext.Provider>
			</React.StrictMode>
			</BrowserRouter>

		)
	}
}

root.render( <Index/> )


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()