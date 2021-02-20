import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import ArtComment from "./ArtComment"
import {AiOutlineSend} from "react-icons/ai";

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
      <div className="commentsMapArticleContainer p-3">
        <div className="commentsMap">
        {articlesComment.map(({ comment, profilePicture, name, _id, userId }) =>
          <ArtComment comment={comment} profilePicture={profilePicture} name={name} artId={props.article._id} commentId={_id} userId={userId} loggedUser={props.loggedUser} />
        )}
      </div>
      <div className="inputContainer">
        <input className="inputContainer" type="text" autoComplete="off" name="comment" placeholder="Enter comment..." onChange={readInput} disabled={!props.loggedUser ? true : false} />
          <div className="sendButton">
            <AiOutlineSend
              onClick={props.loggedUser ? sendComment : () => alert("Log in...")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  )
}



          // <div className="commentsMapContainer">
          //   <div className="commentsMap">
          //     {post.comments.length ? (
          //       post.comments.map(
          //         ({ comment, name, profilePicture, _id, userId }) => (
          //           <artComment
          //             key={_id}
          //             comment={comment}
          //             name={name}
          //             profilePicture={profilePicture}
          //             commentId={_id}
          //             artId={props.artcle._id}
          //             userId={userId}
          //           />
          //         )
          //       )
          //     ) : (
          //       <div className="noComments">
          //         <div
          //           style={{
          //             backgroundImage: `url(${noCommentsPlaceholder})`,
          //           }}
          //           className="noCommentsPlaceholder"
          //         ></div>
          //         <span>No comments yet!</span>
          //       </div>
          //     )}
          //   </div>
          // </div>


const mapStateToProps = state => {
  return {
    loggedUser: state.authR.loggedUser
  }
}

const mapDispatchToProps = {
  commentArticle: articleActions.commentArticle,

}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArticle)