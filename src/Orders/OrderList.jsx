import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Globe from '../Main/Globe'



function OrderList(props) {

    const {error, isLoaded, items, openCancelModal} = props

    if (error != null) {
        return <p>Server error. Can't find resources.</p>
    }
    if (!isLoaded) {
        return <p>Loading...</p>
    }

    const offers = items

    if (offers === null) {
        return <p>none</p>
    }

    const tableRows = offers.map((offer) =>
        <TableRow key={offer.id} order={offer} openCancelModal={openCancelModal} />
    )

    return (
        <Table>
            <tbody>            
                {tableRows}
            </tbody>
        </Table>
    )

}
export default OrderList



function TableRow(props) {

    const {order, openCancelModal} = props

    const handleCancel = () => {
        openCancelModal(order)
    }

    const {id, offerId, name, price, currency, delivery, status, image, created} = order
    const imageSrc = Globe.getImage(image)

    const td_image  = {border: "2px", textAlign: "right", width: "6rem"}
    const td_info   = {border: "2px", verticalAlign: "top", textAlign: "left"}
    const td_status = {border: "2px", verticalAlign: "middle", textAlign: "center", fontSize: "70%"}
    const td_price  = {border: "2px", verticalAlign: "middle", textAlign: "right", minWidth: "100px",   color: "#333"}
    const td_cancel = {border: "2px", verticalAlign: "middle", textAlign: "right", minWidth: "4vh"}

    const then = Date.parse(created)
    const date = new Date(then)
    const timeString = date.getFullYear() + "/" + (date.getUTCMonth()+1) + "/" + date.getUTCDate() + " " + date.getHours() + ":" + date.getMinutes()

    return (
        <>
        <tr style={{backgroundColor: '#f4f4f4'}}>

            <td className="col-1" style={td_image}>
                <Link to={`/offers/${offerId}`}>
                    <img style={{width: "100%"}} src={imageSrc} alt="Offer" />
                </Link>
            </td>

            <td style={td_info}>
                <Link to={`/offers/${offerId}`} style={{textDecoration: "none"}}>
                    <h6 style={{marginBottom: "0px", color: "#444"}}>{name}</h6>
                </Link>
                <p style={{fontSize: "70%"}}>{timeString}</p>
            </td>

            <td style={td_status}>
                <span style={{color: "dodgerblue"}}>ordered</span>
                <br/>
                <span style={{color: "grey"}}>not sent</span>
            </td>

            <td style={td_price}>
                { price === 0? "free": price + " €" }
            </td>

            <td style={td_cancel}>
                <Button className="squareButton" variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
            </td>

        </tr>
        <tr><td style={{border: "0px"}}></td><td style={{border: "0px"}}></td><td style={{border: "0px"}}></td></tr>
        </>
    )
}