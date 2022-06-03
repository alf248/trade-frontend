import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



function CancelModal({order, show, onHide, onCancel}) {

    const orderName = order === null ? "" : order.name
    const orderPrice = order === null ? "" : order.price

    const onCancelHandler = () => {
        onCancel(order)
    }

    return (
        <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header className="color-secondary">
            <Modal.Title id="contained-modal-title-vcenter">
            Cancel Order
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>This will refund your money: <b>{orderPrice} €</b></p>
            <p>Order for: {orderName}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>No</Button>
            <Button variant="primary" onClick={onCancelHandler}>OK</Button>
        </Modal.Footer>
        </Modal>
    );
}
export default CancelModal