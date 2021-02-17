import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import articleActions from '../redux/actions/articleActions'

const Article = (props) =>{

    
    const id = props.match.params.id

    useEffect(() => {
        props.singleArticle(id)
    }, [])

    console.log(props)

    return (
        <div>
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