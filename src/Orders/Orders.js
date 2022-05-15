import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MainContext } from '../MainContext.js'
import CancelModal from './CancelModal'
import OrderList from './OrderList'
//import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
//import SearchBar from './SearchBar'



const Orders=(props)=> {
    //const navigate = useNavigate()
    //const location = useLocation()
    //const [searchParams, setSearchParams] = useSearchParams()
    
    return (
        <Container>
            <OrdersPage />
        </Container>
    )
}
export default Orders



class OrdersPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.openCancelModal = this.openCancelModal.bind(this)
        this.removeOrderPost = this.removeOrderPost.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.update = this.update.bind(this)
        this.init = false
        this.searchBarRef = React.createRef()
        this.state = {items: [], showCancelModal: false, removeOrder: null}
    }

    componentDidMount() {
        if (this.init === false) {
            this.update()
            this.init = true
        }
    }

    update() {
        //const form = this.searchBarRef.current.state
        this.searchServer({ search: "", active: true, max: 10, page: 0, sortBy: "price", sortUp: true })
    }

    openCancelModal(order) {
        this.setState({showCancelModal: true, removeOrder: order})
    }

    onCancel(order) {
        this.setState({showCancelModal: false})
        this.removeOrderPost(order)
    }

    removeOrderPost(order) {

        const body = { action: "remove" }

        this.context.Post('/orders/'+order.id+'/action')
        .Body(body)
        .Success((result)=>{
            console.log("--remove success--")
            this.update()
        })
        .Fail((status, message)=>{
            if (status === null) {
                this.update()
            } else {
                //const msg = status + ' - ' + message
            }
        })
        .CallAuth()
    }

    handleSearch(data) {
        console.log("handle search", data)
        this.searchServer(data)
    }

    searchServer(data) {
    
        this.context.Post("/orders")
        .Body(data)
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

    render() {

        const signedUser = this.context.signedUser

        return (
            <>

            <br></br><br></br>

            <Row className="justify-content-md-center">
            <Col md={7}>
                <h4>Your Orders, {signedUser}</h4>
            </Col>
            </Row>

            {/*
            <Row className="justify-content-md-center">
            <Col md={8}>
                <SearchBar onSearch={this.handleSearch} username={this.props.username} ref={this.searchBarRef} />
            </Col>
            </Row>
            */}

            <br></br>

            <Row className="justify-content-md-center">
            <Col md={7}>
                <OrderList items={this.state.items} isLoaded={this.state.isLoaded} error={this.state.error} openCancelModal={this.openCancelModal} />
            </Col>
            </Row>

            <CancelModal
                order={this.state.removeOrder}
                show={this.state.showCancelModal}
                onHide={() => this.setState({showCancelModal: false})}
                onCancel={this.onCancel}
            />

            </>
        )
    }
}
OrdersPage.contextType = MainContext