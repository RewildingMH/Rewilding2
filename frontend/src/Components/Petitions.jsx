import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import petitionsActions from "../redux/actions/PetitionsActions";

const Petitions = (props) => {
  console.log(props);

  const sumarVisita = () => {
    //visitas en la BD +1
  };

  return (
    <div>
      <h2>Petitions</h2>
      {/* {props.petitions.map((petition) => {
        // <PetitionCard onClick={sumarVisita} petition={petition} />;
      })} */}
       <Link to="/">Return to home</Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPetitions: state.petitionsR.allPetitions,
  };
};

const mapDispatchToProps = {
  getPetitions: petitionsActions.getPetitions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petitions);
