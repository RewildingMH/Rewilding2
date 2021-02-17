import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";
import Post from "./Post";

const Posts = (props) => {
  const [newPost, setNewPost] = useState({});
  const [pathImage, setPathImage] = useState("/assets/avatar.png");
  const [file, setFile] = useState();
  const [posts, setPosts] = useState([]);
  const { allPosts } = props;

  useEffect(() => {
    props.getPosts();
  }, []);
  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  const captureNewPost = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setNewPost({
      ...newPost,
      [field]: value,
      token: props.loggedUser.token,
    });
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load() {
          setPathImage(reader.result);
        };
        setFile(file);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  const sendPost = (e) => {
    e.preventDefault();
    if (newPost.text.length < 1 || newPost.text.length > 300) {
      alert("no pasa");
    } else {
      e.preventDefault();
      props.addPost(newPost, file);
    }
  };

  return (
    <div>
      <div>
        <div className="fotoNombrePosts">
          <div>foto</div>
          <div>nombre</div>
        </div>
        <div className="postsTextArea">
          <textarea
            name="text"
            placeholder="What's on your mind"
            onChange={captureNewPost}
          />
        </div>
        <div className="filesPost">
          <input type="file" onChange={onFileChange} />
          <img
            className="img-fluid profile-pic-profile-submit"
            src={pathImage}
            alt="petition-pic"
            style={{ width: "100px", height: "100px" }}
          />
          <button onClick={sendPost}>Publish</button>
        </div>
      </div>
      {props.allPosts &&
        props.allPosts.map((post) => {
          return <Post post={post} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
    allPosts: state.postR.allPosts,
  };
};

const mapDispatchToProps = {
  addPost: postActions.addPost,
  getPosts: postActions.getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
