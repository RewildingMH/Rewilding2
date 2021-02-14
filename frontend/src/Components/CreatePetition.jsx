import React, { useState } from "react";
import { connect } from "react-redux";
import PetitionsActions from "../redux/actions/PetitionsActions";

const CreatePetition = (props) => {
  const [newPetition, setNewPetition] = useState({});

  const captureNewPetition = (e) => {
    const field = e.target.name;
    const value = e.targe.value;
    setNewPetition({
      [field]: value,
      name: props.loggedUser.name,
      profilePicture: props.loggedUser.profilePicture,
    });
  };

  const sendPetition = (e) => {
    e.preventDefatult();
    props.CreatePetition(newPetition);
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
      <input />

      <label>Who is it for?</label>
      <p>Who can change this?</p>
      <input
        name="destination"
        type="text"
        placeholder="Destination of your petition"
        onChange={captureNewPetition}
      />
      <input />

      <label>Explain why you want to change it</label>
      <p>It should be something meaningful</p>
      <textarea name="description" onChange={captureNewPetition}></textarea>

      <label>Upload a picture for your petition</label>
      <p>Make it a high res one</p>
      <input name="picture" type="text" onChange={captureNewPetition} />
      <input />

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
