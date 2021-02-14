import React from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/PetitionsActions";
import PetitionCard from "../Components/PetitionCard";
import { Link } from "react-router-dom";

const Petitions = (props) => {
  console.log(props);

  return (
    <>
      <div>
        <h2>Petitions</h2>
        {props.allPetitions.map((petition) => {
          return <PetitionCard petition={petition} />;
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
