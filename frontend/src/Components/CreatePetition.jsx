import React, { useState } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/petitionsActions"

const CreatePetition = (props) => {
  const [newPetition, setNewPetition] = useState({});
  const [pathImage, setPathImage] = useState("/assets/avatar.png");
  const [file, setFile] = useState();

  const captureNewPetition = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setNewPetition({
      ...newPetition,
      [field]: value,
      token: props.loggedUser.token,
    });
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load() {
          setPathImage(reader.result);
        };
        setFile(file);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  const sendPetition = (e) => {
    e.preventDefault();
    props.addPetition(newPetition, file);
    props.history.push("/petitions");
  };

  return (
    <>
    <div className="createPetitionBanner"></div>
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

      <label>Choose a goal for your petition</label>
      <p>Signature limit</p>
      <input name="goal" type="number" onChange={captureNewPetition} />

      <label>Upload a picture for your petition</label>
      <p>Make it a high res one</p>
      <img
        className="img-fluid profile-pic-profile-submit"
        src={pathImage}
        alt="petition-pic"
        style={{ width: "100px", height: "100px" }}
      />
      <input name="picture" type="file" onChange={onFileChange} />

      <button onClick={sendPetition}>Send Petition</button>
    </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  addPetition: petitionsActions.addPetition,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePetition);
