import React from "react";
import Reason from "./Reason";

// cambiar alertas por alertas lindas
// cambiar botones x botones lindos

// esto son las razones por las que la gente firma
// renderizan debajo de la petition (si tienen texto)

const Reasons = ({ reasons, petId }) => {
  return (
    <div>
      {reasons
        .map((reason) => {
          return <Reason reasons={reason} petId={petId} />;
        })
        .reverse()}
    </div>
  );
};

export default Reasons;
