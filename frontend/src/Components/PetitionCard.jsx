import React from "react";
import { Link } from "react-router-dom";
import petitionsActions from "../redux/actions/petitionsActions";
import { connect } from "react-redux";
import { BsPen } from "react-icons/bs";
import { ProgressBar } from "react-bootstrap";

//COMPONENTE QUE RECIBE DE SU PADRE TODAS LAS PETICIONES MAPEADAS Y LAS RENDERIZA
const PetitionCard = (props) => {
  //FUNCIÓN PARA SUMAR VISITAS A CADA PETICIÓN CUANDO SE LE HACE CLIC
  const addVisit = (e) => {
    const id = props.petition._id;
    props.addVisit(id);
  };
  const {
    author,
    createdAt,
    desc,
    destination,
    goal,
    limitDate,
    picture,
    reasons,
    signatures,
    title,
    updatedAt,
    visits,
    votes,
  } = props.petition;
  return (
    <Link
      to={`/petitions/${props.petition._id}`}
      onClick={addVisit}
      className="text-decoration-none"
    >
      <div className="container">
        <div className="lastPetitionsContainer">
          <div
            className="lastPetitionImgPetitionCard"
            style={{
              backgroundImage: `url(${picture})`,
              height: '40vh'
            }}
          ></div>
          <div className="lastPetitionsInfo">
            <div className="userInfo">
              <h6 className="petitionCreatedBy">
                <span>Petition created by: </span>
                {author[0].name}
              </h6>
              <div
                className="petitionCreatedImg"
                style={{
                  backgroundImage: `url(${author[0].profilePicture})`,
                }}
              ></div>
            </div>
            <h5 className="lastPetitionsTitle">{title.toUpperCase()}</h5>
            <p>
              {props.petition.desc.length > 100
                ? props.petition.desc.slice(0, 70) + "..."
                : props.petition.desc}
            </p>
            <ProgressBar
              striped
              variant="success"
              animated
              now={signatures.length}
              max={goal}
              className="progressBar"
              style={{marginBottom: '2vh'}}
            />
            {signatures.length === goal ? (
              <div className="completedCardCtn">
                <h5 className="cardGoalReached">COMPLETED</h5>
              </div>
            ) : (
              ""
            )}
            <h6 className="peopleSign">
              <span>
                {props.petition.signatures.length
                  ? props.petition.signatures.length === 1
                    ? props.petition.signatures.length +
                      " person has already signed this petition"
                    : props.petition.signatures.length +
                      " persons have already signed this petition"
                  : "No one has signed this petition yet"}
              </span>{" "}
              for a goal of {goal} signs <BsPen />
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

const mapDispatchToProps = {
  addVisit: petitionsActions.addVisit,
};

export default connect(null, mapDispatchToProps)(PetitionCard);
