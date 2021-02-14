import React, { useEffect } from "react";
import { connect } from "react-redux";
import petitionsActions from "../redux/actions/PetitionsActions";
import PetitionCard from "../Components/PetitionCard";

const Petitions = (props) => {
  useEffect(() => {
    props.getPetitions();
  }, []);

  return (
    <>
      <div>
        <h2>Petitions</h2>
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
