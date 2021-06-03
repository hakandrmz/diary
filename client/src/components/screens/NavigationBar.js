import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const NavigationBar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loginInfo = () => {
    if (localStorage.getItem("userid")) {
      setIsLoggedIn(true);
      console.log(isLoggedIn);
    }
  };

  return (
    <div>
      {loginInfo}
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Günlük Uygulaması</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/register/">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/diaryform/">New Note</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>My Diaries</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
