import React, { useState } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/petitionsActions"

const CreatePetition = (props) => {
  const [newPetition, setNewPetition] = useState({});
  const [pathImage, setPathImage] = useState("/assets/fileImage.jpg");
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
    <div className="createPetitionContainer container mt-4">
      <h2 className="text-center">Create petition</h2>
      <div className="backgroundCard">
        <div className="part1 d-flex justify-content-around">
            <div className="createPetitionInput1nd2">
                <h5 className="text-center">Write down the title of your petition</h5>
                <p className="text-center">It should be something meaningful</p>
                <input  name="title" 
                        type="text" 
                        placeholder="What are you looking to achieve?" 
                        onChange={captureNewPetition}
                />
            </div>
            <div className="createPetitionInput1nd2">
                <h5 className="text-center">Who is it for?</h5>
                <p className="text-center">Who can change this?</p>
                <input
                  name="destination"
                  type="text"
                  placeholder="Destination of your petition"
                  onChange={captureNewPetition}
                />
            </div>
        </div>
        <div className="part2 d-flex justify-content-around">
              <div className="createPetitionInput3">
                  <h5 className="text-center">Explain why you want to change it</h5>
                  <p className="text-center">It should be something meaningful</p>
                  <textarea 
                        name="description" 
                        onChange={captureNewPetition}>
                  </textarea>
              </div>
              <div className="createPetitionInput4">
                  <h5 className="text-center">Choose a limit date for your petition</h5>
                  <p className="text-center">Final date</p>
                  <input  name="limitDate" 
                          type="date" 
                          onChange={captureNewPetition} />
              </div>
        </div>
        <div className="part3 d-flex justify-content-around">
            <div className="createPetitionInput5">
                <h5 className="text-center">Choose a goal for your petition</h5>
                <p className="text-center">Signature limit</p>
                <input  name="goal" 
                        type="number" 
                        onChange={captureNewPetition} />
            </div>
            <div className="createPetitionInput6">
                <h5 className="text-center">Upload a picture for your petition</h5>
                <p className="text-center">Make it a high res one</p>
                <div className="createPetitionUploadFile">
                  <label htmlFor="inputUpload">
                  <img
                      className="img-fluid profile-pic-profile-submit"
                      src={pathImage}
                      alt="petition-pic"
                    />
                  <h6 className="text-center">Click in the reference image to upload your picture!</h6>
                  </label>
                    <input  id="inputUpload"
                            name="picture" 
                            type="file" 
                            onChange={onFileChange} />
                </div>
            </div>
        </div>
      </div>
      <div className="createPetitionButton d-flex justify-content-center">
          <button onClick={sendPetition}>Send Petition</button>
      </div>
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
