import React, { useState } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/petitionsActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import createPetBanner from "../assets/createPetitionImg.png";
import Footer from './Footer'

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
  const hoy = new Date()
  hoy.setHours(0,0,0,0)

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
    //VALIDACIÓN PARA QUE TODOS LOS CAMPOS ESTÉN COMPLETOS
    if(newPetition.length === undefined && file === undefined){
      errorAlert("error","All fields are required" )
      return false
    }
    if(!newPetition.goal || !newPetition.description || !newPetition.destination || !newPetition.limitDate || !newPetition.title){
      errorAlert("error","All fields are required" )
      return false
    }
    if(newPetition.goal < 10){
      errorAlert("error","The signature goal must be greater than 10" )
      return false
    }

    const fechaInput = newPetition.limitDate
    const fecha = new Date(fechaInput)
    fecha.setHours(0,0,0,0)

    if(hoy.getTime() + 2500000000 > fecha.getTime() ){
      errorAlert("error","The date should not be less than 30 days from the moment of creation")
      return false
    }
    
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

      {/* Formulario */}
      <div className="container my-4 ">
        <div className="row">
          <div className="col col-sm-8 col-md-6 col-lg-6 mx-auto">
            <h2 className="text-center" style={{ paddingTop: "2vh" }}>CREATE PETITION</h2>
            <div className="createPetition text-center mt-4">
              <h5>
                Write down the title of your petition
              </h5>
              <span className="h6">It should be something meaningful</span>
              <input
                autoComplete="off"
                name="title"
                type="text"
                placeholder="What are you looking to achieve?"
                onChange={captureNewPetition}
              />
            </div>
            <div className="createPetition text-center mt-4">
              <h5>Who is it for?</h5>
              <span className="h6">Who can change this?</span>
              <input
                autoComplete="off"
                name="destination"
                type="text"
                placeholder="Destination of your petition"
                onChange={captureNewPetition}
              />
            </div>
            <div className="createPetition text-center mt-4">
              <h5>
                Choose a limit date for your petition
              </h5>
              <span className="h6">Final date</span>
              <input
                name="limitDate"
                type="date"
                onChange={captureNewPetition}
              />
            </div>                  
            <div className="createPetition text-center mt-4">
              <h5>Choose a goal for your petition</h5>
              <span className="h6">Signature limit</span>
              <input placeholder="10" minLength="2" min="10" name="goal" type="number" onChange={captureNewPetition} />
            </div>
            <div className="createPetition text-center mt-4">
              <h5>Explain why you want to change it</h5>
              <span className="h6">It should be something meaningful</span>
              <textarea 
                name="description"
                onChange={captureNewPetition}
              ></textarea>
            </div> 
            <div className="createPetition text-center mt-4">

              <h5>
                Upload a picture for your petition
              </h5>
              <span className="h6 mb-5">Make it a high res one</span>
              <label htmlFor="inputUpload">
                <img style={{margin:"0"}}
                  className="img-fluid profile-pic-profile-submit"
                  src={pathImage}
                  alt="petition-pic"
                />
                <h6 className="my-3">
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
            <div className="createPetitionButton d-flex justify-content-center my-4">
                <button onClick={sendPetition}>Send Petition</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
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
