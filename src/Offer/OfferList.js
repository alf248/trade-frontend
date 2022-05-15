import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Globe from '../javascript/Globe'



class OfferList extends React.Component {

    render() {

        if (this.props.error != null) {
            return <p>Server error. Can't find resources.</p>
        }
        if (!this.props.isLoaded) {
            return <p>Loading...</p>
        }

        const offers = this.props.items

        if (offers === null) {
            return <p>Nothing found</p>
        }

        const rows = offers.map((offer) =>
            <TableRow key={offer.id} offer={offer} />
        )

        return (
            <>
            {rows}
            </>
        )
    }
}
export default OfferList



function TableRow(props)  {

    const offer = props.offer
    const {id, name, price, currency, image} = props.offer

    const imageSrc = Globe.getImage(image)

    const titleStyle = {marginBottom: "0px",paddingTop: "5px"}
    const descriptionStyle = {fontSize: "90%", marginTop: "-1em", paddingTop: "-1em"}
    const imageStyle = {width: "10em"}

    let from = null
    if (offer.receiver !== "") from = offer.receiver
    if (offer.giver !== "") from = offer.giver

    const currencyShort = "€"
    if (currency === "dollars" || currency === "dollar") currencyShort = "$"

    const priceShort = Math.floor(price)

    const description = truncate(offer.description, 120, true)

    return (
        <>
        <Row>

            <Col xs={0} sm={0} md={3} className="d-flex justify-content-center">
                <Link to={`/offers/${id}`} key={id}>
                    <img src={imageSrc} alt="Offer" style={imageStyle} />
                </Link>
            </Col>

            <Col xs={9} sm={9} md={7} className="color-plate-grey" style={{paddingBottom: "6px"}}>
                <Link to={`/offers/${id}`}>
                    <h6 style={titleStyle}>{name}</h6>
                </Link>
                
                <span className="shortText" style={descriptionStyle}>{description}</span>
            </Col>

            <Col xs={3} sm={3} md={2} className="color-plate-grey">

                <div className="d-flex align-items-end flex-column">
                    <div className="p-1 ">
                        <b>{ price === 0? "free": priceShort + " " + currencyShort }</b>
                    </div>

                    <div className="mt-auto p-1 ">
                        {from === null ? null : <Link to={`/users/${from}`}>by {from}</Link> }
                    </div>
                </div>

            </Col>

        </Row>
        <br/>
        </>
    )

}



// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
function truncate( str, n, useWordBoundary ){
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
}