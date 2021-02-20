import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CommentArticle from './CommentArticle'

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
              <h2>Investigations of the animal world</h2>
            </div>
            <div className="container-fluid bg-dark">
              <div className="container articleContainer">
                <div className="titleArticle">
                  <h1>{article.title}</h1>
                </div>
                <div className="columnArticlePic">
                  <div className="containerArticlePic">
                    <p className="categoryBlog text-white">{article.createdAt.slice(0, 10)} | {article.articleCategory}</p>
                    <img src={article.picture} className="picArticle"></img>
                    <div className="bottomArticle">
                      <img src={article.author[0].profilePicture} style={{margin:'1vh', width:'40px'}}></img>
                      <p className="textArticle">{`Author: ${article.author[0].name}. |`}</p>
                      <p className="textArticle">{` Created At: ${article.createdAt.slice(0, 10)} `}</p>
                    </div>
                  </div>
                </div>
                  <p className="textArticleDescription">{article.descripcion}</p>
                  <div>
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
