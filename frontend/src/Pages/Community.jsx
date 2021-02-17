import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Posts from "../Components/Posts";
import petitionsActions from "../redux/actions/petitionsActions";
import articleActions from "../redux/actions/articleActions";
import { Link } from "react-router-dom";

const Community = (props) => {
  const [popular, setPopular] = useState([]);
  const { allPetitions } = props;

  useEffect(() => {
    setPopular(allPetitions.sort((a, b) => b.visits - a.visits));
  }, [allPetitions]);

  useEffect(() => {
    props.getPetitions();
    props.getArticles();
  }, []);

  console.log(props);

  return (
    <>
      <div className="communityBanner"></div>
      <div className="comunityContainer">
        <div className="comunityEntry align-items-start">
          <div
            className="col-2 card"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3>Popular Petitions</h3>
            {popular.slice(0, 3).map(({ title, picture, desc, _id }) => (
              <Link to={`/petitions/${_id}`}>
                <div className="card">
                  <div
                    className="communityImg card-img-top"
                    style={{ backgroundImage: `url(${picture})` }}
                  ></div>
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">
                    {desc.length > 70 ? desc.slice(0, 70) + "..." : desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="col-8 d-flex justify-content-center">
            <div className="w-100 px-5">
              <Posts />
            </div>
          </div>
          <div className="col-2 card">
            <h3>Latest Blog Entries</h3>

            {props.articles
              .slice(props.articles.length - 3, props.articles.length)
              .map(({ title, picture }) => (
                <>
                  <div className="communityInfo">
                    <div
                      className="communityImg"
                      style={{ backgroundImage: `url(${picture})` }}
                    ></div>
                    <p>{title}</p>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allPetitions: state.petitionsR.allPetitions,
    loggedUser: state.authR.loggedUser,
    articles: state.articleR.allArticles,
  };
};
const mapDispatchToProps = {
  getPetitions: petitionsActions.getPetitions,
  getArticles: articleActions.getArticles,
};
export default connect(mapStateToProps, mapDispatchToProps)(Community);
