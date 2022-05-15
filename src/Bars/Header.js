import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom"



function Header(props) {
    let navigate = useNavigate()
    let location = useLocation()

    const [searchParams, setSearchParams] = useSearchParams()
    
    const query = searchParams.get("q")
    const userQuery = searchParams.get("u")

    const onSearch = (query, userQuery) => {
        const s = (query === null ? "" : "q="+query.trim()) + (userQuery === null ? "" : "&u="+userQuery.trim())
        navigate("/offers/?"+s, {state: ""})
        props.refresh()
    }

    const getParams = () => {
        return {query: searchParams.get("q"), userQuery: searchParams.get("u")}
    }

    return (
        <HeaderPage
            location={location} onSearch={onSearch} cartSize={props.cartSize}
            getParams={getParams} query={query} userQuery={userQuery}
        />
    )
}
export default Header



class HeaderPage extends React.Component {
    constructor(props) {
        super(props)
        this.submitSearch = this.submitSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        const search = this.makeSearchString(this.props.query, this.props.userQuery)
        this.state = { search: search, cartSize: 0 }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged()
        }
    }

    onRouteChanged() {
        const {query, userQuery} = this.props.getParams()
        const search = this.makeSearchString(query, userQuery)
        this.setState({search: search})
    }

    // returns a string like: "query @userQuery"
    makeSearchString(query, userQuery) {
        let s = (query === null ? "" : query.trim()+" ") + (userQuery === null ? "" : "@"+userQuery.trim())
        return s.trim()
    }

    // decompose a string like "query @userQuery" into "query" and "userQuery"
    unMakeSearchString(search) {
         // example: search = boats @joe
        const regex = /(@)\w+/

        let query = search.replace(regex, '').trim() // q = boats

        let user = search.match(regex) // user = @joe
        if (user !== null) {
            user = user[0].substring(1) // user = joe
            user = user.trim()
        }

        return {query: query, userQuery: user}
    }

    submitSearch(e) {
        e.preventDefault()
        const {query, userQuery} = this.unMakeSearchString(this.state.search)
        this.props.onSearch(query, userQuery)
    }

    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value } )
    }

    render() {

        const formStyle = {marginTop: "4px", marginBot: "4px", paddingTop: "5px", paddingBottom: "8px"}

        return (

            <Container fluid>
            <Row>

                <Col md={4} className="d-flex flex-column justify-content-center">

                    <Link to={`/`} style={{paddingTop: "8px", textDecoration: "none"}}>
                        <h1 className="main-color title" style={{paddingBottom: "2px", fontSize: "1.5rem"}}>TRADE SITE</h1>
                    </Link>

                </Col>

                <Col md={4} className="align-middle">

                    <Form className="d-flex align-middle" style={formStyle} onSubmit={this.submitSearch}>
                    <InputGroup>
                            <FormControl
                            aria-label="Search"
                            style={{color:"black", borderRadius: "2px", borderColor: "grey"}}
                            name="search"
                            onChange={this.handleChange}
                            value={this.state.search}
                            />
                            <Button type="submit" variant="outline-secondary" style={{borderRadius: "2px", borderColor: "grey"}}>
                                <i className="bi bi-search"></i>
                            </Button>
                    </InputGroup>
                    </Form>

                </Col>

                <Col md={4} className="d-flex flex-column justify-content-center align-items-end">
                    
                    <Link to={`/cart`} style={{paddingTop: "8px", textDecoration: "none"}}>
                        <p style={{paddingTop: "8px", paddingRight: "4px"}}>
                            {this.props.cartSize} &nbsp;<i className="bi bi-cart"></i>&nbsp; Cart
                        </p>
                    </Link>

                </Col>
    
            </Row>
            </Container>
        )
    }
}