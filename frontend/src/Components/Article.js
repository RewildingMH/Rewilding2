import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import articleActions from '../redux/actions/articleActions'

const Article = () =>{
    const [article, setArticle] = useState({});
    const id = req.match.params.id
    
    useEffect(() => {
        setArticle(singleArticle.filter((article) => article._id === id));
        props.singleArticle.length === 0 && props.history.push("/petitions");
      }, [id, singleArticle]);

    return (
        <div>
       {article.length && (
        <>
        <h1>{article[0].title}</h1>
        <p>{article[0].author[0].name}</p>
        <h4>{article[0].articleCategory}</h4>
        <p>{article[0].descripcion}</p>
        </>
       )}
       </div>
    )
}

const mapStateToProps = state => {
    return {
        singleArticle: state.articleR.articles
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article)