import React from 'react';
import StyledSideBar from './Style'
import {Nav} from 'react-bootstrap';
//import { withRouter } from 'react-router';

const Sidebar = props => {


    return (
      <StyledSideBar
        className='col-md-12 d-none d-md-block bg-light sidebar'
        activeKey='/home'
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
            <div className='sidebar-sticky'></div>
        <Nav.Item>
            <Nav.Link href='/home'>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey='link-1'>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey='link-2'>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey='disabled' disabled>
            Disabled
            </Nav.Link>
        </Nav.Item>
      </StyledSideBar>
    );
  };
  //const Sidebar = withRouter(Side);
  export default Sidebar