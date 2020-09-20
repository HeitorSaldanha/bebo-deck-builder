import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/auth-options';

const TopNav = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand as={Link} to="/">
      Bebo Deck Builder
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <AuthOptions />
    </Navbar.Collapse>
  </Navbar>
);

export default TopNav;
