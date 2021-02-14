import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/PetitionsActions";
import { Reasons } from "./Reasons.jsx";

const Petition = (props) => {
  const [signature, setSignature] = useState({});
  const [petition, setPetition] = useState({});
  const [reload, setReload] = useState(false);

  const id = props.match.params.id;

  const { onePetition } = props;

  useEffect(() => {
    setPetition(onePetition.filter((petition) => petition._id === id));
    props.onePetition.length === 0 && props.history.push("/petitions");
    props.getReason();
  }, [id]);

  const readInput = (e) => {
    const reason = e.target.value;
    setSignature({
      reason: reason.trim(),
      petId: id,
      token: props.loggedUser.token,
    });
  };

  const signPetition = async () => {
    if (props.loggedUser) {
      setReload(!reload);
      props.signPetition(signature);
    } else {
      alert("must be logged");
    }
  };
  return (
    <div>
      <h2>Petition: {petition.length ? petition[0].title : ""}</h2>

      <input
        type="text"
        onChange={readInput}
        placeholder="I'm signing because ... (optional) "
      />
      <button onClick={signPetition}>Sign petition</button>
      <h4>Signatures</h4>
      {petition.length && props.reasons.length
        ? props.reasons.map((reason) => <Reasons reason={reason} />)
        : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
    onePetition: state.petitionsR.allPetitions,
    reasons: state.petitionsR.reasons,
  };
};

const mapDispatchToProps = {
  signPetition: petitionsActions.signPetition,
  getReason: petitionsActions.getReason,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petition);
