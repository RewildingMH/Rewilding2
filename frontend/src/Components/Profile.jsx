import React, {useEffect} from 'react'
import { connect } from "react-redux";
import profileActions from '../redux/actions/profileActions';
const Profile = (props) => {
    const {lastName, name, profilePicture, username} = props.profileUser
    useEffect(() => {
        props.getUsersById(props.match.params.id)
    }, [])

    return (
        <>
        <div className="profilebanner">
            <div className="container d-flex flex-column">
                <div className="profileInfoImg" style={{backgroundImage: `url(${profilePicture})`}}>
                    
                </div>
                <div className="h1">{name} {lastName}</div>
            </div>

        </div>
       
        <div className="profileContainer container">
            <div className="petandblogs">
                <div className="perfilContent">contenido perfil</div>
                <div className="petitionsContent">peticiones creadas</div>
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