import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from "reactstrap";
import { authActions, cartActions } from "../../Store";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const reduxStateUser = useSelector(state => state.Auth.loggedInUser);
    const dispatch = useDispatch();
    useEffect(() => {
       console.log("Navigate change called...")
       //const user = localStorage.getItem('loggedInUser');
       console.log("user ", user)
       if(reduxStateUser){
           setUser(reduxStateUser);
       }
    }, [navigate]);
    const logout = () => {
        dispatch(cartActions.clearCart())
        dispatch(authActions.logout())
        setUser(null);
        navigate("/login")
    }
   return (
      <div>
         <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">FOODIZA</NavbarBrand>
            
               <Nav className="ml-auto" navbar>
                  <NavItem className="pt-2">
                     <Link className="link" to="/welcome">Home</Link>
                  </NavItem>
                  <NavItem className="pt-2 ps-3">
                     <Link className="link" to="/orders">Order History</Link>
                  </NavItem>
                  <NavItem className="ps-3 pt-2">
                     <Link className="link" to="/cart">Cart</Link>
                  </NavItem>
                  {Object.keys(reduxStateUser).length == 0 && <NavItem className="ps-3 pt-3">
                     <Link className="link" to="/login">
                        Sign In 
                     </Link>
                  </NavItem> }
                  
               
                  { Object.keys(reduxStateUser).length>0 && <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret className="link">
                        {user.name}
                     </DropdownToggle>
                     <DropdownMenu right>
                        <DropdownItem onClick={logout}>Logout</DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>}
               </Nav>
            
         </Navbar>
      </div>
   );
};

export default Header;
