import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

const Header = () => (
    <Nav>
        <Nav.Item>
            <Nav.Link>
                <Link to="/">Home</Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link>
                <Link to="/login">Login</Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
            Disabled
            </Nav.Link>
        </Nav.Item>
    </Nav>
)

export default Header;