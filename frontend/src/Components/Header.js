import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux'
import React, { useState } from 'react'
import authActions from '../redux/actions/authActions'
import logo from '../assets/logo2.png'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



const Header = (props) => {
    window.onscroll = () => {
        window.scrollY > 300 ?
            document.querySelector('.navBar').classList.add('affix') :
            document.querySelector('.navBar').classList.remove('affix')
    }; 
    if (props.loggedUser === null) {
        var links = <>
            <NavLink to="/login" >
                <p>Login</p>
            </NavLink>
        </>
    } else {
        if (props.loggedUser.rol === "admin") {
            var links = <>
                <NavLink to="/createPetition">
                    <p>Create a petition</p>
                </NavLink>
                <NavLink to="/adminBlog">
                    <p>Admin Blog</p>
                </NavLink>
                <NavLink to="/" className="userHeaderLink">
                    <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                </NavLink>
                <Dropdown className="drop">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {props.loggedUser.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropMenu">
                        <Dropdown.Item ><Link to="/profile" className="profileDrop">Profile</Link></Dropdown.Item>
                        <Dropdown.Item >Upgrades</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.logoutUser()} className="logOutDrop">Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        } else {
            var links =
                <>
                    <NavLink to="/createPetition">
                        <p>Create a petition</p>
                    </NavLink>
                    <NavLink to="/" className="userHeaderLink">
                        <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                    </NavLink>
                    <Dropdown className="drop">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {props.loggedUser.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropMenu">
                            <Dropdown.Item ><Link to="/profile" className="profileDrop">Profile</Link></Dropdown.Item>
                            <Dropdown.Item >Upgrades</Dropdown.Item>
                            <Dropdown.Item onClick={() => props.logoutUser()} className="logOutDrop">Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                    <NavLink to="/">
                        <p>Home</p>
                    </NavLink>
                    <NavLink to="/blog">
                        <p>Blog</p>
                    </NavLink>
                    <NavLink to="/community">
                        <p>Community</p>
                    </NavLink>
                    <NavLink to="/petitions">
                        <p>Petitions</p>
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
