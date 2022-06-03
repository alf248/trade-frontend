import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button'
import { MainContext } from '../Main/MainContext.js'
import firebase from 'firebase/compat/app'



function Delete(props) {

    const {offer, onDelete} = props

    const context = useContext(MainContext)

    const handleClick = (e) => {
        e.preventDefault()

        const id = offer.id

        let data = { action: "delete" }

        context.Post('/offers/'+id+'/action')
        .Body(data)
        .Success((result)=>{
            onSuccess()
        })
        .Fail((status, message)=>{
            if (status === null) {
            } else {
                //const msg = status + ' - ' + message
            }
        })
        .CallAuth()
    }

    const onSuccess = () => {
        console.log("OFFER DELETED")
        onDelete()
    }

    const user = firebase.auth().currentUser

    if (offer.status === "active" || offer.status === "finished") return null

    if (user && user.uid === offer.creatorFID) {
        return (
            <>
            <Button variant="danger" onClick={handleClick}>DELETE</Button>
            <br/>
            This is your offer, you can delete it
            </>
        )
    }
    
    return null

}
export default Delete