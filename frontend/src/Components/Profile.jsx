import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import profileActions from "../redux/actions/profileActions";
import petitionsActions from "../redux/actions/petitionsActions";
import Footer from "./Footer";
import { PostsProfile } from "./PostsProfile";
import { ProfilePetitions } from "./ProfilePetitions";
import postActions from "../redux/actions/postActions";

const Profile = (props) => {
  const [petitionsProfile, setPetitionsProfile] = useState([]);
  const [postsProfile, setPostsProfile] = useState([]);
  const [preloader, setPreloader] = useState(true);
  const { lastName, name, profilePicture } = props.profileUser;

  const { posts } = props;

  useEffect(() => {
    fetch();
    setPetitionsProfile(
      props.petitions.filter(
        (petition) => petition.author[0].idUser === props.match.params.id
      )
    );
    setPostsProfile(
      posts.filter((post) => post.userId === props.match.params.id)
    );
  }, [props.match.params.id, posts]);

  async function fetch() {
    await props.getPosts();
    await props.getUsersById(props.match.params.id);
    await props.getPetitions();
    setPreloader(false);
  }

  return (
    <>
      {preloader ? (
        <div className="preloader">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="profilebanner mb-5">
            <div className="container d-flex flex-column align-items-center margin-negativo">
              <div
                className="profileInfoImg rounded-circle"
                style={{ backgroundImage: `url(${profilePicture})` }}
              ></div>
              <div className="h1">
                {name} {lastName}
              </div>
            </div>
          </div>
          <div className="container mt-5 p-5">
            <div className="row p-5">
              {postsProfile.length > 0 ? (
                <>
                  <div className="lastArticlesCreated">
                    <h2>Posts</h2>
                  </div>
                  {postsProfile.map((post) => (
                    <div className="col-12 text-center">
                      <PostsProfile post={post} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="lastArticlesCreated">
                  <h2>No Posts</h2>
                </div>
              )}
              {petitionsProfile.length > 0 ? (
                <>
                  <div className="lastArticlesCreated">
                    <h2>Petitions</h2>
                  </div>
                  {petitionsProfile.map((petition) => (
                    <div className="col-12 text-center">
                      <ProfilePetitions petition={petition} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="lastArticlesCreated">
                  <h2>No Petitions</h2>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    profileUser: state.profileR.profileUser,
    petitions: state.petitionsR.allPetitions,
    posts: state.postR.allPosts,
  };
};

const mapDispatchToProps = {
  getUsersById: profileActions.getUsersById,
  getPetitions: petitionsActions.getPetitions,
  getPosts: postActions.getPosts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
