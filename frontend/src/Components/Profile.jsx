import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import profileActions from '../redux/actions/profileActions';
import petitionsActions from './../redux/actions/petitionsActions';
import { PostsProfile } from './PostsProfile';
import { ProfilePetitions } from './ProfilePetitions';
const Profile = (props) => {
    const [petitionsProfile, setPetitionsProfile ] = useState([])
    const [postsProfile, setPostsProfile] = useState([])
    const {lastName, name, profilePicture} = props.profileUser 
    useEffect(() => {
        props.getUsersById(props.match.params.id)
        props.getPetitions()
        setPetitionsProfile(props.petitions.filter(petition => petition.author[0].idUser === props.match.params.id))
        setPostsProfile(props.posts.filter(post => post.userId === props.match.params.id))
    }, [props.match.params.id])


    return (
        <>
        <div className="profilebanner mb-5">
            <div className="container d-flex flex-column align-items-center margin-negativo">
                <div className="profileInfoImg rounded-circle" style={{backgroundImage: `url(${profilePicture})`}}>
                    
                </div>
                <div className="h1">{name} {lastName}</div>
            </div>

        </div>
       
        <div className="container mt-5 p-5" >
            <div className="row p-5">
                {postsProfile.map(post => <div className="col-12 text-center"><PostsProfile post={post} /></div>)}
                <div className="lastArticlesCreated">
                    <h2>Petitions</h2>
                </div>
                {petitionsProfile.map(petition => <div className="col-12 text-center"><ProfilePetitions petition={petition} /></div>)}
            </div>
        </div> 
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profileUser: state.profileR.profileUser,
        petitions: state.petitionsR.allPetitions,
        posts: state.postR.allPosts
        };
    };

const mapDispatchToProps = {
        getUsersById: profileActions.getUsersById,
        getPetitions: petitionsActions.getPetitions
    }


    export default connect(mapStateToProps, mapDispatchToProps)(Profile);