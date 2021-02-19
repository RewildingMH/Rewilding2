import React from 'react'

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
        <div className="lastPetitionsContainer" style={{
            backgroundImage: `url(${picture})`
        }}>
            <h5>{title}</h5>
            <h6>{goal}</h6>
            <p>{author[0].name}</p>
        </div>
    )
}

export default LastPetitions