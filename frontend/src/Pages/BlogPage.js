import React,  { useState, useEffect } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'
//import CommentArticle from '../Components/CommentArticle'
import { IconContext } from "react-icons"
import {BiPaperPlane} from 'react-icons/bi'


const BlogPage = (props) => {
  //cambiar por id de comments y comentario
  const [reload, setReload] = useState(false);
  console.log(props)
  // const [comment, setComment] = useState(
  //   props.loggedUser && { comment: "", id: id, token: props.loggedUser.token }
  // );
  
  // const readInput = (e) => {
  //   const artComment = e.target.value;
  //   setComment({
  //     comment: artComment.trim(),
  //     id: id,
  //     token: props.loggedUser.token,
  //   });
  // };

  // const newComment = async (e) => {
  //   e.preventDefault()
  //   if (props.loggedUser) {
  //     setReload(!reload);
  //     props.commentArticle(comment);
  //   } else {
  //     alert("must be logged");
  //   }
  // };

  useEffect(() => {
    props.getArticles();
  }, [])
  
  console.log(props)
  return (
    <>

    {props.articles && props.articles.map(({title, author, articleCategory, descripcion, comments }) => 
    
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <h1>{title}</h1>
            <div className="d-flex" >
              <img src={author[0].profilePicture} className="rounded-circle mr-3" style={{height: "25px", width:"25px"}} />
              <p>{author[0].name}</p>
            </div>
            <h3>{articleCategory}</h3>
            <p>{descripcion} </p>
{/* 
            <div>
              {comments.length ===0?<p className="rounded-pill text-center bg-light mx-auto">Be first to comment</p> : 
                comments.map((comment, index) => {
                  return <CommentArticle key={index} comment={comment}/>}) }
                    <div className="d-flex justify-content-center">
                      <input type="text" name="comment" autoComplete="off" 
                          placeholder={!props.loggedUser ?
                           "You need to be logged to comment!" :
                                 "Leave your comment"} 
                            disabled={!props.loggedUser && true}
                            onChange={'hola'}/>
                            <IconContext.Provider value={{size:'3em'}}>
                                <BiPaperPlane type="submit" onClick={'hola'}/>
                            </IconContext.Provider>
                        </div>                    
                    </div>
*/}
          </div> 
          <div className="col-6">
            <p>Aca va el listado de articulos </p>
          </div>
        </div>
      </div>
      ) 
      }
    </>
  );
};
const mapStateToProps = state => {
  return {
    articles: state.articleR.articles,
    loggedUser:state.authR.loggedUser
  }
}

const mapDispatchToProps = {
  getArticles: articleActions.getArticles,
  commentArticles: articleActions.commentArticle
}


export default BlogPage
/* export default connect(mapStateToProps, mapDispatchToProps)(BlogPage) */