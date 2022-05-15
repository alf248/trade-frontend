import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom"
import Globe from '../javascript/Globe'



class Frontpage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		const textStyle = {
			fontFamily: "futura-pt, sans-serif",
			fontSize: "1.4rem",
		}

		const classicImage = Globe.getImage("classic")
		const racerImage = Globe.getImage("dodge")

		const classicId = Globe.classicId
		const racerId = Globe.racerId

		return (

			<Container>
			<Row>
				<Col></Col>
				<Col sm={8} style={{backgroundColor: "white"}}>
					<br></br><br></br>
					<h3 style={textStyle}>Buy or Sell</h3>
					<p>This website is a prototype. It's meant for trading, buying and selling.
					</p>
					
					<br></br>

					<Row style={{backgroundColor: "white"}}>

					<Col>

						<ItemCard
								title="Lucky Car"
								description="Travelling in this car brings you good luck. Get it if you want to win the lottery."
								price="100" currency="€"
								id={classicId}
								image={classicImage}
						/>

					</Col>

					<Col >

						<ItemCard
							title="Fast Car"
							description="This car goes twice as fast as the speed limit. Bring some cash to pay the cops."
							price="1000" currency="€"
							id={racerId}
							image={racerImage}
						/>

					</Col>

					</Row>

				</Col>
				<Col>
					
				</Col>
			</Row>

			</Container>
		)

	}

}
export default Frontpage



class ItemCard extends React.Component {

	render() {

		const cardStyle = {
			marginLeft:"auto",
   			marginRight:"auto",
   			display:"block",
			width: '18rem',
		}

		const link = "/offers/" + this.props.id

		const textStyle = {
			fontFamily: "futura-pt, sans-serif",
			fontSize: "1.3rem",
			fontWeight: "800",
		}

		return (

			<Card style={cardStyle}>

			<Link to={link}>
				<Card.Img variant="top" src={this.props.image} />
			</Link>

			<Card.Body>
				<Card.Title>{this.props.title}</Card.Title>
				<Card.Text>
				{this.props.description}
				<br></br><br></br>
				<span style={textStyle}>{this.props.price} {this.props.currency}</span>
				<br></br><br></br>
				<Card.Link href={link}>View Offer</Card.Link>
				</Card.Text>
			</Card.Body>

			</Card>

		)


	}
}