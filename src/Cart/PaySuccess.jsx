import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'



class PaySuccess extends React.Component {

    render() {

        const username = this.props.username

        return (
            <Container>

                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h3>Payment Successful</h3>
                        <br/>
                        {username === "" ? null :
                            <p>You can see your ordered items in your orders page</p>
                        }
                    </Col>
                </Row>

                <br/><br/>

                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h5>Receipt - todo</h5>

                        <Receipt />

                    </Col>
                </Row>

            </Container>
        )
    }
}
export default PaySuccess


function Receipt() {

    return (

        <Table striped bordered hover>
        <tbody>
            <tr>
            <td>Vendor</td>
            <td>xxxx</td>
            </tr>
            <tr>
            <td>Item</td>
            <td>xxxx</td>
            </tr>
            <tr>
            <td>Price</td>
            <td>xxxx</td>
            </tr>
            <tr>
            <td>Date</td>
            <td>xxxx</td>
            </tr>
        </tbody>
        </Table>

    )
}