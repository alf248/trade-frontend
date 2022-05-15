import React from 'react'
import Button from 'react-bootstrap/Button'



class OfferCart extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddToCart = this.handleAddToCart.bind(this)    
        this.state = {inCart: false}
    }

    handleAddToCart(e) {
        e.preventDefault()
        const offer = this.props.offer

        this.props.cart.addToCart(offer)

        this.setState( {inCart: true} )
    }

    render() {

        const offer = this.props.offer
        const signedUser = this.props.signedUser

        const inCart = this.props.cart.inCart(offer.id)

        const cartStyle = {fontSize: "2rem", color: "dodgerblue"}

        if (signedUser !== "" && signedUser === offer.receiver) {
            return null
        }

        if (signedUser !== "" && signedUser === offer.giver) {
            return null
        }
        
        return (
            <>
            <span className="price">{offer.price} {offer.currency}</span>
            <br></br><br></br>
            
            {inCart ?
                <>
                <i className="bi bi-cart-check" style={cartStyle}></i>
                    &nbsp;This is now in your cart
                </>
            :
                <>
                <i className="bi bi-cart-plus" style={cartStyle}></i>
                <Button variant="link" onClick={this.handleAddToCart}>
                    Add to cart
                </Button>
                </>
            }
            </>
        )
    }
}
export default OfferCart