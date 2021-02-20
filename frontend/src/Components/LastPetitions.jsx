import React from 'react'
import { BsPen } from "react-icons/bs";
import { ProgressBar } from 'react-bootstrap';

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
        <div className="container">
            <div className="lastPetitionsContainer">
                <img
                className="lastPetitionImg"
                src={picture}
                alt="petition-pic"
                />
                <div className="lastPetitionsInfo">
                    <div className="userInfo">
                        <h6 className="petitionCreatedBy"><span>Petition created by: </span>{author[0].name}</h6>
                        <img
                            className="lastPetitionUserImg"
                            src={author[0].profilePicture}
                            alt="petition-pic"
                            />
                    </div>
                    <h5 className="lastPetitionsTitle">{title.toUpperCase()}</h5>
                    <ProgressBar striped variant="success" animated now={45} />
                    <h6 className="peopleSign"><span>{votes.length} people have signed</span> a goal {goal} signs <BsPen/></h6>
                </div>
            </div>
        </div>

    )
}

export default LastPetitions