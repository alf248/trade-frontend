import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Globe from '.././javascript/Globe.js'



function Footer(props) {

    const footerStyle = {
        color: "grey",
        backgroundColor: "#e9ecef",
        padding: "10px",
        fontFamily: "Arial",
        marginTop: "300px",
        fontSize: "80%",
    }

    const author = Globe.author
    const authorEmail = Globe.authorEmail
    const authorGit = Globe.authorGit

    return (
        <>
        <footer style={footerStyle}>

        <Container>
        <Row>
            <Col>
                <p>&copy; {author} github: <a href={authorGit}>{authorGit}</a></p>
            </Col>
        </Row>
        </Container>

        </footer>
        </>
    )
    
}
export default Footer