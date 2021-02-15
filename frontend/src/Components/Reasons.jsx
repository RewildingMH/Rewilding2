import React from "react";

export const Reasons = ({reasons}) => {
  return (
    <div>
      {reasons.map(({name, profilePicture, reason}) => 
      <div style={{ display: "flex" }}>
      <>
      <div
        style={{
          backgroundImage: `url(${profilePicture})`,
          width: "100px",
          height: "100px",
        }}
      ></div>
      <h5>{name}</h5>
      <p>{reason}</p>
   
      </> 
    </div>           
      
      )}
        
    </div>
  );
};
