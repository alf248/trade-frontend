import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Globe from '../javascript/Globe'



function CartItems(props) {

    const {cart, cartMethods} = props

    const getRows = (cart) => {
        let rows = []
        for (const [key, offer] of Object.entries(cart)) {
            if (offer !== null)
                rows.push(<TableRow key={offer.id} offer={offer} cartMethods={cartMethods} />)
        }
        return rows
    }

    if (cart === null || cart.length === 0) return null

    return (
        <Table>
            <tbody>
                {getRows(cart)}
            </tbody>
        </Table>
    )
}
export default CartItems



function TableRow(props) {

    const {offer, cart, cartMethods} = props

    const handleRemoveClick = (e) => {
        e.preventDefault()
        cartMethods.removeFromCart(e.target.getAttribute('id'))
    }

    const noBorder = {border: "0px"}
    const {id, name, price, currency, description, image} = offer

    const imageSrc = Globe.getImage(image)

    const td_image  = {textAlign: "right", border: "0px", width: "6rem"}
    const td_title  = {border: "0px", verticalAlign: "middle"}
    const td_price  = {minWidth: "100px", textAlign: "right", border: "0px", verticalAlign: "middle"}
    const td_remove = {minWidth: "4vh", textAlign: "right", border: "0px", verticalAlign: "middle"}

    const priceEuro = price
    if (currency === "dollars" || currency === "dollar") {
        priceEuro = Globe.convertDollarsToEuro(price)
    }

    return (
        <>

        <tr style={{backgroundColor: '#fafafa'}}>

            <td className="col-1" style={td_image}>
                <Link to={`/offers/${id}`} key={id}>
                    <img style={{width: "100%"}} src={imageSrc} alt="Offer" />
                </Link>
            </td>

            <td style={td_title}>
                <Link to={`/offers/${id}`} style={{textDecoration: "none"}}>
                    <h5 style={{marginBottom: "0px", color: "#444"}}>{name}</h5>
                </Link>
            </td>

            <td style={td_price}>
                { price === 0 ? "free" :
                    <b>{price} {" €"}</b>
                }
            </td>

            <td style={td_remove}>
                <Button className="squareButton" id={id} variant="outline-primary" onClick={handleRemoveClick}>Remove</Button>
            </td>

        </tr>

        <tr >
            <td style={noBorder}></td><td style={noBorder}></td><td style={noBorder}></td>
        </tr>

        </>
    )
}