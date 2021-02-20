import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../styles/burgerMenu.css";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUserCircle,
  FaCity,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

class BurgerMenu extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu width="250px" right>
        <div className="sideBarTitle">
          <h2>Menu</h2>
        </div>
        <NavLink to="/">
          <div id="home" className="menu-item" href="/">
            <div className="iconMenu">
              <FaHome />
            </div>
            <div className="optionMenu">Home</div>
          </div>
        </NavLink>
        <NavLink to="/cities">
          <div id="cities" className="menu-item">
            <div className="iconMenu">
              <FaCity />
            </div>
            <div className="optionMenu">Cities</div>
          </div>
        </NavLink>
        <NavLink to="/about">
          <div id="about" className="menu-item" href="/about">
            <div className="iconMenu">
              <FaInfoCircle />
            </div>
            <div className="optionMenu">About</div>
          </div>
        </NavLink>
        <NavLink to="/contact">
          <div id="contact" className="menu-item">
            <div className="iconMenu">
              <FaEnvelope />
            </div>
            <div className="optionMenu">Contact</div>
          </div>
        </NavLink>
        <NavLink to="/login">
          <div id="contact" className="menu-item">
            <div className="iconMenu">
              <FaUserCircle />
            </div>
            <div className="optionMenu">Log In</div>
          </div>
        </NavLink>
      </Menu>
    );
  }
}

export default BurgerMenu;
