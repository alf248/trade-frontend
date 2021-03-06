import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { MainContext } from '../Main/MainContext.js'
import CancelModal from './CancelModal'
import OrderList from './OrderList'



function Orders(props) {
    
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
        //this.handleSearch = this.handleSearch.bind(this)
        this.openCancelModal = this.openCancelModal.bind(this)
        this.removeOrderPost = this.removeOrderPost.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.handleAsGiver = this.handleAsGiver.bind(this)
        this.update = this.update.bind(this)
        this.init = false
        this.searchBarRef = React.createRef()
        this.state = {items: [], showCancelModal: false, removeOrder: null, asGiver: false}
    }

    componentDidMount() {
        if (this.init === false) {
            this.update()
            this.init = true
        }
    }

    update() {
        //const form = this.searchBarRef.current.state
        this.searchServer({ search: "", active: true, max: 10, page: 0, sortBy: "price", sortUp: true, asGiver: this.state.asGiver })
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

    /*
    handleSearch(data) {
        console.log("handle search", data)
        this.searchServer(data)
    }
    */

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
        .CallAuth()
    
    }

    handleAsGiver() {
        this.setState({asGiver: !this.state.asGiver}, ()=>{this.update()})
    }

    render() {

        return (
            <>

            <Row className="justify-content-md-center">
            <Col md={7}>
                <h4>Your Orders</h4>
            </Col>
            </Row>

            <br/>

            <Row className="justify-content-md-center">

                <Col>
                    <Form>
                    <Form.Check 
                        type="radio"
                        id="custom-switch"
                        label="Receiving"
                        checked={!this.state.asGiver}
                        onChange={this.handleAsGiver}
                    />
                    <Form.Check 
                        type="radio"
                        id="disabled-custom-switch"
                        label="Giving"
                        checked={this.state.asGiver}
                        onChange={this.handleAsGiver}
                    />
                    </Form>
                </Col>

                <Col md={7}>
                    <OrderList items={this.state.items} isLoaded={this.state.isLoaded} error={this.state.error} openCancelModal={this.openCancelModal} />
                </Col>

                <Col></Col>

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