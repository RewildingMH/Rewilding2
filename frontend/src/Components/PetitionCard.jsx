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
      <div
        style={{
          backgroundImage: `url(${props.petition.picture})`,
          width: "15vw",
          height: "20vh",
          backgroundSize: "cover",
          backgroundPosition:"center"
        }}
      ></div>
      <div className="titlePetition">
        <h2>{props.petition.title}</h2>
      </div>

      <div>
        <p>
          {props.petition.desc.length > 100
            ? props.petition.desc.slice(0, 100) + "..."
            : props.petition.desc}
        </p>
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
