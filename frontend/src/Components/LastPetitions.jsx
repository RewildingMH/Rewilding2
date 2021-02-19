import React from 'react'
import { BsPen } from "react-icons/bs";

const LastPetitions = (props) => {
    console.log(props)
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
        votes
    } = props.lastPetition
    return (
        <div className="lastPetitionsContainer">
            <img
            className="lastPetitionImg"
            src={picture}
            alt="petition-pic"
            />
            <div className="lastPetitionsInfo">
                <div className="d-flex justify-content-around"> 
                    <h5 className="lastPetitionsTitle">{title.toUpperCase().slice(0, 20)+"..."}</h5>
                    <p>Objetive: {goal} signs. <BsPen/></p>
                </div>
                <h6>{votes.length}</h6>
                <p>{author[0].name}</p>
            </div>
        </div>
    )
}

export default LastPetitions