import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'



class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.clickSort = this.clickSort.bind(this);
        this.state = { search: "", active: true, max: 10, page: 0, sortBy: "price", sortUp: true, }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSearch(this.state)
    }

    handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState( { [e.target.name]: value } )
    }

    handleRadioChange(e) {
        this.setState( { active: !this.state.active }, () => {
            this.props.onSearch(this.state)
        } )
    }

    clickSort() {
        if (this.state.sort === 1) {
            this.setState({sort:-1}, () => this.props.onSearch(this.state) )
        }
        else if (this.state.sort === -1) {
            this.setState({sort:1}, () => this.props.onSearch(this.state))
        }
    }

    render() {
        //const sortStyle={marginTop: "-2px", marginBottom: "0px", paddingTop: "0px", paddingBottom: "0px", fontSize: "80%"}

        const formStyle = {marginTop: "4px", marginBot: "4px", paddingTop: "8px", paddingBottom: "8px"}
        const formBtnStyle = {borderRadius: "2px", borderColor: "grey"}

        const formInputStyle = {color:"black", borderRadius: "2px", borderColor: "grey"}

        return (
            <>
    
            <Form className="d-flex align-middle" style={formStyle} onSubmit={this.handleSubmit}>
            <InputGroup>
                    <FormControl
                    aria-label="Search"
                    style={formInputStyle}
                    name="search"
                    onChange={ this.handleChange }
                    />
                    <Button type="submit" variant="outline-secondary" style={formBtnStyle} >
                    <i className="bi bi-search"></i>
                    </Button>
            </InputGroup>
            </Form>


            <Row style={{marginTop: "10px", marginBottom: "-10px"}}>

                <Col>

                    <Form>
                    
                        <Form.Check
                        inline
                        label="Ordered"
                        name="active"
                        type="radio"
                        id="PChoiceActive"
                        checked={this.state.active ? true : false}
                        onChange={this.handleRadioChange}
                        />

                        <Form.Check
                            inline
                            label="Delivered"
                            name="completed"
                            type="radio"
                            id="PChoiceCompleted"
                            checked={this.state.active ? false : true}
                            onChange={this.handleRadioChange}
                        />

                    </Form>

                </Col>

                {/*
                <Col style={{textAlign: "right"}}>

                    {this.state.sort == 1?
                    <Button variant="link" style={sortStyle} onClick={this.clickSort}>
                        sort by price &uarr;</Button>
                        :
                    <Button variant="link" style={sortStyle} onClick={this.clickSort}>sort by price &darr;</Button>
                    }
                
                </Col>
                */}

            </Row>

            </>
        )
    }
}
export default SearchBar