import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Globe from '../javascript/Globe'



class OrderList extends React.Component {

    render() {

        if (this.props.error != null) {
            return <p>Server error. Can't find resources.</p>
        }
        if (!this.props.isLoaded) {
            return <p>Loading...</p>
        }

        const offers = this.props.items

        if (offers === null) {
            return <p>You have not made any orders</p>
        }

        const tableRows = offers.map((offer) =>
            <TableRow key={offer.id} order={offer} openCancelModal={this.props.openCancelModal} />
        )

        return (

            <Table>
                <tbody>            
                    {tableRows}
                </tbody>
            </Table>

        )
    }
}
export default OrderList



class TableRow extends React.Component {
    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleCancel() {
        this.props.openCancelModal(this.props.order)
    }

    render() {
        const {id, gunId, name, price, currency, delivery, status, image, created} = this.props.order
        const imageSrc = Globe.getImage(image)

        const noBorder = {border: "0px"}

        const trStyle = {backgroundColor: '#fafafa'}

        const td_image  = {border: "2px", textAlign: "right", width: "6rem"}
        const td_info   = {border: "2px", verticalAlign: "top", textAlign: "left"}
        const td_status = {border: "2px", textAlign: "center", verticalAlign: "middle", fontSize: "70%"}
        const td_price  = {border: "2px", verticalAlign: "middle", minWidth: "100px", textAlign: "right",  color: "#333"}
        const td_cancel = {border: "2px", verticalAlign: "middle", minWidth: "4vh", textAlign: "right"}

        const then = Date.parse(created)
        const date = new Date(then)

        const timeString = date.getFullYear() + "/" + (date.getUTCMonth()+1) + "/" + date.getUTCDate() + " " + date.getHours() + ":" + date.getMinutes()

        return (
            <>
            <tr style={trStyle}>

                <td className="col-1" style={td_image}>
                    <Link to={`/offers/${gunId}`}>
                        <img style={{width: "100%"}} src={imageSrc} alt="Offer" />
                    </Link>
                </td>

                <td style={td_info}>
                    <Link to={`/offers/${gunId}`} style={{textDecoration: "none"}}>
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
                    <Button className="squareButton" variant="outline-secondary" onClick={this.handleCancel}>Cancel</Button>
                </td>

            </tr>
            <tr><td style={noBorder}></td><td style={noBorder}></td><td style={noBorder}></td></tr>
            </>
        )
    }
}