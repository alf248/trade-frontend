import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OfferForm from './OfferForm'



class OfferNew extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<Container>

			<br/><br/>

			<Row className="justify-content-md-center">
			
				<Col md={8} lg={6}>
					<OfferForm/>
				</Col>
				
			</Row>

			</Container>
		)

	}

}
export default OfferNew