import React, { useEffect } from "react";
import { connect } from "react-redux";
import petitionsActions from '../redux/actions/petitionsActions'
import PetitionCard from "../Components/PetitionCard";
import petitionImg from "../assets/petitionsImg.png"

const Petitions = (props) => {
  useEffect(() => {
    props.getPetitions();
  }, []);

  return (
    <>
      <div className="petitionBanner" style={{ backgroundImage: `url(${petitionImg})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div className="petitionContainer">
        <div className="containerPetBanner">
          <h1>PETITIONS</h1>
        </div>
        <div className="allPetitions">
          {props.allPetitions.map((petition) => {
            return <PetitionCard key={petition._id} petition={petition} />;
          })}
        </div>
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
