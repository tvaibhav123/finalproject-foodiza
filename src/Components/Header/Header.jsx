import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from "reactstrap";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
       const user = localStorage.getItem('loggedInUser');
       if(user){
           const parsedUser = JSON.parse(user)
           setUser(parsedUser)
       }
    }, [navigate]);
    const logout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
        navigate("/login")
    }
   return (
      <div>
         <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">FOODIZA</NavbarBrand>
            {/* <Collapse isOpen={this.state.isOpen} navbar> */}
               <Nav className="ml-auto" navbar>
                  <NavItem className="pt-2">
                     <Link className="link" to="/">Home</Link>
                  </NavItem>
                  {!user && <NavItem className="ps-3 pt-2">
                     <Link className="link" to="/login">
                        Sign In 
                     </Link>
                  </NavItem> }
                  
                  {/* <NavItem className="ps-3">
                     <Link className="link" to="/register">
                        Sign Up
                     </Link>
                  </NavItem> */}
                  {user && <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret className="link">
                        {user.name}
                     </DropdownToggle>
                     <DropdownMenu right>
                        <DropdownItem onClick={logout}>Logout</DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>}
               </Nav>
            {/* </Collapse> */}
         </Navbar>
      </div>
   );
};

export default Header;
