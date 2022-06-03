import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import OffersBar from './OffersBar'
import OfferList from './OfferList'
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom"
import { MainContext } from '../Main/MainContext.js'



function OffersIndex(props) {
    //let navigate = useNavigate()
    //let location = useLocation()

    const [searchParams, setSearchParams] = useSearchParams()
    
    const getSearchParams = () => {
        const userQuery = searchParams.get("u")
        const usernameQuery = searchParams.get("username")
        const query = searchParams.get("q")
        return {query: query, userQuery: userQuery, usernameQuery: usernameQuery}
    }

    return ( <OffersPage getSearchParams={getSearchParams} /> )
}
export default OffersIndex



class OffersPage extends Component {
    constructor(props) {
        super(props)
        this.AdjustSearchRef = React.createRef()
        this.handleAdjustSearch = this.handleAdjustSearch.bind(this)
        this.searchServer = this.searchServer.bind(this)
        this.clickCategory = this.clickCategory.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.init = false
        this.state = {items: [], isLoaded: false, error: null, query: "", userQuery: "", cat: null, page: 0}
    }

    componentDidMount() {
        if (this.init === false) {
            console.log("MOUNT SEARCH")
            this.makeSearch()
            this.init = true
        }
    }

    componentDidUpdate() {
        const {query, userQuery} = this.props.getSearchParams()
        // if searchParam in URL has changed, send a search to server
        if (query !== this.state.query || userQuery !== this.state.userQuery) {
            this.setState({query: query, userQuery: userQuery})
            console.log("UPDATE SEARCH")
            this.makeSearch()
        }
    }

    prevPage() {
        const page = this.state.page
        if (page !== 0) {
            this.setState({page: page-1}, () => {this.makeSearch()})
        }
    }

    nextPage() {
        const page = this.state.page
        if (page !== 9) {
            this.setState({page: page+1}, () => {this.makeSearch()})
        }
    }

    makeSearch() {
        // Get data from adjust bar
        const adjustData = this.AdjustSearchRef.current.state

        // Get search params
        const {query, userQuery} = this.props.getSearchParams()

        // Get category and page
        const cat = this.state.cat
        const page = this.state.page

        const totalData = {...adjustData, ...{cat: cat, search: query, by: userQuery, page: page},}

        this.searchServer(totalData)
    }

    handleAdjustSearch() {
        this.makeSearch()
    }

    searchServer(data) {
        const body = data
        this.context.Post("/offers")
        .Body(body)
        .Success((result)=>{
            this.setState({ isLoaded: true, items: result })
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

    yourOffers() {
        const signedUser = this.context.signedUser
        if (signedUser === "") {
            return (
                <span style={{color: "#ccc"}}>Your Offers</span>
            )
        }
        return (
            <Link to={"/offers/?u="+signedUser}>Your Offers</Link>
        )
    }

    clickCategory(e) {
        e.preventDefault()
        const cat = e.target.getAttribute('cat')
        if (cat === this.state.cat) {
            this.setState({cat: null}, () => {this.makeSearch()})
        } else {
            this.setState({cat: cat}, () => {this.makeSearch()})
        }
    }

    render() {

        let style = {
            car : {backgroundColor: "white"},
            boat : {backgroundColor: "white"},
            plane : {backgroundColor: "white"},
            bike : {backgroundColor: "white"},
        }

        let word = {
            car : "Cars",
            boat : "Boats",
            plane : "Planes",
            bike : "Bikes",
        }

        style[this.state.cat] = {backgroundColor: "#afcbFF"}

        const page = this.state.page
        const nextDisabled = (page > 8) || (this.state.items === null)
        const prevDisabled = (page < 1)

        const {query, userQuery, usernameQuery} = this.props.getSearchParams()

        let byUser = null
        if (usernameQuery) {
            byUser = <p>Showing offers by <Link to={"/users/"+userQuery}>{usernameQuery}</Link></p>    
        } else if (userQuery) {
            byUser = <p>Showing offers by {userQuery}</p>
        }
        
        return (
            <Container>

            <Row className="gx-5">

                <Col sm={4} md={3}>
                    
                    <br/><br/>

                    <ListGroup style={{paddingTop: "2px", maxWidth: "10em", borderRadius: "2px"}}>
                        <ListGroup.Item className="cat" cat="car" style={style["car"]} onClick={this.clickCategory}>{word["car"]}</ListGroup.Item>
                        <ListGroup.Item className="cat" cat="boat" style={style["boat"]} onClick={this.clickCategory}>{word["boat"]}</ListGroup.Item>
                        <ListGroup.Item className="cat" cat="plane" style={style["plane"]} onClick={this.clickCategory}>{word["plane"]}</ListGroup.Item>
                        <ListGroup.Item className="cat" cat="bike" style={style["bike"]} onClick={this.clickCategory}>{word["bike"]}</ListGroup.Item>
                    </ListGroup>
                    
                    <br/>

                    <ListGroup variant="flush" style={{paddingTop: "2px", maxWidth: "10em"}}>

                        <ListGroup.Item className="d-flex justify-content-center" >
                            <ButtonGroup size="sm">
                                <Button style={{borderRadius: "2px"}} disabled={prevDisabled} className="" variant="outline-primary" onClick={this.prevPage}>Prev</Button>
                                <Button disabled>{this.state.page}</Button>
                                <Button style={{borderRadius: "2px"}} disabled={nextDisabled} className="" variant="outline-primary" onClick={this.nextPage}>Next</Button>
                            </ButtonGroup>
                        </ListGroup.Item>

                    </ListGroup>

                    <br/>

                </Col>

                <Col sm={7} md={8}>
                    {byUser ? byUser : <br></br> }

                    <OffersBar onSearch={this.handleAdjustSearch} ref={this.AdjustSearchRef} />
                    <br/>
                    <OfferList offers={this.state.items} isLoaded={this.state.isLoaded} error={this.state.error} />
                </Col>
                
                <Col sm={1} md={1}>
                </Col>

            </Row>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/>

            </Container>
        )
    }
}
OffersPage.contextType = MainContext