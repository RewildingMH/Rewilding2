import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";

const Posts = (props) => {
  const [newPost, setNewPost] = useState({});
  const [pathImage, setPathImage] = useState("/assets/avatar.png");
  const [file, setFile] = useState();

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
    props.addPost(newPost, file);
  };

  return (
    <div>
      <div>
        <div>
          <div>foto</div>
          <div>nombre</div>
        </div>
        <div>
          <textarea
            name="text"
            placeholder="What's on your mind"
            onChange={captureNewPost}
          />
        </div>
        <div>
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
      {/* mapeo de posts posts.map((post) => <div>posteo<div/>) */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  addPost: postActions.addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
