import React, { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";

const Reason = ({
  reasons,
  loggedUser,
  likeReason,
  dislikeReason,
  deleteReason,
  modifyReason,
  petId,
}) => {
  const { name, profilePicture, reason, _id, likes, userId } = reasons;

  const like = (e) => {
    const id = e.target.id;
    likeReason({
      petId,
      id,
      token: loggedUser.token,
    });
  };

  const [edit, setEdit] = useState({});
  const [visible, setVisible] = useState(false);

  const dislike = (e) => {
    const id = e.target.id;
    dislikeReason({
      id,
      petId,
      token: loggedUser.token,
    });
  };

  const removeReason = (e) => {
    const id = e.target.id;
    deleteReason({
      id,
      petId,
      token: loggedUser.token,
    });
  };

  const captureChange = (e) => {
    const id = e.target.id;
    const name = e.target.name;
    const newComment = e.target.value;
    setEdit({
      ...edit,
      id,
      petId,
      token: loggedUser.token,
      [name]: newComment,
    });
  };

  const changeReason = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const sendModification = (e) => {
    e.preventDefault();
    modifyReason(edit);
    setVisible(!visible);
  };
  return (
    <div>
      {reason.length > 0 && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundImage: `url(${profilePicture})`,
              width: "100px",
              height: "100px",
            }}
          className="userPicPetitions"></div>
          <h5>{name}</h5>
          {visible ? (
            <>
              <input
                id={_id}
                name="modification"
                type="text"
                onChange={captureChange}
                placeholder={reason}
              />
              <button onClick={sendModification}>SEND</button>
            </>
          ) : (
            <p>{reason}</p>
          )}

          {loggedUser ? (
            likes.find((like) => like.id === loggedUser.userId) ? (
              <button onClick={dislike} id={_id}>
                DISLIKE♥{likes.length}
              </button>
            ) : (
              <button onClick={like} id={_id}>
                LIKE♥{likes.length}
              </button>
            )
          ) : (
            <button id={_id}>LIKE♥{likes.length}</button>
          )}

          {loggedUser && loggedUser.userId === userId && (
            <>
              <button onClick={removeReason} id={_id}>
                DELETE
              </button>
              <button onClick={changeReason}>EDIT</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  likeReason: userActions.likeReason,
  dislikeReason: userActions.dislikeReason,
  deleteReason: userActions.deleteReason,
  modifyReason: userActions.modifyReason,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reason);
