import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import ShowOrderDetails from '../showOrderDetails/ShowOrderDetails';
import NewModal from '../utility/NewModal'

const OrderHistory = () => {
    const userEmail = useSelector(state => state.Auth.loggedInUser.email);

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([])
    const [total,setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetch('/getOrders', {
            method : "POST",
            body: JSON.stringify({"email" : userEmail}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            return res.json()
        })
        .then((res)=>{
            console.log("response", res)
            setOrders(res.orders)
        })
    }, []);

    const showDetails = (order) => {
        setSelectedOrder(order.items)
        setTotal(order.cartTotal)
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
        setTotal(0)
    }
    return (
        <div>
            <div  className='p-4' >
                {
                    orders.length >0 && orders.map(order => {
                        return (
                                <Alert color="primary" key={order.name}>
                                    <div className='d-flex'>
                                        <div className='w-25'>Order no. {order.orderID}</div>
                                        <Button color="danger" onClick={e => showDetails(order)}>ShowOrderDetails</Button>
                                        <div className='flex-fill d-flex justify-content-end'>Amount: {order.cartTotal}</div>
                                    </div>
                                </Alert>
                        )
                        
                    }) 
                }
            </div>
        {showModal ? <NewModal heading={"Cart"} toggle = {hideModal}><div>{<ShowOrderDetails items={selectedOrder} cartTotal={total}/>}</div></NewModal> : ""}
        </div>
    );
}

export default OrderHistory;
