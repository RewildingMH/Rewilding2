import React,  {useState,  useEffect } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'
import {Link} from 'react-router-dom'
import LastArticles from '../Components/LastArticles'
import bannerBlog from '../assets/bannerBlog.png'



const BlogPage = (props) => {
  const [preloader, setPreloader]= useState(true)
  useEffect(() => {
    fetch()
  }, [])

 async function fetch () {
    await props.getArticles()
    setPreloader(false)
 }

const addVisit = e => {
  props.sendAddVisit(e.target.id)
}
  return (
    <>
    {preloader?
      <div className="preloader">
        <div className="loader"></div>
      </div>
    :
      <>
        <div className="portadaBlog" style={{ backgroundImage: `url(${bannerBlog})`, backgroundPosition: "center", backgroundSize: "cover" }}>
          {/* <div className="portadaBanner">
            <h3>
              At Rewilding there is a great job behind each campaign and we want to share it with you through this space.
            </h3>
          </div> */}
        </div>
        <div className="container-fluid mt-3">
          <div className="container" >
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-7 bg-greenLight p-4 d-flex justify-content-center ">
                    <div>
                      <p className="categoryBlog">{props.articlePort[0].createdAt.slice(0, 10)} | {props.articlePort[0].articleCategory}</p>
                      <Link to={`/article/${props.articlePort[0]._id}`} className="text-decoration-none"  onClick={addVisit}>
                        <p id={props.articlePort[0]._id} className="h1 tituloBlog">{props.articlePort[0].title}</p>
                        <p className="descripcionBlog">{props.articlePort[0].descripcion.slice(0, 170)+"..."}</p>
                      </Link>
                    </div>
                  </div>
                  <div className="col-5 d-flex align-items-center">
                    <Link to={`/article/${props.articlePort[0]._id}`} className="text-decoration-none"  onClick={addVisit}>
                      <img id={props.articlePort[0]._id} src={props.articlePort[0].picture} className="img-fluid scale-img" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-5 d-flex align-items-center">
                    <Link to={`/article/${props.articlePortMini[0]._id}`}  className="text-decoration-none" onClick={addVisit}>
                      <img id={props.articlePortMini[0]._id} src={props.articlePortMini[0].picture} className="img-fluid scale-img" />
                    </Link>
                  </div>
                  <div className="col-7 bg-greenLight p-4 d-flex justify-content-center ">
                    <div>
                      <p className="categoryBlog">{props.articlePortMini[0].createdAt.slice(0, 10)} | {props.articlePortMini[0].articleCategory}</p>
                      <Link to={`/article/${props.articlePortMini[0]._id}`} className="text-decoration-none"  onClick={addVisit}>
                        <p id={props.articlePortMini[0]._id} className="h1 tituloBlog">{props.articlePortMini[0].title}</p>
                        <p className="descripcionBlog">{props.articlePortMini[0].descripcion.slice(0, 170)+"..."}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bannerLatest my-3">
                    <h2>Last Articles Created</h2>
                </div>
          <div className="container">
              <div className="row">     
                <div className="articlesList">
                    {props.articlesList.map(lastArticle => <LastArticles key={lastArticle._id} lastArticle={lastArticle}/>)}  
                </div>
              </div>
            </div>
        </div>

      </>}
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
  sendAddVisit: articleActions.addVisit
}



export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)





