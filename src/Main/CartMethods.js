


class CartMethods {
    constructor(caller) {
        this.caller = caller
        this.addToCart = this.addToCart.bind(this)
    }

	resetCart() {
		console.log("reset cart")
		this.caller.setState({cart: []}, ()=>{
			sessionStorage.removeItem('cart')
		})
	}

	removeFromCart(id) {
		let cart = this.caller.state.cart
		for (let i = 0; i < cart.length; i++) {
			const o = cart[i]
			if (o.id === id) {
				cart.splice(i, 1)
				this.caller.setState({cart: cart}, () => {
					sessionStorage.setItem('cart', JSON.stringify(cart))
				})
				break
			}
		}
	}

	addToCart(offer) {
        if (offer === null) return
        const caller = this.caller
		if (!this.inCart(offer.id)) {
			let cart = caller.state.cart
			cart.push(offer)
			caller.setState({cart: cart}, ()=>{
				sessionStorage.setItem('cart', JSON.stringify(cart))
			})
			
		} else {
			console.warn("This offer is already in cart:", offer.name, offer.id)
		}
	}

	inCart(id) {
		for (const o of this.caller.state.cart) { 
			if (o.id === id) return true
		}
		return false
	}

}
export default CartMethods