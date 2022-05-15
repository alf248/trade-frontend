import React from 'react'
import Button from 'react-bootstrap/Button'
import { MainContext } from '../MainContext.js'



class Delete extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.state = { buying: false }
    }

    handleClick(e) {
        e.preventDefault()

        const id = this.props.offer.id

        let data = { action: "delete" }

        this.context.Post('/offers/'+id+'/action')
        .Body(data)
        .Success((result)=>{
            this.onSuccess()
        })
        .Fail((status, message)=>{
            if (status === null) {
            } else {
                //const msg = status + ' - ' + message
            }
        })
        .CallAuth()
    }

    onSuccess() {
        console.log("DELETE SUCCESS")
        this.props.onDelete()
    }

    render() {
        const username = this.props.username
        const offer = this.props.offer

        if (username === "") return <></>
        if (offer.status === "active" || offer.status === "finished") return <></>

        if (username === offer.giver || username === offer.receiver) {

            return (
                <>
                <Button variant="danger" onClick={this.handleClick}>DELETE</Button>
                <br/>
                This is your offer, you are allowed to delete it
                </>
            )
        }
    }
}
Delete.contextType = MainContext
export default Delete