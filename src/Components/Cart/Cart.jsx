import React from 'react';
import { Alert , Button, ButtonGroup} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../Store';

const Cart = () => {
    const cartDetails = useSelector(state => state.Cart.items);
    const cartTotal = useSelector(state => state.Cart.cartTotal)
    const dispatch = useDispatch();

   const incrementHandler = (item) => {
      dispatch(cartActions.increaseQuantityOfItem(item));
   }

   const decrementHanlder = (item) => {
      dispatch(cartActions.decreaseQuantityOfItem(item));
   }
    return (
        <div>
            <h1 className='text-center pt-3'>Cart</h1>
            <hr />
            <Alert className='m-3 d-flex' color="light">
                <div>No.</div>
                <div className='ps-2 w-25 '>Item name</div>
                <div className='ps-5'>Quantity</div>
                <div className='flex-fill d-flex justify-content-end'>Total</div>
            </Alert>
            <hr />
            {cartDetails.length>0 && cartDetails.map((item, index)=> {
                return (
                    <Alert className='m-3 d-flex' color="light">
                        <div>{index+1})</div>
                        <div className='ps-4 w-25'>{item.name}</div>
                        <div className='ps-5'>
                                <ButtonGroup>
                                    <Button color="primary" onClick={e => decrementHanlder(item)}>-</Button>
                                    <Button className="button-background">
                                        <div>
                                            {item.quantity}
                                        </div>
                                    </Button>
                                    <Button color="primary" onClick={e => incrementHandler(item)}>+</Button>
                                </ButtonGroup>
                        </div>
                        <div className='flex-fill d-flex justify-content-end'>{item.cost*item.quantity}</div>
                    </Alert>
                )
            })}
            <hr />
            <Alert className='m-3 d-flex justify-content-end' color='light'>
                {cartTotal}
            </Alert>
            <hr />
        </div>
    );
}

export default Cart;
