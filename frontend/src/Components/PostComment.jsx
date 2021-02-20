import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";
import "../styles/community.css";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineSend,
  AiFillDelete,
  AiTwotoneEdit,
} from "react-icons/ai";
import Swal from "sweetalert2";

const PostComment = ({
  comment,
  name,
  profilePicture,
  likes,
  loggedUser,
  idComment,
  postId,
  likeCommentPost,
  dislikeCommentPost,
  userId,
  deleteCommentPost,
  editCommentPost,
}) => {
  const [visible, setVisible] = useState(false);
  const [newComment, setNewComment] = useState({});

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

  const likeComment = (e) => {
    e.preventDefault();
    likeCommentPost({
      postId,
      idComment,
      token: loggedUser.token,
    });
  };
  const dislikeComment = (e) => {
    e.preventDefault();
    dislikeCommentPost({
      postId,
      idComment,
      token: loggedUser.token,
    });
  };

  const deleteComment = (e) => {
    e.preventDefault();
    deleteCommentPost({
      postId,
      idComment,
      token: loggedUser.token,
    });
    successToast.fire({
      icon: "success",
      title: "Comment deleted!",
    });
  };

  const mostrarInput = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const captureNewComment = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewComment({
      ...newComment,
      [name]: value,
      postId: postId,
      idComment: idComment,
      token: loggedUser.token,
    });
  };

  const editComment = (e) => {
    setVisible(!visible);
    editCommentPost(newComment);
    successToast.fire({
      icon: "success",
      title: "Comment modified!",
    });
  };

  return (
    <div className="singleCommentContainer">
      <div className="singleComment">
        <div className="commentCredentials">
          <div
            style={{
              backgroundImage: `url(${profilePicture})`,
            }}
            className="commentUserPic"
          ></div>
          <p className="commentUsername">{name}:</p>
        </div>

        {visible ? (
          <div className="editTextCommentContainer">
            <input
              type="text"
              name="newCommentEdit"
              placeholder={comment}
              onChange={captureNewComment}
              className="editCommentInput"
              autoComplete="off"
            />
            <div
              className="sendComment"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "21px",
                padding: "0 0.3rem",
              }}
            >
              <AiOutlineSend
                onClick={editComment}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ) : (
          <div className="commentComment">
            <p>{comment}</p>
          </div>
        )}
      </div>

      <div className="postLikeInteraction">
        {loggedUser ? (
          likes.find((like) => like.id === loggedUser.userId) ? (
            <div className="commentLike">
              <AiFillHeart
                onClick={dislikeComment}
                style={{ color: "darkred", cursor: "pointer" }}
              />
              {likes.length}
            </div>
          ) : (
            <div className="commentLike">
              <AiOutlineHeart
                onClick={likeComment}
                style={{ color: "darkred", cursor: "pointer" }}
              />
              {likes.length}
            </div>
          )
        ) : (
          <div className="commentLike">
            <AiOutlineHeart style={{ color: "darkred", cursor: "pointer" }} />
            {likes.length}
          </div>
        )}
        <div className="commentMod">
          {loggedUser && loggedUser.userId === userId && (
            <>
              <AiFillDelete className="aiIcon delete" onClick={deleteComment} />
              <AiTwotoneEdit className="aiIcon edit" onClick={mostrarInput} />
            </>
          )}
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
  likeCommentPost: postActions.likeCommentPost,
  dislikeCommentPost: postActions.dislikeCommentPost,
  deleteCommentPost: postActions.deleteCommentPost,
  editCommentPost: postActions.editCommentPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
