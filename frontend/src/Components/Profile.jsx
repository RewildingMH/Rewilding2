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

    console.log(postsProfile)
    return (
        <>
        <div className="profilebanner">
            <div className="container d-flex flex-column align-items-center margin-negativo">
                <div className="profileInfoImg rounded-circle" style={{backgroundImage: `url(${profilePicture})`}}>
                    
                </div>
                <div className="h1">{name} {lastName}</div>
            </div>

        </div>
       
        <div className="profileContainer container">
            <div className="petandblogs">
                {postsProfile.map(post => <div><PostsProfile post={post} /></div>)}
                {petitionsProfile.map(petition => <div className="petitionsContent"><ProfilePetitions petition={petition} /></div>)}
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