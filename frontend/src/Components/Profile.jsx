import React from 'react'
import { connect } from "react-redux";

const Profile = (props) => {
    console.log(props.loggedUser)
    return (
        <>
        <div className="profilebanner">
            <button>Edit Banner</button>
        </div>
        <h2 className="text-center mt-4">Profile Options</h2>
        <div className="profileContainer container">
            <div className="profileInfo">
                <div className="nameInfo">Name: {props.loggedUser.name}</div>
                <div className="profileInfoImg" style={{
                    backgroundImage: `url(${props.loggedUser.profilePicture})`
                }}>
                    <button>Change Img</button>
                </div>
                <div className="userNameInfo">Email: {props.loggedUser.username}</div>
            </div>
            <div className="changePassword">Forget your password?</div>
            <div className="adicionalInfo">
                <div>Miembro desde</div>
                <div>Género, edad</div>
                <div>numero de telefono</div>
            </div>
            <div className="petandblogs">
                <div className="perfilContent">contenido perfil</div>
                <div className="petitionsContent">peticiones creadas</div>
                <div className="blogsContent">articulos en el blog creados</div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.authR.loggedUser,
        };
    };

    export default connect(mapStateToProps, null)(Profile);