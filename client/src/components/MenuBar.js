import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="danger" expand="md">
        <NavbarBrand href="/">CIS 550 Restaurants</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/restaurant">
                Restaurant Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/map">
                Map
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/yelp">
                Yelp
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/recommended">
                Recommended
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/liked">
                Liked Restaurants
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/logout">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
