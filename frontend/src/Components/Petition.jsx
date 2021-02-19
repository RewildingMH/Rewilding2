import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/petitionsActions";
import Reasons from "./Reasons";
import Swal from "sweetalert2";

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
          <h2>Petition: {petition[0].title}</h2>

          <div
            style={{
              backgroundImage: `url(${petition[0].picture})`,
              width: "80vw",
              height: "50vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div>{petition[0].desc}</div>
          <p>
            {petition[0].signatures.length >= petition[0].goal ? (
              <div>
                <p>probando</p>
              </div>
            ) : petition[0].signatures.length === 1 ? (
              petition[0].signatures.length + " person has "
            ) : (
              petition[0].signatures.length + " persons have "
            )}
            already signed this petition
          </p>

          {petition[0].signatures.length < petition[0].goal && (
            <>
              <input
                type="text"
                onChange={readInput}
                placeholder="I'm signing because ... (optional) "
              />
              <button onClick={signPetition}>Sign petition</button>
            </>
          )}
          <h4>Signatures</h4>
          <Reasons reasons={petition[0].reasons} petId={petition[0]._id} />
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
