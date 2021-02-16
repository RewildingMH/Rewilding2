import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Posts from "../Components/Posts";
import petitionsActions from "../redux/actions/petitionsActions";
import articleActions from "../redux/actions/articleActions";

const Community = (props) => {
  const [popular, setPopular] = useState([]);
  const { allPetitions } = props;

  useEffect(() => {
    setPopular(allPetitions.sort((a, b) => b.visits - a.visits));
  }, [allPetitions]);

  console.log(props);

  useEffect(() => {
    props.getPetitions();
    props.getArticles();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <div>
        {popular.slice(0, 3).map(({ title, picture }) => (
          <>
            <div
              style={{
                backgroundImage: `url(${picture})`,
                width: "100px",
                height: "100px",
                backgroundSize: "cover",
              }}
            ></div>
            <p>{title}</p>
          </>
        ))}
      </div>
      <Posts />
      <div>latest blog entries</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPetitions: state.petitionsR.allPetitions,
    loggedUser: state.authR.loggedUser,
    articles: state.articleR.articles,
  };
};
const mapDispatchToProps = {
  getPetitions: petitionsActions.getPetitions,
  getArticles: articleActions.getArticles,
};
export default connect(mapStateToProps, mapDispatchToProps)(Community);
