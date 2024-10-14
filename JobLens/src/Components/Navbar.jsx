import React from 'react';
import "./Navbar.css";
import logo from "../Utils/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <div className="nav_div">
        <div className="logo_div">
          <img src = {logo}></img>
        </div>

        <div className="navPages_div">
            <ul className="ulPages_div">
                <li><a>Dashboard</a></li>
                <li><a>Others</a></li>
            </ul>
        </div>

        <div className="user_div">
          <AccountCircleIcon sx={{ fontSize: 50 }} />
        </div>

    </div>
  )
}

export default Navbar