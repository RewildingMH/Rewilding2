import React,  {useState,  useEffect } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'
import {Link} from 'react-router-dom'



const BlogPage = (props) => {
  const [preloader, setPreloader]= useState(true)
  useEffect(() => {
    fetch()
  }, [])

 async function fetch () {
    await props.getArticles()
    setPreloader(false)
 }
 
  return (
    <>
    {props.allArticles && 
      <div className="container-fluid bg-dark portadaBlog p-5">
        <div className="row m-5">
            {preloader?
              <div className="preloader">
                <div className="loader"></div>
              </div>
            :
            <>
              <div className="col-8">
                <Link to={`/article/${props.articlePort[0]._id}`} className="text-decoration-none ">
                  <img src={props.articlePort[0].picture} className="img-fluid portadaImg" />
                  <div>
                    <p className="my-3 categoryBlog">| {props.articlePort[0].articleCategory} |</p>
                    <p className="h3 tituloBlog">{props.articlePort[0].title}</p>
                  </div>
                </Link>
              </div>
              <div className="col-4">
                <Link to={`/article/${props.articlePortMini[0]._id}`} className="text-decoration-none ">
                  <img src={props.articlePortMini[0].picture} className="img-fluid" />
                  <p className="my-3 categoryBlog">| {props.articlePortMini[0].articleCategory} |</p>        
                  <p className="h4 tituloBlog">{props.articlePortMini[0].title}</p>
                </Link>                  
              </div>
              {props.articlesList.map(({_id, picture, title, articleCategory }) =>{
                return(
                      <>
                        <div className="col-4">             
                          <Link to={`/article/${_id}`} className="text-decoration-none ">
                            <img src={picture} className="img-fluid" />
                            <p className="my-3 categoryBlog">| {articleCategory} |</p>
                            <p className="h4 bg-dark tituloBlog">{title}</p>
                          </Link>                       
                        </div>
                      </> 
                    )
                  })
                }
           </>
          }
          
            
       
          {/* 
       */}
        </div>
      </div>
    }
    </>
  )
};
const mapStateToProps = state => {
  return {
    allArticles: state.articleR.allArticles,
    articlePort: state.articleR.articlePort,
    articlePortMini: state.articleR.articlePortMini,
    articlesList: state.articleR.articlesList,
  }
}

const mapDispatchToProps = {
  getArticles: articleActions.getArticles,
}



export default connect(mapStateToProps, mapDispatchToProps)(BlogPage) 
