import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";

const Reasons = ({
  reasons,
  likeReason,
  dislikeReason,
  loggedUser,
  petId,
  deleteReason,
  modifyReason,
}) => {
  const like = (e) => {
    const id = e.target.id;
    likeReason({
      petId,
      id,
      token: loggedUser.token,
    });
  };

  const [edit, setEdit] = useState({});

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
    modifyReason(edit);
  };

  return (
    <div>
      {reasons.map(
        ({ name, profilePicture, reason, _id, likes }) =>
          reason !== "" && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundImage: `url(${profilePicture})`,
                  width: "100px",
                  height: "100px",
                }}
              ></div>
              <h5>{name}</h5>
              <p>{reason}</p>
              <button onClick={like} id={_id}>
                ♥{likes.length}
              </button>
              <button onClick={dislike} id={_id}>
                ♥{likes.length}
              </button>
              <button onClick={removeReason} id={_id}>
                DELETE
              </button>
              <button onClick={changeReason}>EDIT</button>
              <input
                id={_id}
                name="modification"
                type="text"
                onChange={captureChange}
              />
            </div>
          )
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

export default connect(mapStateToProps, mapDispatchToProps)(Reasons);