import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams, Link } from "react-router-dom"
import UserEdit from './UserEdit'
import UserStats from './UserStats'
import UserInfo from './UserInfo'
import { MainContext } from '../MainContext.js'



const User=(props)=> {
    const { username } = useParams()
    return (
        <UserPage userInURL={username} />
    )
}
export default User



class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoaded: false, offer: null, error: null, user: null }
        this.getUser = this.getUser.bind(this)
        this.setUser = this.setUser.bind(this)
        this.init = false
    }

    componentDidMount() {
        if (this.init === false) {
            this.init = true
            this.getUser()
        }
    }

    componentDidUpdate() {
        if (this.state.user !== null) {
            if (this.props.userInURL !== this.state.user.name) {
                this.getUser()
            }
        }
    }

    setUser(user) {
        this.setState( {user: user} )
    }

    getUser() {

        const userInURL = this.props.userInURL

        this.context.Post("/users/" + userInURL)
        .Success((result)=>{
            this.setState( { user: result, isLoaded: true } )
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

    render() {

        const error = this.state.error

        if (error) {
            return <>
                <Container>
                    <Row>
                    <Col></Col><Col><br/><br/>{error}</Col><Col></Col>
                    </Row>
                </Container>
                </>
        } else if (!this.state.isLoaded) {
            return <>
                <Container>
                    <Row>
                    <Col></Col><Col><br/><br/>Loading...</Col><Col></Col>
                    </Row>
                </Container>
                </>
        } else {

            const signedUser = this.context.signedUser
            const userInURL = this.props.userInURL
            const isSignedUser = (signedUser === userInURL) ? true : false

            let term = "you"
            if (!isSignedUser) term = userInURL

            return (
                <>
                <Container>
    
                <br/><br/>
    
                <Row className="justify-content-md-center">

                <Col md={6}>
    
                    <Row>
                    <Col>
                        <h4>{this.state.user.name}</h4>
                    </Col>
                    </Row>

                    <br/>
    
                    <Row>
                    <Col md={10}>
                        <UserInfo user={this.state.user} />
                    </Col>
                    </Row>
        
                    <br/>

                    <Row>
                    <Col>
                        <Link to={"/offers/?u=" + userInURL}><p>View offers by {term}</p></Link>
                    </Col>
                    </Row>

                    <br/>

                    <Row>
                    <Col md={10}>
                        <UserStats user={ this.state.user } />
                    </Col>
                    </Row>

                    <br/><br/>

                    {!isSignedUser ? null : <UserEdit setUser={this.setUser} user={this.state.user} /> }

                </Col>

                </Row>

            </Container>

            </>
            )
        }

    }
}
UserPage.contextType = MainContext