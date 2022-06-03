import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams, Link } from "react-router-dom"
import EditUser from './EditUser'
import UserStats from './UserStats'
import UserInfo from './UserInfo'
import { MainContext } from '../Main/MainContext.js'
import Users from '../Main/Apollo.js'
import { gql, useQuery } from '@apollo/client'
import {apolloClient} from '../Main/Apollo.js'
import firebase from 'firebase/compat/app'



function User(props) {

    const { id } = useParams()

    const user = firebase.auth().currentUser

    if (user && user.uid == id) {
        return <UserPrivate />
    }
    
    return <UserPublic id={id} />
}
export default User



function UserPrivate(props) {

    const query = gql`
    query GetSelf {
            getSelf {
                name
                offersMade
                ordersMade
                email
            }
        }
    `
    
    const { loading, error, data } = useQuery(query, {variables: {}, client: apolloClient })
    
    if (loading) return null

    if (error) { console.log("ERR", error); return (
        <Container>
            <Row>
            <Col></Col><Col>{error.message}</Col><Col></Col>
            </Row>
        </Container>
    )}
    
    console.log("GOT DATA", data)

    return ( <UserPage user={data.getSelf} /> )

}



function UserPublic(props) {

    const {id} = props

    console.log("PUBLIC USER", id)
    
    const query = gql`
    query GetUser($id: String!) {
            getUser(fid: $id) {
                name
                offersMade
                ordersMade
            }
        }
    `
    
    const { loading, error, data } = useQuery(query, {variables: { id: id }, client: apolloClient })
    
    if (loading) return null

    if (error) { console.log("ERR", error); return (
        <Container>
            <Row>
            <Col></Col><Col>{error.message}</Col><Col></Col>
            </Row>
        </Container>
    )}
    
    console.log("GOT DATA", data)

    return ( <UserPage user={data.getUser} /> )

}



function UserPage(props) {
    
    const {user} = props

    const { id } = useParams()

    const { signedUser } = useContext(MainContext)
    
    const isSignedUser = (signedUser === id) ? true : false

    let term = "you"
    if (!isSignedUser) term = user.name

    let offersURL = "/offers/?u=" + id
    if (user.name) offersURL += "&username="+user.name

    return (
        <>
        <Container>

        <Row className="justify-content-md-center">

        <Col md={6}>

            <Row>
            <Col>
                <h4>{user.name}</h4>
            </Col>
            </Row>

            <br/>

            <Row>
            <Col md={10}>
                <UserInfo user={user} />
            </Col>
            </Row>

            <br/>

            <Row>
            <Col>
                <Link to={offersURL}><p>View offers by {term}</p></Link>
            </Col>
            </Row>

            <br/>

            <Row>
            <Col md={10}>
                <UserStats user={user} />
            </Col>
            </Row>

        </Col>

        </Row>

        </Container>
        </>
    )
}