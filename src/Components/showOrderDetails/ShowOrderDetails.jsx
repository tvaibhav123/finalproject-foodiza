import React from 'react';
import { Alert } from 'reactstrap';

const ShowOrderDetails = (props) => {
    return (
        <div>
            <Alert className="m-3 d-flex" color="light">
                <div>No.</div>
                <div className="ps-2 w-25 ">Item name</div>
                <div className="ps-5">Quantity</div>
                <div className="flex-fill d-flex justify-content-end">Total</div>
            </Alert>
            <hr />
            {
                props.items.map((item,index) => {
                    return (<div  key={item.name}>
                        <Alert className="m-3 d-flex" color="light">
                            <div>{index + 1})</div>
                            <div className="ps-4 w-25">{item.name}</div>
                            <div className="ps-5">
                            <div>{item.quantity}</div>
                            </div>
                            <div className="flex-fill d-flex justify-content-end">
                                {item.cost * item.quantity}
                            </div>
                        </Alert>

                    </div>)
                })
            }
            <hr />
            <Alert className="m-3 d-flex justify-content-end" color="light">
                <b>Total:&nbsp; {props.cartTotal}</b>
            </Alert>
            <hr />
        </div>
    );
}

export default ShowOrderDetails;
