import React,  { useState } from "react";
import { connect } from "react-redux";


const Blog = (props) => {
    const [signature, setSignature] = useState({});

    const readInput = (e) => {
      const reason = e.target.value;
      setSignature({
        reason: reason.trim(),
        petId: props.petititon._id,
        name: props.loggedUser.firstname,
        profilePicture: props.loggedUser.profilePicture,
      });
    };

  return (
    <>
      <div>
        <h2>Blog</h2>
        <input
        type="text"
        onChange={readInput}
        name=""
        placeholder="I'm signing because ... (optional) "
      />
      <textarea/>

      </div>
    </>
  );
};



export default Blog