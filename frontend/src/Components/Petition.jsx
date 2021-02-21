import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/petitionsActions";
import Reasons from "./Reasons";
import Swal from "sweetalert2";
import banner from "../assets/bannerPetitionInd.png";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import "../styles/petition.css";

const Petition = (props) => {
  const id = props.match.params.id; // id en la ruta del navegador
  const [petition, setPetition] = useState({});
  const [signature, setSignature] = useState(
    props.loggedUser && {
      // Inicializa la reason en "" para enviarla al back, y luego evaluar más abajo, si es vacia, no se renderiza
      reason: "",
      petId: id,
      token: props.loggedUser.token,
    }
  );

  const { onePetition } = props;

  useEffect(() => {
    setPetition(onePetition.filter((petition) => petition._id === id)); // onePetition => todas las peticiones
    props.onePetition.length === 0 && props.history.push("/petitions"); // filtra y se queda con las peticiones que coincidan con el id
  }, [id, onePetition]);

  // Funcion que lee el input de la razon de la firma y arma un objeto en un estado para mandarlo al back
  const readInput = (e) => {
    const reason = e.target.value;
    props.loggedUser
      ? setSignature({
          reason: reason.trim(),
          petId: id,
          token: props.loggedUser.token,
        })
      : Swal.fire({
          title: "Oops!",
          text: "You must be logged in to sign this petition!",
          icon: "warning",
          confirmButtonColor: "#c1946a",
          confirmButtonText: "Log me in!",
          background: "#82b74b",
          iconColor: "white",
          backdrop: "rgba(64, 93, 39, 0.3)",
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/login");
          }
        });
  };

  // Funcion que referencia a la action con el objeto de la firma
  const signPetition = async () => {
    if (props.loggedUser) {
      props.signPetition(signature);
    } else {
      Swal.fire({
        title: "Oops!",
        text: "You must be logged in to sign this petition!",
        icon: "warning",
        confirmButtonColor: "#c1946a",
        confirmButtonText: "Log me in!",
        background: "#82b74b",
        iconColor: "white",
        backdrop: "rgba(64, 93, 39, 0.3)",
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push("/login");
        }
      });
    }
  };
  return (
    <div>
      {petition.length && (
        <>
          <div
            className="createPetitionBanner"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <h1 className="indPetitionTitle">
            <span>Petition To: {petition[0].title}</span>
          </h1>
          <div className="singlePetitionContainer">
            <div className="petitionHeader">
              <div
                className="petitionHeaderImg"
                style={{
                  backgroundImage: `url(${petition[0].author[0].profilePicture})`,
                }}
              ></div>
              <h6 className="petitionHeaderAuthor">
                Petition Created By: {petition[0].author[0].name}
              </h6>
            </div>
            <div
              className="singlePetitionImg"
              style={{
                backgroundImage: `url(${petition[0].picture})`,
              }}
            ></div>
            <div className="description">{petition[0].desc}</div>
            <div className="signaturesPetitionInd">
              <h6>
                {petition[0].signatures.length >= petition[0].goal ? (
                  <div className="goalNoticeContainer">
                    <div className="goalNotice">
                      <h3 className="goalReached">
                        THIS PETITION HAS REACHED ITS GOAL !
                      </h3>
                    </div>
                    <div className="goalNotice subTitleGoal">
                      <h5>Thanks for sharing</h5>
                    </div>
                  </div>
                ) : petition[0].signatures.length === 1 ? (
                  petition[0].signatures.length + " person has "
                ) : (
                  petition[0].signatures.length + " persons have "
                )}
                <span>already signed this petition</span>
              </h6>
            </div>
            <h4 className="py-1">Signs</h4>
            <div className="reasonsPetitionContainer reasonsPetition">
              {petition[0].signatures.length < petition[0].goal && (
                <div className="inputPetitions">
                  <input
                    type="text"
                    onChange={readInput}
                    placeholder="I'm signing because ... (optional) "
                  />
                  <p onClick={signPetition} className="sendPetition">
                    <AiOutlineSend />
                  </p>
                </div>
              )}

              <div className="comentaryReasonBox">
                <Reasons
                  reasons={petition[0].reasons}
                  petId={petition[0]._id}
                />
              </div>
            </div>
          </div>
          <div className="goToPetitions">
            <Link to="/petitions" className="returnPet">
              <FaArrowCircleLeft></FaArrowCircleLeft>
              <p>Return to Petitions</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

// Este componente lee: usuario logeado y todas las peticiones
const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
    onePetition: state.petitionsR.allPetitions,
  };
};

// Este componente tiene la capacidad de leer la action signPetition, que enviará al back la firma del usuario
const mapDispatchToProps = {
  signPetition: petitionsActions.signPetition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petition);
