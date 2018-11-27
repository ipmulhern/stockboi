import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';
import { AccessLevel } from '../Enums/AccessLevel.js';

export class NavMenu extends Component {
  displayName = NavMenu.name
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Stockboi</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                Current Stock
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/Orders'} exact>
              <NavItem>
                Orders
              </NavItem>
            </LinkContainer>
            {(AccessLevel[this.props.permissionLevel] === 'Manager' 
            || AccessLevel[this.props.permissionLevel] === 'Admin')
            &&<LinkContainer to={'/StockAdmin'} exact>
              <NavItem>
                Stock Admin
              </NavItem>
            </LinkContainer>}
            {(AccessLevel[this.props.permissionLevel] === 'Manager' 
            || AccessLevel[this.props.permissionLevel] === 'Admin')
            &&<LinkContainer to={'/UserAdmin'} exact>
              <NavItem>
                User Admin
              </NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
