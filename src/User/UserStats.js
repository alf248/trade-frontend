import React from 'react'
import Table from 'react-bootstrap/Table'



function UserStats(props) {

    const user = props.user

    return (
        <>
        <Table striped hover variant="light">

        <tbody>
            <tr>
                <td>Offers made</td>
                <td colSpan={2} className="text-start">{user.offersMade}</td>
            </tr>
            <tr>
                <td>Orders made</td>
                <td colSpan={2} className="text-start">{user.vectorsMade}</td>
            </tr>
        </tbody>

        </Table>
        </>
    )
}
export default UserStats