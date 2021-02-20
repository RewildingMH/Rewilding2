import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import "../styles/burgerMenu.css";
import {
  AiFillHome,
  AiFillRead,
  AiFillLayout,
  AiFillSmile,
  AiFillProfile,
  AiFillSetting,
} from "react-icons/ai";

import { NavLink } from "react-router-dom";

const BurgerMenu = (props) => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(!open);
  };

  return (
    <Menu isOpen={open} right>
      <div className="sideBarTitle">
        <h2>Menu</h2>
      </div>
      <NavLink to="/" onClick={closeMenu}>
        <div id="home" className="menu-item" href="/">
          <div className="iconMenu">
            <AiFillHome />
          </div>
          <div className="optionMenu">Home</div>
        </div>
      </NavLink>
      <NavLink to="/blog" onClick={closeMenu}>
        <div id="blog" className="menu-item" href="/">
          <div className="iconMenu">
            <AiFillRead />
          </div>
          <div className="optionMenu">Blog</div>
        </div>
      </NavLink>
      <NavLink to="/community" onClick={closeMenu}>
        <div id="community" className="menu-item" href="/">
          <div className="iconMenu">
            <AiFillLayout />
          </div>
          <div className="optionMenu">Community</div>
        </div>
      </NavLink>
      <NavLink to="/petitions" onClick={closeMenu}>
        <div id="petitions" className="menu-item" href="/">
          <div className="iconMenu">
            <AiFillSmile />
          </div>
          <div className="optionMenu">Petitions</div>
        </div>
      </NavLink>
      <NavLink to="/createPetition" onClick={closeMenu}>
        <div id="createPetition" className="menu-item" href="/">
          <div className="iconMenu">
            <AiFillProfile />
          </div>
          <div className="optionMenu">Create a petition</div>
        </div>
      </NavLink>
      <NavLink
        to={`/profile/${
          props.props.loggedUser ? props.props.loggedUser.userId : ""
        }`}
        onClick={closeMenu}
      >
        <div id="profile" className="menu-item" href="/">
          <div className="iconMenu">
            <AiFillSetting />
          </div>
          <div className="optionMenu">Profile</div>
        </div>
      </NavLink>
    </Menu>
  );
};

export default BurgerMenu;
