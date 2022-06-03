


class Cookies extends React.Component {
	constructor(props) {
		super(props)
		this.state = {acceptCookies:false}
	}

	render() {

		const cookie = {
			position:"fixed",
			bottom: "10px",
			right: "10px",
			width: '16rem',
			backgroundColor: "lightgrey",
			padding: '5px',
		}

		return (
			<>
				<div style={cookie}>
				<Button variant="primary" name="cancel"  onClick={this.handleClick}>ACCEPT COOKIES</Button>{' '}
				<p>This website uses cookies</p>
				</div>
			</>
		)
	}
}