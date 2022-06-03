import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom"
import Globe from '../Main/Globe'



function Frontpage(props) {
	
	const textStyle = {
		fontFamily: "futura-pt, sans-serif",
		fontSize: "1.4rem",
	}

	const firstImage = Globe.getImage("classic")
	const secondImage = Globe.getImage("boat1")

	const firstId = "6293a1b5633d6463a4610e88"
	const secondId = "6293a1b5633d6463a4610e83"

	const firstName = "Lucky Car"
	const secondName = "Nice Boat"

	const firstPrice = 1000
	const secondPrice = 8131

	const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

	return (

		<Container>

		<Row>
			<Col xs={2}></Col>

			<Col xs={8} style={{backgroundColor: "white"}}>

				<Row className="justify-content-md-center">
					<Col className="d-flex justify-content-center">
						<h3 style={textStyle}>e-commerce example</h3>
					</Col>
				</Row>
				
				<br/>

				<Row style={{backgroundColor: "white"}}>

				<Col>

					<ItemCard
							title={firstName}
							description={lorem}
							price={firstPrice} currency="€"
							id={firstId}
							image={firstImage}
					/>

				</Col>

				<Col >

					<ItemCard
						title={secondName}
						description={lorem}
						price={secondPrice} currency="€"
						id={secondId}
						image={secondImage}
					/>

				</Col>

				</Row>

			</Col>
			
			<Col xs={2}></Col>
		</Row>

		</Container>
	)

}
export default Frontpage



function ItemCard(props) {

	const {id, title, description, image, price, currency} = props

	const cardStyle = {
		marginLeft:"auto",
		marginRight:"auto",
		display:"block",
		width: '18rem',
		border: '0px',
		backgroundColor: '#fafafa'
	}

	const link = "/offers/" + id

	const textStyle = {
		fontFamily: "futura-pt, sans-serif",
		fontSize: "1.3rem",
		fontWeight: "800",
	}

	return (

		<Card style={cardStyle}>

		<Link to={link}>
			<Card.Img variant="top" src={image} />
		</Link>

		<Card.Body>
			<Card.Title>{title}</Card.Title>
			<Card.Text>
			{description}
			<br/><br/>
			<span style={textStyle}>{price} {currency}</span>
			<br/>
			<Card.Link href={link}>View Offer</Card.Link>
			</Card.Text>
		</Card.Body>

		</Card>

	)
}