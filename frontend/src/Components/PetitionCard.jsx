import React from "react";
import { Link } from "react-router-dom";
import petitionsActions from "../redux/actions/PetitionsActions";
import { connect } from "react-redux";

const PetitionCard = (petition) => {
  const addVisit = () => {
    //visitas en la BD +1
    // petition.addVisit();
  };
  console.log(petition.petition.picture);

  return (
    <Link to={`/petitions/${petition.petition._id}`}>
      <h2>Petition</h2>
      <h3>{petition.petition.title}</h3>
      <div
        style={{
          backgroundImage: `url(${petition.petition.picture})`,
          width: "100px",
          height: "100px",
          backgroundSize: "cover",
        }}
      ></div>
      <div>
        <p>
          {petition.petition.desc.length > 100
            ? petition.petition.desc.slice(0, 100) + "..."
            : petition.petition.desc}
        </p>
        <p>
          {petition.petition.signatures.length} have already signed this
          petition
        </p>
      </div>
    </Link>
  );
};

const mapDispatchToProps = {
  addVisit: petitionsActions.addVisit,
};

export default connect(null, mapDispatchToProps)(PetitionCard);
