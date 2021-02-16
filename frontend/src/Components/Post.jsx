import React, { useState } from "react";
import { connect } from "react-redux";
import postActions from "../redux/actions/postActions";

const Post = ({ post, loggedUser, newComment, sendLikePost }) => {
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
    sendLikePost({
      postId: post._id,
      token: loggedUser.token,
    });
  };

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
      <div>LIKES:{post.likes.length}</div>
      <button onClick={likePost}>♥</button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
