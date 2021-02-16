import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";

const Post = ({
  post,
  loggedUser,
  newComment,
  sendLikePost,
  sendDislikePost,
}) => {
  const [comment, setComment] = useState({});

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

  const sendComment = (e) => {
    e.preventDefault();
    newComment(comment);
  };

  const likePost = (e) => {
    e.preventDefault();
    console.log();
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

  console.log(post.likes);

  return (
    <div>
      <div style={{ backgroundColor: `url(${post.userPic})` }}></div>
      <h5>{post.username}</h5>
      {post.picture && (
        <div
          style={{
            backgroundImage: `url(${post.picture})`,
            width: "20px",
            height: "20px",
            backgroundSize: "cover",
          }}
        ></div>
      )}
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
        <button onClick={() => alert("must be logged in")}>
          LIKE♥{post.likes.length}
        </button>
      )}

      <div>
        <p>COMMENTS</p>
        {post.comments.map(({ comment, name, profilePicture, likes }) => (
          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundImage: `url(${profilePicture})`,
                width: "20px",
                height: "20px",
                backgroundSize: "cover",
              }}
            ></div>
            <p>{name}</p>

            <p>{comment}</p>
            <p>LIKES: {likes.length}</p>
            <button>♥</button>
          </div>
        ))}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
