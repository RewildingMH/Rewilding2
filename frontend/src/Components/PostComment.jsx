import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";

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
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="col-12 flex-1">
          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundImage: `url(${profilePicture})`,
                width: "20px",
                height: "20px",
                backgroundSize: "cover",
                marginRight: "5vw",
              }}
            ></div>

            {visible ? (
              <>
                <input
                  type="text"
                  name="newCommentEdit"
                  placeholder={comment}
                  onChange={captureNewComment}
                />
                <button onClick={editComment}>SEND</button>
              </>
            ) : (
              <div>
                <p>{name}</p>
                <p>{comment}</p>
              </div>
            )}
          </div>

          <p>LIKES: {likes.length}</p>
          {loggedUser ? (
            likes.find((like) => like.id === loggedUser.userId) ? (
              <button onClick={dislikeComment}>DISLIKE COMMENT♥</button>
            ) : (
              <button onClick={likeComment}>LIKE COMMENT♥</button>
            )
          ) : (
            <button> LIKE COMMENT♥</button>
          )}
          {loggedUser && loggedUser.userId === userId && (
            <>
              <button onClick={deleteComment}>DELETE</button>
              <button onClick={mostrarInput}>EDIT</button>
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
