import React from "react";

export const Petition = (props) => {
  const [comment, setComment] = useState({});

  const leerInput = (e) => {
    const comment = e.target.value;
    setComment({
      comment: comment.trim(),
      petId: props.petititon._id,
      name: props.loggedUser.firstname,
      profilePicture: props.loggedUser.profilePicture,
    });
  };

  const postComment = async () => {
    if (props.loggedUser) {
      if (comment.comment) {
        await props.postComment(comment);
      } else {
        alert("empty comment");
      }
    } else {
      alert("not logged");
    }
  };

  return (
    <div>
      <h2>Petition: {props.petition.title}</h2>

      <button>Sign petition</button>

      <input type="text" placeholder="Firmo porque ..." />
      <button onClick={postComment}>Send comment</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  signPetition: petitionsActions.signPetition,
  commentPetition: petitionsActions.commentPetition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petition);
