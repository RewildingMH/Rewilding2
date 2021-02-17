import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux'
import React, { useState } from 'react'
import authActions from '../redux/actions/authActions'
import logo from '../assets/logo2.png'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



const Header = (props) => {
    window.onscroll = () => {
        window.scrollY > 100 ?
            document.querySelector('.navBar').classList.add('affix') :
            document.querySelector('.navBar').classList.remove('affix')
    };
    if (props.loggedUser === null) {
        var links = <>
                <NavLink to="/login" >
                    <div><p>Login</p></div>
                </NavLink>
                <NavLink to="/petitions">
                    <div><p>Petitions</p></div>
                </NavLink>
        </>
        //ACA TIENE Q IR ELSE IF Q PREGUNTE SI EL USUARIO LOGUEADO ES ADMIN, SI ES ADMIN LE MUESTRO EL NAVLINK CON LA RUTA ADMINBLOG, SI NO ES ADMIN LE MUESTRO LOS LINKS DEL USUARIO LOGUEADO COMUN
    } else {
        var links =
            <>
                <Link to="/createPetition">
                    <div>
                        <div className="createPetition"><p>Create a petition</p></div>
                    </div>
                </Link>
                <Link to="/adminBlog">
                    <div>
                        <div className="adminBlog"><p>Admin Blog</p></div>
                    </div>
                </Link>
                <div className="userHeader">
                    <Link to="/" className="userHeaderLink">
                        <img src={props.loggedUser.profilePicture} alt="profile" className="userImg" />
                    </Link>
                    <Dropdown className="drop">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {props.loggedUser.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropMenu">
                            <Dropdown.Item href="#/action-1"><p>Profile</p></Dropdown.Item>
                            <Dropdown.Item href="#/action-2"><p>Upgrades</p></Dropdown.Item>
                            <Dropdown.Item href="#/action-3"><p onClick={() => props.logoutUser()}>Log Out</p></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </>
    }
    return (
        <>
            <nav className="navBar">
                <div className="mainListDiv">
                    <div>
                        <NavLink to="/">
                            <div style={{ backgroundImage: `url(${logo})` }} className="logoDiv"></div>
                        </NavLink>
                    </div>
                    <div id="mainListDiv" className="navContainer" >
                        <div className="navsDiv">
                            <NavLink to="/">
                                <div>
                                    <div><p>Home</p></div>
                                </div>
                            </NavLink>
                            <NavLink to="/petitions">
                                <div><p>Petitions</p></div>
                            </NavLink>
                            <NavLink to="/blog">
                                <div>
                                    <p>Blog</p>
                                </div>
                            </NavLink>
                            {links}        
                        </div>
                        
                    </div>
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
