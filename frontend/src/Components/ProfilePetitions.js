import React from 'react'
import { BsPen } from "react-icons/bs";
import { ProgressBar } from 'react-bootstrap';

export const ProfilePetitions = ({ petition }) => {
    const { author, goal, picture, title, votes, signatures } = petition
    return (
        <div className="container">
            <div className="lastPetitionsContainer">
                <div className="lastPetitionImgPetitionCard" style={
                    {
                        backgroundImage: `url(${picture})`
                    }
                }></div>
                <div className="lastPetitionsInfo">
                    <div className="userInfo">
                        <h6 className="petitionCreatedBy"><span>Petition created by: </span>{author[0].name}</h6>
                        <div className="petitionCreatedImg" style={
                            {
                                backgroundImage: `url(${author[0].profilePicture})`
                            }
                        }></div>
                    </div>
                    <h5 className="lastPetitionsTitle">{title.toUpperCase()}</h5>
                    <ProgressBar striped variant="success" animated now={signatures.length} max={goal} />
                    <h6 className="peopleSign"><span>
                        {signatures.length
                            ? signatures.length === 1
                                ? signatures.length +
                                " person has already signed this petition"
                                : signatures.length +
                                " persons have already signed this petition"
                            : "No one has signed this petition yet"}</span> a goal {goal} signs <BsPen />
                    </h6>
                </div>
            </div>
        </div>
    )
}