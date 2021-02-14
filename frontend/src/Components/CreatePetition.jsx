import React, { useState } from "react";
import { connect } from "react-redux";
import PetitionsActions from "../redux/actions/PetitionsActions";

const CreatePetition = (props) => {
  const [newPetition, setNewPetition] = useState({});

  const captureNewPetition = (e) => {
    console.log(e.target.value, e.target.name);
    const field = e.target.name;
    const value = e.target.value;
    setNewPetition({
      ...newPetition,
      [field]: value,
      token: props.loggedUser.token,
    });
  };

  const sendPetition = (e) => {
    console.log(newPetition);
    e.preventDefault();
    props.addPetition(newPetition);
  };

  return (
    <div>
      <h2>Create petition</h2>
      <label>Write down the title of your petition</label>
      <p>It should be something meaningful</p>
      <input
        name="title"
        type="text"
        placeholder="What are you looking to achieve?"
        onChange={captureNewPetition}
      />

      <label>Who is it for?</label>
      <p>Who can change this?</p>
      <input
        name="destination"
        type="text"
        placeholder="Destination of your petition"
        onChange={captureNewPetition}
      />

      <label>Explain why you want to change it</label>
      <p>It should be something meaningful</p>
      <textarea name="description" onChange={captureNewPetition}></textarea>

      <label>Choose a limit date for your petition</label>
      <p>Final date</p>
      <input name="limitDate" type="date" onChange={captureNewPetition} />

      <label>Upload a picture for your petition</label>
      <p>Make it a high res one</p>
      <input name="picture" type="text" onChange={captureNewPetition} />

      <button onClick={sendPetition}>Send Petition</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  addPetition: PetitionsActions.addPetition,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePetition);
