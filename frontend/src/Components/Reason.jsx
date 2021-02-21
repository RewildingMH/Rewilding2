import React, { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { AiFillHeart, AiOutlineHeart,AiFillDelete,AiFillEdit} from "react-icons/ai";

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
  return (
    <div className="reasonInd">
      {reason.length > 0 && (
        <div clasName="boxStyleCommentContainer">
        <div style={{display:'flex'}}>
            <div
              style={{
                backgroundImage: `url(${profilePicture})`,
                width: "60px",
                height: "60px",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            className="userPicPetitions">
            </div>
            <h4 className="signPetitionName">{name} Said:</h4>
            {visible ? ( //modificar comentario
              <>
                <input
                  id={_id}
                  name="modification"
                  type="text"
                  onChange={captureChange}
                  placeholder={reason}
                  className="inputEditReason"
                />
                <button onClick={sendModification}>SEND</button>
              </>
            ) : (
              <p className="reasonComment">{reason}</p>
              
            )}
          </div>
          <div style={{display:'flex'}}>
            {loggedUser ? (
              likes.find((like) => like.id === loggedUser.userId) ? (
                <div>
                  <AiFillHeart className="likesReason" onClick={dislike} id={_id}/>{likes.length}
                </div>
              ) : (
                <div>
                  <AiOutlineHeart className="likesReason" onClick={like} id={_id}/>{likes.length}
                </div>
              )
            ) : (
              <div ><AiFillHeart id={_id}/>{likes.length}</div>
            )}

            {loggedUser && loggedUser.userId === userId && (
              <>  
                  
                <div><AiFillDelete id={_id} onClick={removeReason}/></div>
                <div onClick={changeReason}><AiFillEdit/></div>
              </>
            )}
          </div>
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
