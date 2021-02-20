import React, { useState } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/petitionsActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import createPetBanner from "../assets/createPetitionImg.png";

//COMPONENTE PARA ENVIAR UNA NUEVA PETICIÓN
const CreatePetition = (props) => {
  //VARIABLE DE ESTADO QUE CAPTURA LOS VALORES INGRESADOS EN LOS CAMPOS
  const [newPetition, setNewPetition] = useState({});
  //VARIABLE DE ESTADO QUE PREVISUALIZA LA FOTO QUE VA A ENVIAR QUIEN REALICE LA NUEVA PETICIÓN
  const [pathImage, setPathImage] = useState("/assets/upload.png");
  const [file, setFile] = useState();

  //ALERTAS LINDAS
  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };

  //FUNCION QUE CAPTURA LOS VALORES DE LOS INPUTS CON LOS DATOS A ENVIAR
  const captureNewPetition = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setNewPetition({
      ...newPetition,
      [field]: value,
      token: props.loggedUser.token,
    });
  };
  //CAPTURA EL INPUT FILE
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type.includes("image")) {
        //SE COMPRIME LA FOTO DE UNA PETICIÓN PARA QUE NO SEA MUY GRANDE
        const compressedFile = new Compressor(file, {
          quality: 0.5,
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = function load() {
              setPathImage(reader.result);
            };
          },
        });
        setFile(compressedFile);
      } else {
        errorAlert("error", "Something went wrong");
      }
    } else {
      errorAlert("error", "Petition must have a picture");
    }
  };
  //ENVÍA LA PETITION Y REDIRIGE AL COMPONTENTE "PETITIONS"
  const sendPetition = (e) => {
    e.preventDefault();
    props.addPetition(newPetition, file);
    props.history.push("/petitions");
  };

  return (
    <>
      <div
        className="createPetitionBanner"
        style={{
          backgroundImage: `url(${createPetBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="createPetitionContainer col-8 container mt-4">
        <h2 className="text-center" style={{ paddingTop: "2vh" }}>CREATE PETITION</h2>
        <div className="backgroundCard">
          <div>
            <div className="createPetitionInput1nd2">
              <h5 className="text-center">
                Write down the title of your petition
              </h5>
              <p className="text-center">It should be something meaningful</p>
              <input
                name="title"
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
          <div>
            <div className="createPetitionInput3">
              <h5 className="text-center">Explain why you want to change it</h5>
              <p className="text-center">It should be something meaningful</p>
              <textarea
                name="description"
                onChange={captureNewPetition}
              ></textarea>
            </div>
            <div className="createPetitionInput4">
              <h5 className="text-center">
                Choose a limit date for your petition
              </h5>
              <p className="text-center">Final date</p>
              <input
                name="limitDate"
                type="date"
                onChange={captureNewPetition}
              />
            </div>
          </div>
          <div className="lastDiv">
            <div className="createPetitionInput5">
              <h5 className="text-center">Choose a goal for your petition</h5>
              <p className="text-center">Signature limit</p>
              <input name="goal" type="number" onChange={captureNewPetition} />
            </div>
            <div className="createPetitionInput6">
              <h5 className="text-center">
                Upload a picture for your petition
              </h5>
              <p className="text-center">Make it a high res one</p>
              <div className="createPetitionUploadFile">
                <label htmlFor="inputUpload">
                  <img style={{margin:"0"}}
                    className="img-fluid profile-pic-profile-submit"
                    src={pathImage}
                    alt="petition-pic"
                  />
                  <h6 className="text-center">
                    Click in the reference image to upload your picture!
                  </h6>
                </label>
                <input
                  id="inputUpload"
                  name="picture"
                  type="file"
                  onChange={onFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="createPetitionButton d-flex justify-content-center">
          <button onClick={sendPetition}>Send Petition</button>
        </div>
      </div>
      <div className="white"></div>
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
