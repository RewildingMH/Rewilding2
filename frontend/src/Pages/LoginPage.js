import {NavLink} from "react-router-dom";
import {Button} from 'react-bootstrap'
import React, { useState } from 'react';
import Login from '../Components/Login'
import Register from '../Components/Register'


const LoginPage = () =>{
    const [show, setShow] = useState(true);
    return(
        <>
           <div className="container mt-4">
               <div className="row justify-content-center">
                   <div className="col-6 text-center">
                        {!show? <Register/>:<Login/> }
                        <Button variant="primary" className="admin_input mx-auto" onClick={() => {setShow(!show);}}>
                            {show ? 'Register' : 'Login'}
                        </Button>
                   </div>
               </div>
               <div className="row justify-content-center mt-3">
                    <div className="col-6 text-center">
                        <h3>We keep your email in a 100% secure way to:</h3>
                        <p className="h4">Identify your profile</p>
                        <p className="h4">Notify about new activities and itineraries</p>       
                        <p className="h4">Save itinerary history</p>       
                    </div>
                </div>
               <div className="row justify-content-center">
                    <div className="col-6 text-center">
                        <p className="h6">By registering you are accepting our Terms and Contitions and our Privacy Policies</p>
                    </div>
                </div>
           </div>
        </>
    )
}
export default LoginPage

