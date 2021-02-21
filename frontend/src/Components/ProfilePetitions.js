import React from 'react'
import { BsPen } from "react-icons/bs";
import { ProgressBar } from 'react-bootstrap';

export const ProfilePetitions = ({ petition }) => {
    const { author, goal, picture, title, votes, signatures } = petition
    return (
        <div className="lastPetitionsContainerProfile">
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
                <ProgressBar striped variant="success" animated now={signatures.length}
                    max={goal} />
                <h6 className="peopleSign"><span>{votes.length} people have signed</span> a goal {goal} signs <BsPen /></h6>
            </div>
        </div>
    )
}
