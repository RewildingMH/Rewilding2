import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import { IconContext } from "react-icons"
import { BiPaperPlane, BiTrash, BiEdit, BiBlock } from 'react-icons/bi'

const CommentArticle = (props) => {
    const [comment, setComment] = useState({});

    const readInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setComment({
            ...comment,
            id: props.article[0]._id,
            token: props.loggedUser.token,
            [name]: value,
        })
    }
    console.log(comment)

    const sendComment = (e) => {
        e.preventDefault()
        props.commentArticle(comment)
    }

    return (<div>
        <input type="text" name="comments" placeholder="New Comment" onChange={readInput} />
        <button onClick={sendComment}>Submit</button>
    </div>)
}

const mapStateToProps = state => {
    return {
        loggedUser: state.authR.loggedUser
    }
}

const mapDispatchToProps = {
    commentArticle: articleActions.commentArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArticle)