import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import articleActions from '../redux/actions/articleActions'
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

  useEffect(() => {
    if (props.allArticles.length > 0) {
      setArticle(allArticles.filter((article) => article._id === id));
    }
  }, [id])

  return (
    <div style={{ paddingTop: '10vh' }} className="container-fluid bg-dark portadaBlog p-5">
      {article.length > 0 &&
        article.map(article =>
          <div className="col-9">
            <h1 className="titleArticle">{article.title}</h1>
            <h3 className="textArticle">Category: {article.articleCategory}</h3>
            <div style={{ display: 'flex' }}>
              <p className="textArticle">Author: {article.author[0].name}</p>
              <img src={article.author[0].profilePicture} width="40vw"></img>
              <p className="textArticle">Created At: {article.createdAt.slice(0, 10)}</p>
            </div>
            <img src={article.picture} className="picArticle"></img>
            <p className="textArticle">Visits: {article.visits}</p>
            <p>{`${article.descripcion.slice(0, 700)}...`}</p>
            <CommentArticle article={article} articlecomment={article.comments} />
          </div>
        )
      }
        
       </div>
    )
}

const mapStateToProps = state => {
  return {
    allArticles: state.articleR.allArticles,
  }
}

export default connect(mapStateToProps)(Article)
