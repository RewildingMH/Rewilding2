import React from "react";
import { Link } from "react-router-dom";
import petitionsActions from "../redux/actions/petitionsActions";
import { connect } from "react-redux";

//COMPONENTE QUE RECIBE DE SU PADRE TODAS LAS PETICIONES MAPEADAS Y LAS RENDERIZA
const PetitionCard = (props) => {
  //FUNCIÓN PARA SUMAR VISITAS A CADA PETICIÓN CUANDO SE LE HACE CLIC
  const addVisit = (e) => {
    const id = props.petition._id;
    props.addVisit(id);
  };

  return (
    <Link to={`/petitions/${props.petition._id}`} onClick={addVisit}>
      <h2>Petition</h2>
      <h3>{props.petition.title}</h3>
      <div
        style={{
          backgroundImage: `url(${props.petition.picture})`,
          width: "500px",
          height: "500px",
          backgroundSize: "cover",
        }}
      ></div>
      <div>
        <p>
          {props.petition.desc.length > 100
            ? props.petition.desc.slice(0, 100) + "..."
            : props.petition.desc}
        </p>
        {/* CONDICIÓN QUE RENDERIZA CUÁNTAS PERSONAS FIRMARON ESA PETICIÓN */}
        <p>
          {props.petition.signatures.length
            ? props.petition.signatures.length === 1
              ? props.petition.signatures.length +
                " person has already signed this petition"
              : props.petition.signatures.length +
                " persons have already signed this petition"
            : "No one has signed this petition yet"}
        </p>
      </div>
    </Link>
  );
};

const mapDispatchToProps = {
  addVisit: petitionsActions.addVisit,
};

export default connect(null, mapDispatchToProps)(PetitionCard);
