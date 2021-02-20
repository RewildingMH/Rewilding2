import React, { useEffect } from "react";
import { connect } from "react-redux";
import PetitionCard from "../Components/PetitionCard";
import petitionsActions from "./../redux/actions/petitionsActions"
import petitionsImg from "../assets/petitionsImg.png"


//COMPONENTE QUE LEE LAS PETICIONES REALIZADAS
const Petitions = (props) => {
  //USEEFFECT QUE ACTIVA UNA ACTION DE REDUX, ESA ACTION HACE UN PEDIDO GET AL SERVIDOR Y TRAE TODAS LAS PETICIONES EXISTENTES
  useEffect(() => {
    props.getPetitions();
  }, []);

  return (
    <>
      <div className="petitionBanner" style={{backgroundImage: `url(${petitionsImg})`, backgroundPosition: "center", backgroundSize: "cover"}}></div>
      {/* SE MAPEAN TODAS LAS PETICIONES Y SE LAS ENVÍA A UN COMPONENTE QUE LAS RENDERIZA */}
      <div className="petitionContainer">
        <h1>PETITIONS</h1>
        {props.allPetitions.map((petition) => {
          return <PetitionCard key={petition._id} petition={petition} />;
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allPetitions: state.petitionsR.allPetitions,
  };
};

const mapDispatchToProps = {
  getPetitions: petitionsActions.getPetitions,
  addVisit: petitionsActions.addVisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petitions);
