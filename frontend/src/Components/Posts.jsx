import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";
import Post from "./Post";
import Swal from "sweetalert2";
import "../styles/community.css";
import { Button } from "reactstrap";
import { BsFillImageFill } from "react-icons/bs";

const Posts = (props) => {
  const [newPost, setNewPost] = useState({});
  const [pathImage, setPathImage] = useState("/assets/avatar.png");
  const [file, setFile] = useState();
  const [posts, setPosts] = useState([]);

  const { allPosts } = props; // Destructuración
  //ALERTAS LINDAS
  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };

  // Obtiene todos los posteos al montar el componente
  useEffect(() => {
    props.getPosts();
  }, []);

  // Esto sirve para re-renderizar el componente cuando se manda un nuevo posteo,
  // es decir, el useEffect se dispara nuevamente cada vez que allPosts cambia
  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  // Funcion para capturar un posteo nuevo.
  const captureNewPost = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setNewPost({
      ...newPost,
      [field]: value,
      token: props.loggedUser.token,
    });
  };

  // Funcion para capturar una subida de archivo de imagen
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
        errorAlert("error", "Oops!", "You must upload a valid image file");
      }
    }
  };

  // Funcion para validar y llamar a la action que añade un posteo nuevo
  const sendPost = (e) => {
    console.log(newPost.text.length);
    e.preventDefault();
    if (newPost.text.split(" ").length < 3 && newPost.text.length < 10) {
      errorAlert("error", "Oops!", "Text is too short! 😅");
    } else if (
      newPost.text.split(" ").length > 500 &&
      newPost.text.length > 700
    ) {
      errorAlert("error", "Oops!", "Text is too long! 😅");
    } else {
      e.preventDefault();
      props.addPost(newPost, file);
    }
  };

  return (
    <div>
      <div className="inputPostContainer">
        <div className="postsTextArea">
          <div className="profilePictureOnPostContainer">
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundImage: `url(${
                  props.loggedUser ? props.loggedUser.profilePicture : ""
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="profilePictureOnPost"
            ></div>
          </div>
          <textarea
            name="text"
            placeholder={`What's on your mind ${
              props.loggedUser ? props.loggedUser.name : ""
            } ?`}
            onChange={captureNewPost}
            className="w-100"
          />
        </div>
        <div className="filesPost">
          <label for="file-upload" class="custom-file-upload">
            <BsFillImageFill class="aiIcon upload" /> Upload Picture
          </label>
          <input id="file-upload" type="file" onChange={onFileChange} />
          <div
            style={{
              backgroundImage: `url(${pathImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="postPicturePreview"
          ></div>
          <Button onClick={sendPost}>Publish</Button>
        </div>
      </div>
      {posts &&
        posts.map((post) => {
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
