import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import ArtComment from "./ArtComment"

const CommentArticle = (props) => {
  const [comment, setComment] = useState({});
  const [articlesComment, setArticlesComment] = useState([])

  const commentArt = props.articlecomment

  useEffect(() => {
    setArticlesComment(commentArt)
  }, [commentArt])

  const readInput = (e) => {
    const name = e.target.name;
    const newComment = e.target.value;
    setComment({
      ...comment,
      artId: props.article._id,
      token: props.loggedUser.token,
      [name]: newComment,
    })
  }

  const sendComment = (e) => {
    e.preventDefault()
    props.commentArticle(comment)
  }

  return (
    <>
      <div>
        {articlesComment.map(({ comment, profilePicture, name, _id, userId }) =>
          <ArtComment comment={comment} profilePicture={profilePicture} name={name} artId={props.article._id} commentId={_id} userId={userId} loggedUser={props.loggedUser} />
        )}
      </div>
      <div>
        <input type="text" name="comment" placeholder="Enter comment..." onChange={readInput} disabled={!props.loggedUser ? true : false} />
        <button onClick={props.loggedUser ? sendComment : () => alert("logueate")}>Submit</button>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.authR.loggedUser
  }
}

const mapDispatchToProps = {
  commentArticle: articleActions.commentArticle,

}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArticle)