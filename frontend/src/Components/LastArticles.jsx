import React from 'react'
import {Link} from 'react-router-dom'

const LastArticles = (props) => {
    const { articleCategory, 
            articleLikes, 
            author, 
            comments, 
            createdAt, 
            descripcion, 
            picture, 
            title, 
            updatedAt, 
            visits, 
            _id} = props.lastArticle
    return (
        <Link to={`/article/${_id}`} className="lastArticlesCard text-decoration-none" style={{
            backgroundImage: `url(${picture})`
        }}> 
            <div>
                <p className="articleDate">{createdAt.slice(0, 10)} | {articleCategory}</p>
                <div className="lastArticlesInfo">
                    <p className="lastArticleAuthor"><span>Autor:</span>{" "+author[0].name}</p>
                    <p className="lastArticleVisits"><span>Visits:</span>{" "+visits}</p>
                </div>
                <h5 className="lastArticleTitle">{title.slice(0, 50)+"..."}</h5> 
            </div>
        </Link>
    )
}

export default LastArticles