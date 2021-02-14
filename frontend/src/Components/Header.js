import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux'
import React, { useState } from 'react'
import authActions from '../redux/actions/authActions'
import logo from '../assets/logo2.png'



const Header = (props) => {
    const [show, setShow] = useState(true);
    if (props.loggedUser === null) {
        var links = <>
            <NavLink to="/login" >
                <div><p>Login</p></div>
            </NavLink>
            <NavLink to="/petitions">
                <div><p>Petitions</p></div>
            </NavLink>
            <div>
                <div><p>Blog</p></div>
            </div>
        </>
    } else {
        var links =
            <>
                <Link to="/createPetition">
                    <div>
                        <div><p>Create a petition</p></div>
                    </div>
                </Link>
                <div>
                    <div><p>Blog</p></div>
                </div>
                <Link>
                    <img src={props.loggedUser.profilePicture} alt="profile" />
                    <div>
                        <div onClick={() => { setShow(!show); }}>
                            {props.loggedUser.name}
                        </div>
                    </div>
                </Link>
                {!show &&
                    <ul>
                        <li><p>Profile</p></li>
                        <li ><p>Upgrades</p></li>
                        <li onClick={() => props.logoutUser()} >LogOut</li>
                    </ul>}

            </>
    }
    return (
        <>
            <nav>
                <div className="mainListDiv">
                    <div >
                        <NavLink to="/" >
                            <div style={{ backgroundImage: `url(${logo})`, width: "9vw", height: "14vh", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                        </NavLink>
                    </div>
                    <div id="mainListDiv" className="navsDiv" >
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <div className="navsDiv">
                                <NavLink to="/">
                                    <div>
                                        <div><p>Home</p></div>
                                    </div>
                                </NavLink>

                                <NavLink to="/petitions">
                                    <div>
                                        <div><p>Explore</p></div>
                                    </div>
                                </NavLink>
                                {links}
                            </div>
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
