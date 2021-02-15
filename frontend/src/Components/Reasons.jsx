import React from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";

const Reasons = ({ reasons, likeReason, loggedUser, petId }) => {
  const like = (e) => {
    const id = e.target.id;
    likeReason({
      petId,
      id,
      token: loggedUser.token,
    });
  };
  console.log(reasons);
  return (
    <div>
      {reasons.map(
        ({ name, profilePicture, reason, _id }) =>
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
                ♥
              </button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Reasons);
