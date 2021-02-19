import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import { IconContext } from "react-icons"
import { BiPaperPlane, BiTrash, BiEdit, BiBlock } from 'react-icons/bi'

const CommentArticle = (props) => {
    const [comment, setComment] = useState({});

    const readInput = (e) => {
        const name = e.target.name;
        const newComment = e.target.value;
        setComment({
<<<<<<< HEAD
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
     console.log(props)
      const deleteComment = (e) => {
        e.preventDefault()
        props.deleteArticle({
          artId: props.article._id,
          token: props.loggedUser.token,
          commentId: e.target.id
        })
      }

      return(
            <>
            <div>
              {props.articlecomment.map(({comment, profilePicture, name, _id}) => 
              <>
              <img src={profilePicture}></img>
              <p>{name}</p>
              <p>{comment}</p>
              <div>
              <button id={_id} onClick={deleteComment}>delete</button>
              </div>
              </>
              )}
            </div>
            <div>
                <input type="text" name="comment" placeholder ="New Comment" onChange={readInput}/>
                <button onClick={sendComment}>Submit</button>
            </div>
            </>
            )
=======
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
>>>>>>> 8e758028b4e943b274f108f3924cc7d794cf829f
}

const mapStateToProps = state => {
    return {
        loggedUser: state.authR.loggedUser
    }
}

const mapDispatchToProps = {
    commentArticle: articleActions.commentArticle,
    deleteArticle: articleActions.deleteArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArticle)