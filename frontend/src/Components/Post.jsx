import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";
import PostComment from "./PostComment";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import "../styles/community.css";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";

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
  const [pathImage, setPathImage] = useState("/assets/fileImage.jpg");
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

  const oneDate = post.createdAt;

  console.log(post);

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

  const noCommentsPlaceholder = "/assets/commentsPlaceholder.png";

  return (
    <div className="postContainer">
      <div className="postHeader">
        <div className="userCredentialsOnPost">
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundImage: `url(${post.userPic})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="profilePictureOnPost"
          ></div>
          <h5 className="postUsername">{post.username}</h5>
        </div>
        <div className="postDate">
          <h4>{oneDate && oneDate.slice(0, 10)}</h4>
        </div>
      </div>

      {post.picture && (
        <div className="d-flex justify-content-center postPicture">
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

      <div className="postTextContainer">
        <h5 className="postText">{post.text}</h5>
      </div>

      <div className="userInteractionsOnPost">
        {loggedUser ? (
          post.likes.find((like) => like._id === loggedUser.userId) ? (
            <div className="likeContainer">
              <div className="dispatchLike" onClick={dislikePost} id={post._id}>
                <AiFillHeart style={{ color: "darkred", cursor: "pointer" }} />
                {post.likes.length}
              </div>
            </div>
          ) : (
            <div className="likeContainer">
              <div className="dispatchLike" onClick={likePost} id={post._id}>
                <AiOutlineHeart
                  style={{ color: "darkred", cursor: "pointer" }}
                />
                {post.likes.length}
              </div>
            </div>
          )
        ) : (
          <div className="likeContainer">
            <AiOutlineHeart
              onClick={() => errorAlert("error", "must be logged in")}
              style={{ color: "darkred", cursor: "pointer" }}
            />
            {post.likes.length}
          </div>
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
      </div>

      <div className="commentsContainer">
        <div className="commentSectionTitle">
          <p>Comments</p>
        </div>
        <div className="commentsMap">
          {post.comments.length ? (
            post.comments.map(
              ({ comment, name, profilePicture, likes, _id, userId }) => (
                <PostComment
                  key={_id}
                  comment={comment}
                  name={name}
                  profilePicture={profilePicture}
                  likes={likes}
                  idComment={_id}
                  postId={post._id}
                  userId={userId}
                />
              )
            )
          ) : (
            <div className="noComments">
              <div
                style={{
                  backgroundImage: `url(${noCommentsPlaceholder})`,
                }}
                className="noCommentsPlaceholder"
              ></div>
              <span>No comments yet!</span>
            </div>
          )}
        </div>
        <div className="inputContainer">
          <input
            name="comment"
            type="text"
            placeholder="Enter comment..."
            onChange={captureChange}
          />
          <div className="sendButton">
            <AiOutlineSend
              onClick={sendComment}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
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
