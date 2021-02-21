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
import { GoSignOut, GoSignIn } from "react-icons/go";
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const BurgerMenu = (props) => {
  console.log(props.props);
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(!open);
  };
  if (props.props.loggedUser) {
    var links = (
      <>
        <NavLink
          to={`/profile/${props.props.loggedUser.userId}`}
          className="userLinkBurger"
        >
          <img
            src={props.props.loggedUser.profilePicture}
            alt="profile"
            className="userImg"
          />
          <h6>Hi! {props.props.loggedUser.name}</h6>
        </NavLink>
        <NavLink to="/" onClick={closeMenu}>
          <div id="logOut" className="menu-item" href="/">
            <div className="iconMenu">
              <GoSignOut
                className="logOutIconBurger"
                onClick={() => props.logoutUser()}
              />
            </div>
            <div className="optionMenu" onClick={() => props.logoutUser()}>
              LogOut
            </div>
          </div>
        </NavLink>
      </>
    );
  }
  if (props.props.loggedUser === null) {
    var login = (
      <>
        <NavLink to="/login" onClick={closeMenu}>
          <div id="login" className="menu-item" href="/">
            <div className="iconMenu">
              <GoSignIn />
            </div>
            <div className="optionMenu">Login</div>
          </div>
        </NavLink>
      </>
    );
  }

  return (
    <Menu isOpen={open} right>
      <div className="sideBarTitle">
        <h2>Menu</h2>
      </div>
      {links}
      {login}
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
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  logoutUser: authActions.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
