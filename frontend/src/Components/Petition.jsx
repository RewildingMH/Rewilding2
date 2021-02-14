import React, { useState } from "react";
import { connect } from "react-redux";

export const Petition = (props) => {
  const [signature, setSignature] = useState({});

  const readInput = (e) => {
    const reason = e.target.value;
    setSignature({
      reason: reason.trim(),
      petId: props.petititon._id,
      name: props.loggedUser.firstname,
      profilePicture: props.loggedUser.profilePicture,
    });
  };

  const signPetition = async () => {
    if (props.loggedUser) {
      props.signPetition(signature);
    } else {
      alert("must be logged");
    }
  };

  return (
    <div>
      <h2>Petition: {props.petition.title}</h2>

      <input
        type="text"
        onChange={readInput}
        placeholder="I'm signing because ... (optional) "
      />
      <button onClick={signPetition}>Sign petition</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

// const mapDispatchToProps = {
//   signPetition: petitionsActions.signPetition,
// };

export default connect(mapStateToProps)(Petition);
