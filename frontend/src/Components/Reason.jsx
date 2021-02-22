import React, { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillDelete,
  AiFillEdit,
  AiOutlineSend,
} from "react-icons/ai";
import { Link } from "react-router-dom";

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
    dislikeReason({
      id: _id,
      petId,
      token: loggedUser.token,
    });
  };

  const removeReason = (e) => {
    deleteReason({
      id: _id,
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
      userId,
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
  if (reason && reason.length) {
    return (
      <div className="reasonInd">
        {reason.length > 0 && (
          <div className="boxStyleCommentContainer">
            <div
              className="d-flex p-3 align-items-center columnPetition"
              style={{ width: "90%" }}
            >
              <h4 className="signPetitionName">
                <Link
                  className="linkToProfilePetCom"
                  to={`/profile/${reasons.userId}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${profilePicture})`,
                      width: "60px",
                      height: "60px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="userPicPetitions"
                  ></div>
                  {name}:
                </Link>
              </h4>
              {visible ? ( //modificar comentario
                <>
                  <div className="editBlogReasonInput">
                    <input
                      id={_id}
                      name="modification"
                      type="text"
                      onChange={captureChange}
                      placeholder={reason}
                      className="inputEditReason"
                    />
                  </div>
                  <AiOutlineSend
                    onClick={sendModification}
                    style={{
                      fontSize: "36px",
                      margin: "1rem",
                      textAlign: "center",
                      border: "2px solid grey",
                      borderRadius: "50%",
                      padding: "0.3rem",
                    }}
                  />
                </>
              ) : (
                <span className="text-break reasonComment">{reason}</span>
              )}
            </div>
            <div className="boxIconPetitionContainer">
              {loggedUser ? (
                likes.find((like) => like.id === loggedUser.userId) ? (
                  <div className="d-flex">
                    <AiFillHeart
                      className="likesReasonPetition"
                      onClick={dislike}
                      id={_id}
                    />
                    {likes.length}
                  </div>
                ) : (
                  <div className="d-flex">
                    <AiOutlineHeart
                      className="likesReasonPetition"
                      onClick={like}
                      id={_id}
                    />
                    {likes.length}
                  </div>
                )
              ) : (
                <div className="SingleIconContainer d-flex">
                  <AiFillHeart id={_id} />
                  {likes.length}
                </div>
              )}

              {loggedUser && loggedUser.userId === userId && (
                <>
                  <div className="SingleIconContainer">
                    <AiFillDelete
                      id={_id}
                      onClick={removeReason}
                      className="iconTrash"
                    />
                  </div>
                  <div
                    className="SingleIconContainer"
                    onClick={changeReason}
                    className="iconEdit"
                  >
                    <AiFillEdit />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return false;
  }
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
