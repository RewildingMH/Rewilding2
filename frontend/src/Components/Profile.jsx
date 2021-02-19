import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import profileActions from '../redux/actions/profileActions';
import petitionsActions from './../redux/actions/petitionsActions';
import { ProfilePetitios } from './ProfilePetitios';
const Profile = (props) => {
    const [petitionsProfile, setPetitionsProfile ] = useState([])
    const {lastName, name, profilePicture, username} = props.profileUser 
    useEffect(() => {
        props.getUsersById(props.match.params.id)
        props.getPetitions()
        setPetitionsProfile(props.petitions.filter(petition => petition.author[0].idUser === props.match.params.id))
    }, [props.match.params.id])

    console.log(petitionsProfile)
    return (
        <>
        <div className="profilebanner">
            <div className="container d-flex flex-column align-items-center margin-negativo">
                <div className="profileInfoImg rounded-circle" style={{backgroundImage: `url(${profilePicture})`}}>
                    
                </div>
                <div className="h1">{name} {lastName}</div>
            </div>

        </div>
        <div className="container">               
            {petitionsProfile.map(petition => <div className="petitionsContent"><ProfilePetitios petition={petition} /></div>)}
        </div> 
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profileUser: state.profileR.profileUser,
        petitions: state.petitionsR.allPetitions
        };
    };

const mapDispatchToProps = {
        getUsersById: profileActions.getUsersById,
        getPetitions: petitionsActions.getPetitions
    }


    export default connect(mapStateToProps, mapDispatchToProps)(Profile);