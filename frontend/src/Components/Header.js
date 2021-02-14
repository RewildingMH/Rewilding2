import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux'
import React, { useState } from 'react'
import authActions from '../redux/actions/authActions'



const Header = (props) => {
    const [show, setShow] = useState(true);
    const logo = "./assets/logo.png"
    if (props.loggedUser === null) {
        var links = <>
            <NavLink to="/login" >
                <div>Login</div>
            </NavLink>
            <NavLink to="/petitions">
                <div>Petitions</div>
            </NavLink>
        </>
    } else {
        var links =
            <>
                <Link>
                    <img src={props.loggedUser.profilePicture} alt="profile" />
                    <div>
                        <div onClick={() => { setShow(!show); }}>
                            {props.loggedUser.name}
                        </div>
                    </div>
                </Link>
                <Link to="/createPetition">
                    <div>
                        <div>Create a petition</div>
                    </div>
                </Link>
                {!show &&
                    <ul>
                        <li>Profile</li>
                        <li >Upgrades</li>
                        <li onClick={() => props.logoutUser()} >LogOut</li>
                    </ul>}
            </>
    }
    return (
        <>
            <nav>
                <div >
                    <div >
                        <NavLink to="/" >
                            <div style={{ backgroundImage: `url(${logo})`, width: "7vw", height: "10vh", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                        </NavLink>
                    </div>
                    <div id="mainListDiv" >
                        <ul>
                            <li>
                                <NavLink to="/">
                                    <div>
                                        <div>Home</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/petitions">
                                    <div>
                                        <div>Explore</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog">
                                    <div>
                                        <div>Blog</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                {links}
                            </li>
                        </ul>
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
