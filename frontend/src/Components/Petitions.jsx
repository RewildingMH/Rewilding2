import React from 'react'
import { connect } from 'react-redux'
import PetitionCard from './Petition'

const Petitions = (props) => {

  const sumarVisita = () => {
    //visitas en la BD +1
  }

  return (
    <div>
      <h2>Petitions</h2>
      {props.petitions.map(petition => {
        <PetitionCard onClick={sumarVisita} petition={petition}/>
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allPetitions: state.petitionsR.allPetitions,
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  getPetitions: petitionsActions.getPetitions,
  addVisit: petitionsActions.addVisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Petitions)
