import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function SideNav() {
  const navigate = useNavigate();
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'underline' : 'none',
      color: isActive ? '#ffb81c' : 'white',
      fontSize: isActive ? '21px' : '16px',
    };
  };
  return (
    <>
      <div id='layoutSidenav_nav'>
        <nav
          className='sb-sidenav accordion sb-sidenav-dark bg-red-500'
          id='sidenavAccordion'
        >
          <div className='sb-sidenav-menu'>
            <div className='nav'>
              <NavLink className='nav-link' to='/' style={navLinkStyles}>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-tachometer-alt'></i>
                </div>
                Dashboard
              </NavLink>
              <NavLink className='nav-link' to='/create' style={navLinkStyles}>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-tachometer-alt'></i>
                </div>
                Create Receipt
              </NavLink>
              <NavLink className='nav-link' to='/filter' style={navLinkStyles}>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-tachometer-alt'></i>
                </div>
                Filter Receipt
              </NavLink>
              <NavLink className='nav-link' to='/logout'>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-tachometer-alt'></i>
                </div>
                Log Out
              </NavLink>
            </div>
          </div>
          <div className='sb-sidenav-footer'>
            <div className='small'>Logged in as: Admin</div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SideNav;
