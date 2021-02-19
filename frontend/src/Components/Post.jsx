import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";
import PostComment from "./PostComment";
import Compressor from "compressorjs";
import Swal from "sweetalert2";

const Post = ({
  post,
  loggedUser,
  newComment,
  sendLikePost,
  sendDislikePost,
  submitPostModification,
  removePost,
}) => {
  const [comment, setComment] = useState({});
  const [postModification, setPostModification] = useState({});
  const [visible, setVisible] = useState(false);
  const [pathImage, setPathImage] = useState("/assets/avatar.png");
  const [file, setFile] = useState();

  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
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

  const captureChange = (e) => {
    const name = e.target.name;
    const newComment = e.target.value;
    setComment({
      ...comment,
      postId: post._id,
      token: loggedUser.token,
      [name]: newComment,
    });
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const compressedFile = new Compressor(file, {
          quality: 0.2,
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = function load() {
              setPathImage(reader.result);
            };
          },
        });
        setFile(compressedFile);
        setPostModification({
          ...postModification,
          compressedFile,
          token: loggedUser.token,
          postId: post._id,
        });
      } else {
        errorAlert(
          "error",
          "Something went wrong!",
          "Files must be of an image type"
        );
      }
    }
  };

  const capturePostModification = (e) => {
    const name = e.target.name;
    const newPost = e.target.value;
    setPostModification({
      ...postModification,
      postId: post._id,
      token: loggedUser.token,
      file,
      [name]: newPost,
    });
  };

  const deletePost = (e) => {
    e.preventDefault();
    removePost({ token: loggedUser.token, postId: post._id });
    successToast.fire({
      icon: "success",
      title: "Post deleted successfully",
    });
    setVisible(!visible);
  };
  const sendPostModification = (e) => {
    e.preventDefault();
    submitPostModification(postModification, file);
    setPostModification({});
    setVisible(!visible);
  };

  const sendComment = (e) => {
    e.preventDefault();
    newComment(comment);
  };

  const likePost = (e) => {
    e.preventDefault();
    sendLikePost({
      postId: post._id,
      token: loggedUser.token,
    });
  };

  const dislikePost = (e) => {
    e.preventDefault();
    sendDislikePost({
      postId: post._id,
      token: loggedUser.token,
    });
  };

  return (
    <div>
      <div style={{ backgroundColor: `url(${post.userPic})` }}></div>

      {post.picture && (
        <div className="d-flex justify-content-center">
          <div
            style={{
              backgroundImage: `url(${post.picture})`,
              width: "40rem",
              height: "20rem",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      )}
      <h5>From {post.username} : </h5>
      <h3>{post.text}</h3>

      {loggedUser ? (
        post.likes.find((like) => like._id === loggedUser.userId) ? (
          <button onClick={dislikePost} id={post._id}>
            DISLIKE♥{post.likes.length}
          </button>
        ) : (
          <button onClick={likePost} id={post._id}>
            LIKE♥{post.likes.length}
          </button>
        )
      ) : (
        <button onClick={() => errorAlert("error", "must be logged in")}>
          LIKE♥{post.likes.length}
        </button>
      )}
      {loggedUser && loggedUser.userId === post.userId && (
        <button onClick={() => setVisible(!visible)}>EDIT</button>
      )}
      {visible && (
        <>
          <input
            type="text"
            name="editPost"
            onChange={capturePostModification}
          ></input>
          <input type="file" name="fileEdit" onChange={onFileChange} />
          <img src={pathImage} alt="modification" />
          <button onClick={sendPostModification}>SEND</button>
          <button onClick={deletePost}>DELETE POST</button>
        </>
      )}

      <div>
        <p>COMMENTS</p>
        {post.comments.map(
          ({ comment, name, profilePicture, likes, _id, userId }) => (
            <PostComment
              comment={comment}
              name={name}
              profilePicture={profilePicture}
              likes={likes}
              idComment={_id}
              postId={post._id}
              userId={userId}
            />
          )
        )}
        <input
          name="comment"
          type="text"
          placeholder="Enter comment..."
          onChange={captureChange}
        />
        <button onClick={sendComment}>SEND</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  newComment: postActions.newComment,
  sendLikePost: postActions.sendLikePost,
  sendDislikePost: postActions.sendDislikePost,
  submitPostModification: postActions.submitPostModification,
  removePost: postActions.removePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
