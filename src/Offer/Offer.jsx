import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Globe from '../Main/Globe'
import EditOffer from './EditOffer'
import Delete from './Delete'
import OfferCart from './OfferCart'
import { MainContext } from '../Main/MainContext.js'



function Offer(props) {

    const {addToCart, cartMethods} = props

    const {id} = useParams()

    return (
        <Container>
            <OfferPage offerId={id} addToCart={addToCart} cart={cartMethods} />
        </Container>
    )
}
export default Offer



class OfferPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoaded: false, offer: null, error: null, inCart: false }
        this.requestOffer = this.requestOffer.bind(this)
        this.init = false
    }

    componentDidMount() {
        if (this.init === false) {
            this.init = true
            this.requestOffer()
        }
    }

    requestOffer() {
        this.context.Post("/offers/" + this.props.offerId)
        .Success((result)=>{
            this.setState( { isLoaded: true, offer: result } )
        })
        .Fail((status, message)=>{
            if (status === null) {
                this.setState( { isLoaded: true, error: message } )
            } else {
                const msg = status + ' - ' + message
                this.setState( { isLoaded: true, error: msg } )
            }
        })
        .Call()
    }

    render() {

        const rowClass = "justify-content-md-center"
        const signedUser = this.context.signedUser

        if (this.state.error !== null) {
            return (
                <Row className={rowClass}>
                    <Col xs={6}>{this.state.error}</Col>
                </Row>
            )
        } else if (!this.state.isLoaded) {
            return (
                <Row className={rowClass}>
                    <Col xs={6}>Loading...</Col>
                </Row>
            )
        } else if (this.state.offer === null) {
            return (
                <Row className={rowClass}>
                    <Col xs={6}>Nothing here</Col>
                </Row>
            )
        }
        else {
            const offer = this.state.offer
            const imageSrc = Globe.getImage(offer.image)

            return (
                <Row className={rowClass}>
                
                <Col>
                    <img className="img-thumbnail" src={imageSrc} alt="Offer" style={{maxWidth: "100%"}} />
                </Col>

                <Col md={6}>
        
                    <Row>
                    <Col>
                        <OfferTextAndScore offer={offer} />
                    </Col>
                    </Row>
    
                    <br/>
    
                    <Row>
                    <Col>
                        <From offer={offer} />
                    </Col>
                    </Row>
    
                    <br/><br/>

                    <Row>
                    <Col>
                        <OfferCart offer={offer} cart={this.props.cart} />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
                        <Delete offer={offer} onDelete={this.requestOffer} username={signedUser} />
                    </Col>
                    </Row>
    
                    <br/><br/><br/>
    
                    <EditOfferWrap offer={offer} user={this.props.user}>
                        <EditOffer offer={offer} updateOffer={this.requestOffer} />
                    </EditOfferWrap>

                    <br/><br/><br/><br/><br/><br/>
    
                </Col>
                
                </Row>
            )
        }

    }
}
OfferPage.contextType = MainContext



function OfferTextAndScore(props) {
    const {name, description, likes, dislikes} = props.offer

    const percentage = likes / (likes + dislikes)
    const starCount = Math.floor(percentage * 5)

    let starArray = []
    for (let i = 0; i < 5; i++) {
        if (i < starCount) starArray.push(<>&#9733;</>)
        else starArray.push(<>&#9734;</>)
    }
    const stars = starArray.map((x, i)=><span key={i}>{x}</span>)

    return (
        <>
        <h5>{name}</h5>
        <p>{description === "" ? "-no description-": description}</p>
        <p>{stars}</p>
        </>
    )
}



function EditOfferWrap(props) {

    const offer = props.offer
    const user = props.user

    if (offer.status === "finished" || offer.status === "active") {
        return null
    }
    if (user && user !== "") {

        const giver = offer.giver == null ? "" : offer.giver
        const receiver = offer.receiver == null ? "" : offer.receiver

        if (user === giver || user === receiver) {
            return ( <>{props.children}</> )
        }
        return null
    }
    return null

}



function From(props) {

    const offer = props.offer

    const {creatorFID, creatorName, sale} = offer

    if (creatorName && creatorName !== "") {
        return ( <Link to={`/users/${creatorFID}`}>By {creatorName}</Link> )
    }
    else if (sale) {
        return ( <Link to={`/users/${creatorFID}`}>View seller</Link> )
    }
    
    return ( <Link to={`/users/${creatorFID}`}>View buyer</Link> )

}