import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class OffersBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSaleRadioChange = this.handleSaleRadioChange.bind(this)
        this.clickSort = this.clickSort.bind(this)
        this.state = { sale: true, sortUp: true }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSearch(this.state)
    }

    handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState( { [e.target.name]: value } )
    }

    handleSaleRadioChange(e) {
        e.preventDefault()
        this.setState( { sale: !this.state.sale }, () => {
            this.props.onSearch()
        } )   
    }

    clickSort() {
        if (this.state.sortUp === true) {
            this.setState({sortUp: false}, () => this.props.onSearch(this.state) )
        }
        else if (this.state.sortUp === false) {
            this.setState({sortUp: true}, () => this.props.onSearch(this.state))
        }
    }

    render() {
        //const {number, name, amount, due} = this.props;

        const sortStyle={
            marginTop: "-2px", marginBottom: "0px", paddingTop: "0px", paddingBottom: "0px",
            fontSize: "80%"
        }

        return (
            <>

            {/* 
            <Row>

                <InputGroup>

                    <InputGroup.Text variant="outline-secondary" id="phone-group" style={{borderRadius: "2px"}}>User</InputGroup.Text>

                    <FormControl
                    placeholder=""
                    aria-describedby="phone-group"
                    type="text"
                    name="phone"
                    />

                    <Button type="submit" variant="secondary" style={{borderRadius: "2px"}}>
                    Change
                    </Button>

                </InputGroup>

            </Row>
            */}

            <Row style={{marginTop: "10px", marginBottom: "-10px"}}>

            <Col sm={8}>
                <Form>
                
                <Form.Check
                inline
                label="Selling"
                name="give"
                type="radio"
                id="PChoiceGive"
                checked={this.state.sale}
                onChange={this.handleSaleRadioChange}
                />
                <Form.Check
                    inline
                    label="Buying"
                    name="receive"
                    type="radio"
                    id="PChoiceReceive"
                    checked={!this.state.sale}
                    onChange={this.handleSaleRadioChange}
                />

                </Form>
            </Col>

            <Col sm={4} style={{textAlign: "right"}}>

                <Button variant="link" style={sortStyle} onClick={this.clickSort}>sort by price {this.state.sortUp ? <>&darr;</> : <>&uarr;</> }</Button>

            </Col>

            </Row>

        </>

    )}
}
export default OffersBar