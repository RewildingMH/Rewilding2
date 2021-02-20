import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import articleActions from "../redux/actions/articleActions";


const LastArticles = (props) => {
  const {
    articleCategory,
    articleLikes,
    author,
    comments,
    createdAt,
    descripcion,
    picture,
    title,
    updatedAt,
    visits,
    _id,
  } = props.lastArticle;


const addVisit = e => {  
  props.sendAddVisit(e.target.id)
}

  return (
    <Link onClick={addVisit}
      to={`/article/${_id}`} id={_id}
      className="lastArticlesCard text-decoration-none"
      style={{
        backgroundImage: `url(${picture})`,
      }}
      
    >
      <div  style={{ width: "100%" }}>
        <p className="articleDate">
          {createdAt.slice(0, 10)} | {articleCategory}
        </p>
        <h5 className="lastArticleTitle">{title.slice(0, 50) + "..."}</h5>
        <div className="lastArticlesInfo">
          <p className="lastArticleAuthor">
            <span>By:</span>
            {" " + author[0].name}
          </p>
        </div>
      </div>
    </Link>
  );
};


const mapDispatchToProps = {
  sendAddVisit: articleActions.addVisit}

export default connect(null, mapDispatchToProps)(LastArticles);
