import React,  {useState,  useEffect } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'
import {Link} from 'react-router-dom'



const BlogPage = (props) => {
  const [preloader, setPreloader]= useState(true)
  const [portada, setPortada]= useState([])
  const [portadaMini, setPortadaMini]= useState([])
  useEffect(() => {
    fetcheo()
    
  }, [])
  
  async function fetcheo() {
    await props.getArticles()
    setPortada (props.articles.slice(props.articles.length - 1, props.articles.length))
  setPortadaMini (props.articles.slice(props.articles.length - 2, props.articles.length- 1))
  setPreloader(false) 
 }  
console.log(portada[0])
  return (
    <>
      <div className="container-fluid bg-dark portadaBlog p-5">
        <div className="row m-5">
          <div className="col-8">
            {preloader?
              <div className="preloader">
                <div className="loader"></div>
              </div>
          :
              <Link to={`/blog/${portada[0]}`} className="text-decoration-none ">
                <img src={portada[0].picture} className="img-fluid portadaImg" />

                <p className="h3 mt-3 tituloBlog">{portada[0].title}</p>
              </Link>
          }
          
            
          </div>
          <div className="col-4">
          {preloader?
              <div className="preloader">
                <div className="loader"></div>
              </div>
          :
              <Link to="/blog" className="text-decoration-none ">
                <img src={portadaMini[0].picture} className="img-fluid" />
                <p className="h4 mt-3 tituloBlog">{portadaMini[0].title}</p>
              </Link>
          }
          
          </div>
        </div>
      </div>
    </>
  )
};
const mapStateToProps = state => {
  return {
    articles: state.articleR.articles,
  }
}

const mapDispatchToProps = {
  getArticles: articleActions.getArticles,
}



export default connect(mapStateToProps, mapDispatchToProps)(BlogPage) 
