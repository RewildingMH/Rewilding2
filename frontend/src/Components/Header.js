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
<<<<<<< HEAD
                <NavLink to="/login" >
                    <div><p>Login</p></div>
                </NavLink>
                <NavLink to="/petitions">
                    <div><p>Petitions</p></div>
                </NavLink>
=======
            <NavLink to="/login" >
                <p>Login</p>
            </NavLink>
>>>>>>> be13023fe8aee4e0dd26d0a646fb4218a00d18f7
        </>
        //ACA TIENE Q IR ELSE IF Q PREGUNTE SI EL USUARIO LOGUEADO ES ADMIN, SI ES ADMIN LE MUESTRO EL NAVLINK CON LA RUTA ADMINBLOG, SI NO ES ADMIN LE MUESTRO LOS LINKS DEL USUARIO LOGUEADO COMUN
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
<<<<<<< HEAD
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
=======
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
>>>>>>> be13023fe8aee4e0dd26d0a646fb4218a00d18f7
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
