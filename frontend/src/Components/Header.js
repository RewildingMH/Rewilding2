import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux'
import React, { useState } from 'react'
import authActions from '../redux/actions/authActions'
import logo from '../assets/logoNuevo.png'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineLogout } from "react-icons/ai";



const Header = (props) => {
    window.onscroll = () => {
        window.scrollY > 300 ?
            document.querySelector('.navBar').classList.add('affix') :
            document.querySelector('.navBar').classList.remove('affix')
    }; 

    if (props.loggedUser === null) {
        var links = <>
            <NavLink to="/login" >
                <p>LOGIN</p>
            </NavLink>
        </>
    } else {
        if (props.loggedUser.rol === "admin") {
            var links = <>
                <NavLink to="/createPetition">
                    <p>CREATE PETITION</p>
                </NavLink>
                <NavLink to="/adminBlog">
                    <p>ADMIN BLOG</p>
                </NavLink>
                <NavLink to={`/profile/${props.loggedUser.userId}`} className="userHeaderLink">
                    <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                </NavLink>
                <NavLink to={`/profile/${props.loggedUser.userId}`}  className="userHeaderNamendLogOut">
                    <p>Hi! {props.loggedUser.name}</p>
                    <AiOutlineLogout className="logOut" onClick={() => props.logoutUser()}/>
                </NavLink>
            </>
        } else {
            var links =
                <>
                    <NavLink to="/createPetition">
                        <p>CREATE PETITION</p>
                    </NavLink>
                    <NavLink to={`/profile/${props.loggedUser.userId}`} className="userHeaderLink">
                        <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                    </NavLink>
                    <NavLink to={`/profile/${props.loggedUser.userId}`}  className="userHeaderNamendLogOut">
                        <p>Hi! {props.loggedUser.name}</p>
                        <AiOutlineLogout className="logOut" onClick={() => props.logoutUser()}/>
                    </NavLink>
                </>
        }

    }
    return (
        <>
            <nav className="navBar">
                <div className="logo">
                    <NavLink to="/">
                        <div style={{ backgroundImage: `url(${logo})` }} className="logoDiv"></div>
                    </NavLink>
                </div>
                <div className="pages">
                    <NavLink exact to="/">
                        <p>HOME</p>
                    </NavLink>
                    <NavLink to="/blog">
                        <p>BLOG</p>
                    </NavLink>
                    <NavLink to="/community">
                        <p>COMMUNITY</p>
                    </NavLink>
                    <NavLink to="/petitions">
                        <p>PETITIONS</p>
                    </NavLink>
                    {links}
                </div>
            </nav>
        </>
    )

}

const mapStateToProps = state => {
    return {
        loggedUser: state.authR.loggedUser
    }
}

const mapDispatchToProps = {
    logoutUser: authActions.logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
