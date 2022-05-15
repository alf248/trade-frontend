import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'



class AlterOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { SelectAlter: "Price", Alters: [], Inputs: {Price: "", Name: ""} }
        this.alterClick = this.alterClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleAccept = this.handleAccept.bind(this)
    }

    alterClick() {
        //console.log("ALTER CLICK. add", this.state.SelectAlter)
        let alter = this.state.SelectAlter
        let a = this.state["Alters"]
        //a[this.state.SelectAlter] = ""

        if (a.includes(alter)) {

        } else {
            a.push(alter)
            this.setState( { Alters: a } )
        }

        //console.log("STATE IS NOW", this.state)
    }

    handleRemove(e) {
        let name = e.target.name

        let alters = this.state["Alters"]
        const index = alters.indexOf(name)
        if (index > -1) {
          alters.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState( { Alters: alters } )
    }

    handleChange(e) {
        const inputName = e.target.name;
        let target = e.target
        switch (target.type) {
            case 'checkbox': this.setState({  [inputName]: target.checked}  );
                console.log("CHECKBOX")
                break;
            default: this.setState({ [inputName]: target.value}  ); break;
          }
    }

    handleInputChange(e) {
        //let i = this.state["Inputs"]
        let c = Object.assign({}, this.state["Inputs"])
        c[e.target.name] = e.target.value
        this.setState({ Inputs: c })
    }

    handleAccept() {
        console.log("ACCEPT:", this.state)

        let data = {}
        for (const element of this.state["Alters"]) {
            data[element] = this.state.Inputs[element]
        }

        console.log("ACCEPT: SEND DATA:", data)

        const offerId = this.props.offerId

        console.log("ACCEPT: offerId:", offerId)

        // FETCH
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
		};
		fetch('http://localhost:1323/api/offers/'+offerId+'/alter', requestOptions)
			.then(response => {
				console.log("SEND ALTER FORM. Response status:", response.status)
				return response.text()
			})
			.then(data => {
                console.log("SEND ALTER FORM. Got data:", data)
                this.props.updateOffer()
            } );
        // FETCH

    }

    render() {

        return (

            <div>
               <h4>Changes</h4>
               <p>Make changes to the offer</p>
            
               <Row className="mb-3">

                <Col>
                
                <InputGroup className="mb-3">
                    <InputGroup.Text>Choose Field:</InputGroup.Text>
                    <Form.Select
                    name="SelectAlter"
                    value={this.state.SelectAlter} onChange={this.handleChange}
                    >
                    <option>Name</option>
                    <option>Price</option>
                    </Form.Select>
                    <Button variant="info" onClick={this.alterClick} >
                        Change
                    </Button>
                </InputGroup>
                </Col>
                

                </Row>

                <Card>
                    <Card.Header>List of changes</Card.Header>
                    <Card.Body>

                    <Table striped bordered hover>

                    <tbody>
                    
                    { this.state["Alters"].map( name =>
                        <TableRow name={name} onChange={this.handleInputChange}
                            val={this.state.Inputs[name]} key={name}
                            onRemove={this.handleRemove}
                            
                        />
                        ) }

                    </tbody>
                    </Table>

                    </Card.Body>
                    <Card.Body>
                        <Button variant="success" onClick={this.handleAccept}>Submit</Button>
                    </Card.Body>


                </Card>

            </div>

        )
    }
}
export default AlterOffer



function TableRow(props) {
    const name = props.name
    return <tr key={name}>
    <td style={{textAlign: 'center',  verticalAlign: 'middle'}}>
        { name }
    </td>
    <td>
    
    <Form.Group as={Col} controlId={name}>
        <Form.Control type="text" placeholder={name} name={name}
        onChange={props.onChange} value={props.val}
        />
    </Form.Group>

    </td>
    <td style={{textAlign: 'center',}}>
        <Button variant="danger" name={name} onClick={props.onRemove}>Remove</Button>
    </td>
    </tr>
}