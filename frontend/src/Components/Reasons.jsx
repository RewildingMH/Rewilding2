import React from "react";

export const Reasons = (reason) => {
  return (
    <div>
      {reason.reason.map(({ reason, name, profilePicture }) => (
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundImage: `url(${profilePicture})`,
              width: "100px",
              height: "100px",
            }}
          ></div>
          <h5>{name}</h5>
          <p>{reason}</p>
        </div>
      ))}
    </div>
  );
};
