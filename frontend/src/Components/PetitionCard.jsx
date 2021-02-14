import React from "react";
import { Link } from "react-router-dom";

export const PetitionCard = (props) => {
  return (
    <Link>
      <h2>Petition</h2>
      <h3>{props.title}</h3>
    </Link>
  );
};
