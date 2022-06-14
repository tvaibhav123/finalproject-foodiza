import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   Card,
   CardImg,
   CardText,
   CardBody,
   CardLink,
   CardTitle,
   CardSubtitle,
   ButtonGroup,
   Button
} from "reactstrap";
import { cartActions } from "../../Store";
const Menu = () => {
   const [menu, setMenu] = useState([]);
   const dispatch = useDispatch();
   const cartItems = useSelector(state => state.Cart.items);
   useEffect(() => {
      fetch("/menu")
         .then((res) => res.json())
         .then((response) => {
            console.log("response", response);
            setMenu(response);
         });
   }, []);
   const addItemToCarthandler = (item) => {
        const addedItem = item;
        addedItem['quantity'] = 1;
        dispatch(cartActions.addItemToCart(addedItem))
   }
   
   const hasItemInCart = (item) => {
    if(cartItems){
        return cartItems.find(cartitem => cartitem.id === item.id)
    }else {
        return false;
    }
   }

   const getQuantityInfo = (item) => {
        const itemInCart = cartItems.filter(cartitem => cartitem.id === item.id)
        return itemInCart[0].quantity;
   }

   const incrementHandler = (item) => {
      dispatch(cartActions.increaseQuantityOfItem(item));
   }

   const decrementHanlder = (item) => {
      dispatch(cartActions.decreaseQuantityOfItem(item));
   }
   return (
      <div className="d-flex">
         {menu &&
            menu.length > 0 &&
            menu.map((item) => {
               return (
                  <div className="m-2">
                     <Card>
                        <CardBody>
                           <CardTitle>{item.name.toUpperCase()}</CardTitle>
                           <CardSubtitle>{item.cost}</CardSubtitle>
                        </CardBody>
                        {/* <img className="nav--logo" src={item.pic}/> */}
                        <img
                        className="img-container"
                           width="100%"
                           src={item.pic}
                           alt="Card image cap"
                        />
                        {/* ../../../public/Images/biryani.jpg */}
                        <CardBody>
                            { hasItemInCart(item) ?
                                <ButtonGroup>
                                        <Button color="primary" onClick={e => decrementHanlder(item)}>-</Button>
                                        <Button className="button-background">
                                            <div>
                                                {getQuantityInfo(item)}
                                            </div>
                                        </Button>
                                        <Button color="primary" onClick={e => incrementHandler(item)}>+</Button>
                                </ButtonGroup> 
                                : 
                                <Button color="primary" onClick={e => addItemToCarthandler(item)}>Add</Button>
                            }
                            
                        </CardBody>
                     </Card>
                  </div>
               );
            })}
      </div>
   );
};

export default Menu;
