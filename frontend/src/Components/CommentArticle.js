import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import ArtComment from "./ArtComment"
import { AiOutlineSend } from "react-icons/ai";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";



const CommentArticle = (props) => {
  const [comment, setComment] = useState({});
  const [articlesComment, setArticlesComment] = useState([])

  const commentArt = props.articlecomment
  const history = useHistory();


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
    if (!props.loggedUser) {
      Swal.fire({
        title: "Oops!",
        text: "You must be logged in to comment on this post!",
        icon: "warning",
        confirmButtonColor: "#c1866a",
        confirmButtonText: "Log me in!",
        background: "#4b98b7",
        iconColor: "white",
        backdrop: "rgba(80, 80, 80, 0.3)",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      })
    } else if (!comment.comment) {
      Swal.fire({
        title: "Oops!",
        text: "Comment must not be empty!",
        icon: "warning",
        background: "#4b98b7",
        iconColor: "white",
        backdrop: "rgba(80, 80, 80, 0.3)",
      })
    } else {
      setComment({})
      e.preventDefault()
      props.commentArticle(comment)
    }

  }

  const mustLogin = () => {
    Swal.fire({
      title: "Oops!",
      text: "You must be logged in to comment on this post!",
      icon: "warning",
      confirmButtonColor: "#c1866a",
      confirmButtonText: "Log me in!",
      background: "#4b98b7",
      iconColor: "white",
      backdrop: "rgba(80, 80, 80, 0.3)",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login");
      }
    })
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
          <input type="text" autoComplete="off" name="comment" placeholder="Enter comment..." value={comment.comment ? comment.comment : ""} onChange={readInput} disabled={!props.loggedUser ? true : false} style={{ border: "1px solid black" }} />
          <div className="sendButton" onClick={props.loggedUser ? sendComment : () => mustLogin()} style={{ cursor: "pointer" }}>
            <AiOutlineSend />
          </div>
        </div>
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