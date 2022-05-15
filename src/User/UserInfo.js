import React from 'react'
import Table from 'react-bootstrap/Table'



function UserInfo(props) {

    const user = props.user

    return (
        <>
        <Table striped hover variant="light">

        <tbody>
            <tr>
                <td>Name</td>
                <td colSpan={2}>{user.name}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td colSpan={2}>{user.email}</td>
            </tr>
            <tr>
                <td>Phone</td>
                <td colSpan={2}>{user.phone}</td>
            </tr>
        </tbody>

        </Table>
        </>
    )
}
export default UserInfo