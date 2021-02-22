import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";
import Post from "./Post";
import Swal from "sweetalert2";
import "../styles/community.css";
import { Button } from "reactstrap";
import { BsFillImageFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";

const Posts = (props) => {
  const [newPost, setNewPost] = useState({});
  const [pathImage, setPathImage] = useState("");
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

  const history = useHistory();

  // Funcion para capturar un posteo nuevo.
  const captureNewPost = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    if (!props.loggedUser) {
      Swal.fire({
        title: "Oops!",
        text: "You must be logged in to post!",
        icon: "warning",
        confirmButtonColor: "#c1866a",
        confirmButtonText: "Log me in!",
        background: "#4b98b7",
        iconColor: "white",
        backdrop: "rgba(80, 80, 80, 0.3)",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
      e.target.value = "";
    } else {
      setNewPost({
        ...newPost,
        [field]: value,
        token: props.loggedUser.token,
      });
    }
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

  const successToast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // Funcion para validar y llamar a la action que añade un posteo nuevo
  const sendPost = (e) => {
    e.preventDefault();
    console.log('aca ando')
    if (!props.loggedUser) {
      Swal.fire({
        title: "Oops!",
        text: "You must be logged in to post!",
        icon: "warning",
        confirmButtonColor: "#c1866a",
        confirmButtonText: "Log me in!",
        background: "#4b98b7",
        iconColor: "white",
        backdrop: "rgba(80, 80, 80, 0.3)",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
      e.target.value = "";
      setPathImage("")
      setFile("");
      return;
      
    }
    if (!newPost.text) {
      errorAlert(
        "error",
        "Oops!",
        "You must include some text in your post first! 😅"
      );
      return;
    }
    if (newPost.text.split(" ").length < 3 && newPost.text.length < 10) {
      errorAlert("error", "Oops!", "Text is too short! 😅");
    } else if (
      newPost.text.split(" ").length > 500 &&
      newPost.text.length > 700
    ) {
      errorAlert("error", "Oops!", "Text is too long! 😅");
    } else {
      document.getElementById("postText").value = "";
      successToast.fire({
        icon: "success",
        title: "Post uploaded",
      });
      e.preventDefault();
      props.addPost(newPost, file);
    }
  };

  const resetFile = () => {
    setPathImage("");
    setFile("");
  };

  return (
    <div className="inputPostContainerContainer">
      <div className="inputPostContainer">
        <div className="postsTextArea">
          <div className="profilePictureOnPostContainer">
            <Link
              to={`/profile/${props.loggedUser ? props.loggedUser.userId : ""}`}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: `url(${
                    props.loggedUser
                      ? props.loggedUser.profilePicture
                      : "/assets/profilePictures/panda-avatar.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="profilePictureOnPost"
              ></div>
            </Link>
          </div>
          <textarea
            name="text"
            placeholder={`What's on your mind ${
              props.loggedUser ? props.loggedUser.name : ""
            } ?`}
            onChange={captureNewPost}
            id="postText"
            className="w-100 textareaPost"
          />
        </div>
        <div className="filesPost">
          <label htmlFor="file-upload" className="custom-file-upload">
            <BsFillImageFill className="aiIcon upload" /> Upload Picture
          </label>
          <input id="file-upload" type="file" onChange={onFileChange} />
          {pathImage === "" ? null : (
            <>
              <div
                style={{
                  backgroundImage: `url(${pathImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="postPicturePreview"
              ></div>
              <MdCancel
                onClick={() => resetFile()}
                style={{ color: "red", fontSize: "21px", cursor: "pointer" }}
              />
            </>
          )}

          <Button
            onClick={sendPost}
            color="success"
            style={{
              padding: " 0.2rem 3rem",
              fontSize: "27px",
              fontWeight: "500",
            }}
          >
            Publish
          </Button>
        </div>
      </div>
      {posts &&
        posts
          .map((post) => {
            return <Post key={post._id} post={post} />;
          })
          .reverse()}
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
