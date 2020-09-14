import styled from 'styled-components';

const StyledSideBar = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh !important;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);

  #sidebar-wrapper{
    min-height: 100vh !important;
    width: 100vw;
    margin-left: -1rem;
    -webkit-transition: margin .25s ease-out;
    -moz-transition: margin .25s ease-out;
    -o-transition: margin .25s ease-out;
    transition: margin .25s ease-out;
  }
  #sidebar-wrapper .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
`;

export default StyledSideBar;