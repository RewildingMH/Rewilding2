import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/PetitionsActions";
import Reasons from "./Reasons";

const Petition = (props) => {
  const id = props.match.params.id;
  const [petition, setPetition] = useState({});
  const [reload, setReload] = useState(false);

  const [signature, setSignature] = useState(
    props.loggedUser && { reason: "", petId: id, token: props.loggedUser.token }
  );

  const { onePetition } = props;

  useEffect(() => {
    setPetition(onePetition.filter((petition) => petition._id === id));
    props.onePetition.length === 0 && props.history.push("/petitions");
  }, [id, onePetition]);

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

  console.log(petition);

  return (
    <div>
      {petition.length && (
        <>
          <h2>Petition: {petition[0].title}</h2>

          <div
            style={{
              backgroundImage: `url(${petition[0].picture})`,
              width: "100px",
              height: "100px",
              backgroundSize: "cover",
            }}
          ></div>
          <div>{petition[0].desc}</div>
          <p>
            {petition[0].signatures.length === 1
              ? petition[0].signatures.length +
                " person has already signed this petition"
              : petition[0].signatures.length +
                " persons have already signed this petition"}
          </p>

          <input
            type="text"
            onChange={readInput}
            placeholder="I'm signing because ... (optional) "
          />
          <button onClick={signPetition}>Sign petition</button>
          <h4>Signatures</h4>
          <Reasons reasons={petition[0].reasons} petId={petition[0]._id} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
    onePetition: state.petitionsR.allPetitions,
  };
};

const mapDispatchToProps = {
  signPetition: petitionsActions.signPetition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petition);
