import React from 'react'
import {Link} from 'react-router-dom'

const LastArticles = (props) => {
    const { articleCategory, 
            author, 
            createdAt, 
            picture, 
            title, 
            _id} = props.lastArticle
    return (
        <Link to={`/article/${_id}`} className="lastArticlesCard text-decoration-none" style={{
            backgroundImage: `url(${picture})`
        }}> 
            <div>
                <p className="articleDate">{createdAt.slice(0, 10)} | {articleCategory}</p>
                <h5 className="lastArticleTitle">{title.slice(0, 50)+"..."}</h5> 
                <div className="lastArticlesInfo">
                    <p className="lastArticleAuthor"><span>By:</span>{" "+author[0].name}</p>
                </div>
            </div>
        </Link>
    )
}

export default LastArticles