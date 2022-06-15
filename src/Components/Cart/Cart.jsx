import React from "react";
import { Alert, Button, ButtonGroup } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../Store";

const Cart = (props) => {
   const cartDetails = useSelector((state) => state.Cart.items);
   const cartTotal = useSelector((state) => state.Cart.cartTotal);
   const dispatch = useDispatch();
   const user = useSelector((state) => state.Auth.loggedInUser);

   const incrementHandler = (item) => {
      dispatch(cartActions.increaseQuantityOfItem(item));
   };

   const decrementHanlder = (item) => {
      dispatch(cartActions.decreaseQuantityOfItem(item));
   };

   const orderNowHandler = () => {
      const orderObject = {
         user: user,
         items: cartDetails,
         cartTotal: cartTotal,
      };
      fetch("/order", {
         method: "POST",
         body: JSON.stringify(orderObject),
         headers: {
            "Content-type": "application/json; charset=UTF-8",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((res) => {
            console.log("response", res);
         });
   };
   return (
      <div>
         <h1 className="text-center pt-3">Cart</h1>
         <hr />
         <Alert className="m-3 d-flex" color="light">
            <div>No.</div>
            <div className="ps-2 w-25 ">Item name</div>
            <div className="ps-5">Quantity</div>
            <div className="flex-fill d-flex justify-content-end">Total</div>
         </Alert>
         <hr />
         {cartDetails.length > 0 &&
            cartDetails.map((item, index) => {
               return (
                  <Alert className="m-3 d-flex" color="light">
                     <div>{index + 1})</div>
                     <div className="ps-4 w-25">{item.name}</div>
                     <div className="ps-5">
                        <ButtonGroup>
                           <Button
                              color="primary"
                              onClick={(e) => decrementHanlder(item)}
                           >
                              -
                           </Button>
                           <Button className="button-background">
                              <div>{item.quantity}</div>
                           </Button>
                           <Button
                              color="primary"
                              onClick={(e) => incrementHandler(item)}
                           >
                              +
                           </Button>
                        </ButtonGroup>
                     </div>
                     <div className="flex-fill d-flex justify-content-end">
                        {item.cost * item.quantity}
                     </div>
                  </Alert>
               );
            })}
         <hr />
         <Alert className="m-3 d-flex justify-content-end" color="light">
            <b>Total:&nbsp; {cartTotal}</b>
         </Alert>
         <hr />
         {cartDetails.length > 0 && (
            <div className="pe-3 d-flex justify-content-end">
                <Button color="primary" onClick={orderNowHandler}>
                Order now!
                </Button>
            </div>
         )}
      </div>
   );
};

export default Cart;
