import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => (
  <div className='nav-bar flex-col outline'>
    <Link to="/users" className='nav-link'>Users</Link>
    <Link to="/users/login" className='nav-link'>About</Link>
  </div>
);

export default NavBar;