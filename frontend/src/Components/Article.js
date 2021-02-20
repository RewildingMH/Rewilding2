import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CommentArticle from './CommentArticle'
import { BiComment } from "react-icons/bi";


const Article = (props) =>{
    const [preloader, setPreloader]= useState(false)
    const [article, setArticle] = useState({});
    
    const id = props.match.params.id
    const {allArticles} = props
    useEffect(() => {
        if(props.allArticles.length > 0){
          setArticle(allArticles.filter((article) => article._id === id));
        }
    }, [id, allArticles])

  return (
    <>
    <div className="portadaArticle">
    <div className="portadaBanner">
        <h3>
          At Rewilding there is a great job behind each campaign and we want to share it with you through this space.
        </h3>
      </div>
    </div>
      {article.length > 0 &&
        article.map(article =>
          <div>
            <div className="containerBanner">
              <h2>{article.articleCategory}</h2>
            </div>
            <div className="container-fluid bg-dark">
              <div className="container articleContainer">
                <div className="titleArticle">
                  <h1>{article.title}</h1>
                </div>
                <div className="columnArticlePic">
                  <div className="containerArticlePic">
                    <p className="categoryBlog text-white">{article.createdAt.slice(0, 10)}</p>
                    <img src={article.picture} className="picArticle"></img>
                    <div className="authorContainerArticle">
                      <div className="authorAlignArticle">
                        <img src={article.author[0].profilePicture} className="authorArticlePicture rounded-circle"></img>
                        <p className="authorArticleName">{`Author: ${article.author[0].name}.`}</p>
                      </div>
                      <BiComment className="commentIconArticle" href='boxId' />
                    </div>
                  </div>
                </div>
                <div className="articleDescription">
                  <p className="textArticleDescription">{article.descripcion}</p>
                </div>
                <div id='boxId'>
                  <CommentArticle article={article} articlecomment={article.comments}/>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    allArticles: state.articleR.allArticles,
  }
}

export default connect(mapStateToProps)(Article)
