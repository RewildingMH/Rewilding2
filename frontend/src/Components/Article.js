import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CommentArticle from './CommentArticle'
import { BiComment } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import Footer from './Footer';


const Article = (props) => {
  const [preloader, setPreloader] = useState(false)
  const [article, setArticle] = useState({});

  const id = props.match.params.id
  const { allArticles } = props

  useEffect(() => {

    if (props.allArticles.length > 0) {
      setArticle(allArticles.filter((article) => article._id === id));
    } else {
      props.history.push('/blog')
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
              <div className="articleContainer" >
                <div className="titleArticle">
                  <h1>{article.title}</h1>
                </div>
                <div className="columnArticlePic" style={{ width: '100 %' }}>
                  <div className="containerArticlePic" style={{ width: '100 %' }}>
                    <p className="categoryBlog text-white">{article.createdAt.slice(0, 10)}</p>

                    <div className="d-flex justify-content-center" style={{ height: "30rem" }}>
                      <div style={{ backgroundImage: `url(${article.picture})`, width: "100%", height: "100%", backgroundPosition: "center", backgroundSize: "cover" }}></div>

                    </div>
                    <div className="authorContainerArticle">
                      <div className="authorAlignArticle">
                        <img src={article.author[0].profilePicture} className="authorArticlePicture"></img>
                        <p className="authorArticleName"><span>Author: </span>{article.author[0].name}</p>
                      </div>
                      <div className="containerCommentIconArticle">
                        <div className="iconArticle">
                          <AiOutlineEye className="viewIconArticle" />
                          <p className="articleVisits text-warning">{`${article.visits}`}</p>
                        </div>
                        <div className="iconArticle">
                          <BiComment className="viewIconArticle" />
                          <p className="pt-2 px-2 text-warning">{article.comments.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="articleDescription">
                  <p className="textArticleDescription">{article.descripcion}</p>
                  <div className="commentArticleContainerMain my-4">
                    <div>
                      <CommentArticle article={article} articlecomment={article.comments} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  return {
    allArticles: state.articleR.allArticles,
  }
}

export default connect(mapStateToProps)(Article)
