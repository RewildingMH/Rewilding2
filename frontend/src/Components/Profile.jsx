import React, {useEffect} from 'react'
import { connect } from "react-redux";
import profileActions from '../redux/actions/profileActions';
//6029350efdc51a222466912d
const Profile = (props) => {
    const {country, lastName, name, profilePicture, rol, username} = props.profileUser
    useEffect(() => {
        props.getUsersById(props.match.params.id)
    }, [])

    return (
        <>
        <div className="profilebanner">
            <button>Edit Banner</button>
        </div>
        <h2 className="text-center mt-4">Profile Options</h2>
        <div className="profileContainer container">
            <div className="profileInfo">
                <div className="nameInfo">Name: {name}</div>
                <div className="profileInfoImg" style={{
                    backgroundImage: `url(${profilePicture})`
                }}>
                    <button>Change Img</button>
                </div>
                <div className="userNameInfo">Email: {username}</div>
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
        profileUser: state.profileR.profileUser
        };
    };

const mapDispatchToProps = {
        getUsersById: profileActions.getUsersById
    }


    export default connect(mapStateToProps, mapDispatchToProps)(Profile);