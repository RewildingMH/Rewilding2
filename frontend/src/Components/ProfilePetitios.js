import React from 'react'

export const ProfilePetitios = ({petition}) => {
    console.log(petition)
    return (
        <div>            
                <div>
                    <p>{petition.title}</p>
                    <p>{petition.desc}</p>
                    <p>{petition.createdAt}</p>
                    <p>{petition.destination}</p>
                    <hr></hr>
                </div>           
        </div>
    )
}
