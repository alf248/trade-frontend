import React from 'react'
import Globe from '../javascript/Globe'
import Summary from './Summary'
import Pay from './Pay'
import { MainContext } from '../MainContext.js'
import CartItems from './CartItems'



class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {paying: false}
        this.init = false
        this.removeItem = this.removeItem.bind(this)
        this.goPay = this.goPay.bind(this)
        this.payFast = this.payFast.bind(this)
        this.returnToSummary = this.returnToSummary.bind(this)
        this.inCart = this.inCart.bind(this)
    }

    payFast() {
        let cart = this.props.cart

        let orders = []
        for (let o of cart) {
            orders.push(o.id)
        }

        this.context.Post("/orders/new")
        .Body(orders)
        .Success((result)=>{
            console.log("PAY SUCCESS")
            this.props.cartMethods.resetCart()
        })
        .Fail((status, message)=>{
            if (status === null) {
                
            } else {
                //const msg = status + ' - ' + message
            }
        })
        .CallAuth()
    }

    goPay() {
        this.setState({paying: true})
    }

    returnToSummary() {
        this.setState({paying: false})
    }

    componentDidMount() {
        if (this.init === false) this.setState({cart: Globe.cart})
    }

    inCart(id) {
        if (id in this.state.cart) return true
        return false
    }

    removeItem(id) {
        this.props.cartMethods.removeFromCart(id)
    }

    render() {
        const cart = this.props.cart
        const cartMethods = this.state.cartMethods

        if (cart === null) return null

        if (this.state.paying === false) {
            return (
                <Summary cart={cart} goPay={this.goPay} payfast={this.payFast} signedUser={this.context.signedUser} >
                    <CartItems cart={cart} cartMethods={this.props.cartMethods} />
                </Summary>
            )
        }
        else {
            return ( <Pay cart={cart} cartMethods={this.props.cartMethods} returnToSummary={this.returnToSummary} /> )
        }
    }

}
Cart.contextType = MainContext
export default Cart



export function countTotalPrice(cart) {
    let totalPrice = 0

    for (let id in cart) {
        if (cart[id] !== null) {
            let offer = cart[id]
            let p = parseFloat(offer.price)
            if (offer.currency === "dollars" || offer.currency === "dollar") {
                p = p * 0.95
            }
            totalPrice += p
        }
    }
    return totalPrice.toFixed(2)
}