import React from "react";
import { Link } from "react-router-dom";
import petitionsActions from "../redux/actions/petitionsActions";
import { connect } from "react-redux";

const PetitionCard = (props) => {
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
          width: "100px",
          height: "100px",
          backgroundSize: "cover",
        }}
      ></div>
      <div>
        <p>
          {props.petition.desc.length > 100
            ? props.petition.desc.slice(0, 100) + "..."
            : props.petition.desc}
        </p>
        <p>
          {props.petition.signatures.length} have already signed this petition
        </p>
      </div>
    </Link>
  );
};

const mapDispatchToProps = {
  addVisit: petitionsActions.addVisit,
};

export default connect(null, mapDispatchToProps)(PetitionCard);
