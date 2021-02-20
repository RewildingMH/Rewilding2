import { NavLink, Link } from "react-router-dom";
import React, { useState } from 'react';
import Login from '../Components/Login'
import Register from '../Components/Register'
import bannerLogIn from "../assets/bannerLog.png"
import { FaArrowCircleLeft } from 'react-icons/fa';
import arrow from '../assets/arrow1.png'

const LoginPage = () => {
    const [show, setShow] = useState(true);
    return (
        <>
            <div className="logInBanner" style={{ backgroundImage: `url(${bannerLogIn})`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
            <div className="container col-8 my-5 containerLog" >
                <div className="row justify-content-center">
                    <div className="col-8 text-center">
                        {!show ? <Register /> : <Login />}
                        <button onClick={() => { setShow(!show); }} className="btnReg">
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
                    <div className="col-8 text-center textLog">
                        <p className="h6">By registering you are accepting our Terms and Conditions and our Privacy Policies</p>
                    </div>
                </div>
                <Link to="/" style={{marginBottom:"2vh", display:"flex", flexDirection:"column", alignItems:"center"}}><img src={arrow} style={{width:"30px"}}></img><p>Return Home</p></Link>
            </div>
            <div className="white">
            </div>
        </>
    )
}
export default LoginPage

