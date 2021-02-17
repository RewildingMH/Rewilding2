import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import articleActions from '../redux/actions/articleActions'

const Article = (props) =>{
    // const [article, setArticle] = useState({});
    // const id = req.match.params.id
    
    const id = props.match.params.id

    useEffect(() => {
        props.singleArticle(id)
    }, [])

    console.log(props)

    return (
        <div>
        <h1>{props.articles.title}</h1>
        <h4>{'hola'}</h4>
        <p>{'hola'}</p>
       </div>
    )
}

const mapStateToProps = state => {
    return {
      articles: state.articleR.articles,
    }
  }

const mapDispatchToProps = {
    singleArticle: articleActions.singleArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)