import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Posts from "../Components/Posts";
import petitionsActions from "../redux/actions/petitionsActions";
import articleActions from "../redux/actions/articleActions";
import { Link } from "react-router-dom";
import communityPic from "../assets/communityImg.png";
import "../styles/community.css";

const Community = (props) => {
  const [popular, setPopular] = useState([]); // Estado para guardar las peticiones más populares
  const { allPetitions } = props; // Destructuración

  // Ordena las peticiones por visitas, de mayor a menor
  useEffect(() => {
    setPopular(allPetitions.sort((a, b) => b.visits - a.visits));
  }, [allPetitions]);

  // Llama a todas las peticiones y todos los articulos cuando se monta el componente
  useEffect(() => {
    props.getPetitions();
    props.getArticles();
  }, []);

  return (
    <div className="communityContainer">
      <div
        className="communityBanner"
        style={{
          backgroundImage: `url(${communityPic})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="communityContainerBelow">
        <div className="comunityEntry align-items-start">
          <div
            className="col-2 card popularPetitions"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="sideCardsTitle">
              <h3>Popular Petitions</h3>
            </div>
            <div className="sideCardsContainer">
              {popular.slice(0, 3).map(({ title, picture, _id }) => (
                <Link
                  key={_id}
                  className="popularPetitionCard"
                  to={`/petitions/${_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card">
                    <div
                      className="communityImg card-img-top"
                      style={{
                        backgroundImage: `url(${picture})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <h5 className="cardTitle">{title}</h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-8 d-flex justify-content-center allPostsContainerContainer">
            <div className="w-100 allPostsContainer">
              <Posts />
            </div>
          </div>
          <div
            className="col-2 card popularPetitions"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div className="sideCardsTitle">
              <h3>Latest Blog Entries</h3>
            </div>
            <div className="sideCardsContainer">
              {props.articles
                .slice(props.articles.length - 3, props.articles.length)
                .map(({ title, picture, _id }) => (
                  <Link
                    key={_id}
                    className="popularPetitionCard"
                    to={`/article/${_id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div className="card">
                      <div
                        className="communityImg card-img-top"
                        style={{
                          backgroundImage: `url(${picture})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <h5 className="card-title cardTitle">
                          {title.length > 30
                            ? title
                                .split(" ")
                                .slice(0, 5)
                                .join()
                                .replace(/,/g, " ") + "..."
                            : title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// *Se aplica el metodo slice para obtener solo 3 de todas las peticiones/articulos

// Lee todas las peticiones, los articulos y el usuario logueado
const mapStateToProps = (state) => {
  return {
    allPetitions: state.petitionsR.allPetitions,
    loggedUser: state.authR.loggedUser,
    articles: state.articleR.allArticles,
  };
};

// Lee las actions para traer todas las peticiones y los articulos
const mapDispatchToProps = {
  getPetitions: petitionsActions.getPetitions,
  getArticles: articleActions.getArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Community);
