import { NavLink, Link } from "react-router-dom";
import React, { useState } from 'react';
import Login from '../Components/Login'
import Register from '../Components/Register'
import bannerLogIn from "../assets/bannerLogIn.png"


const LoginPage = () => {
    const [show, setShow] = useState(true);
    return (
        <>
            <div className="communityBanner" style={{ backgroundImage: `url(${bannerLogIn})`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 text-center">
                        {!show ? <Register /> : <Login />}
                        <button onClick={() => { setShow(!show); }} className="btnLog">
                            {show ? 'Register' : 'Login'}
                        </button>
                    </div>
                </div>
                {/* <div className="row justify-content-center mt-3">
                     
                    <div className="textMail">
                        <p>We keep your email in a 100% secure way to:</p>
                        <p>Identify your profile</p>
                        <p>Notify you about new petitions</p>
                        <p>Keep you updated about your petitions's status</p>
                    </div>
                </div> */}
                <div className="row justify-content-center">
                    <div className="col-6 text-center">
                        <p className="h6">By registering you are accepting our Terms and Conditions and our Privacy Policies</p>
                    </div>
                </div>

                <Link to="/"><p style={{width:"10vw", display: "inline"}}>Return to home</p></Link>
            </div>
        </>
    )
}
export default LoginPage

