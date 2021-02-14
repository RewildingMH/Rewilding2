import React from "react";
import { Link } from "react-router-dom";
import petitionsActions from "../redux/actions/PetitionsActions";
import { connect } from "react-redux";

const PetitionCard = (petition) => {
  const addVisit = () => {
    //visitas en la BD +1
    // petition.addVisit();
  };

  return (
    <Link to={`/petitions/${petition.petition._id}`}>
      <h2>Petition</h2>
      <h3>{petition.petition.title}</h3>
    </Link>
  );
};

const mapDispatchToProps = {
  addVisit: petitionsActions.addVisit,
};

export default connect(null, mapDispatchToProps)(PetitionCard);
