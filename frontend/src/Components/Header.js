import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux'
import React, { useState } from 'react'
import authActions from '../redux/actions/authActions'
import logo from '../assets/logoNuevo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoSignOut } from "react-icons/go";
import BurgerMenu from "./BurgerMenu";
import { Nav } from "react-bootstrap";



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
                    <p className="createPetitionP">CREATE PETITION</p>
                </NavLink>
                <NavLink to="/adminBlog">
                    <p>ADMIN BLOG</p>
                </NavLink>
                <NavLink to={`/profile/${props.loggedUser.userId}`} className="userHeaderLink">
                    <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                    <h6>Hi! {props.loggedUser.name}</h6>
                </NavLink>
                <NavLink to="/">
                    <GoSignOut className="logOut" onClick={() => props.logoutUser()} />
                </NavLink>

            </>
        } else {
            var links =
                <>
                    <NavLink to="/createPetition">
                        <p style={{ whiteSpace: "nowrap" }}>CREATE PETITION</p>
                    </NavLink>
                    <NavLink to={`/profile/${props.loggedUser.userId}`} className="userHeaderLink">
                        <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                        <h6>Hi! {props.loggedUser.name}</h6>
                    </NavLink>
                    <NavLink to="/">
                        <GoSignOut className="logOut" onClick={() => props.logoutUser()} />
                    </NavLink>
                </>
        }

    }
    return (
        <>
            <nav className="navBar">
                <div className="logo">
                    <NavLink to="/" className="headerLogondSlogan">
                        <div style={{ backgroundImage: `url(${logo})` }} className="logoDiv"></div>
                        <h6><b style={{
                            color: "#75a146"
                        }}>R E W I L D I N G</b> | a place for the planet</h6>
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
            <BurgerMenu props={props} />
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
