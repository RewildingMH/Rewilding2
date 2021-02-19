import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import { IconContext } from "react-icons"
import { BiPaperPlane, BiTrash, BiEdit, BiBlock } from 'react-icons/bi'

const CommentArticle = (props) => {
    const [comment, setComment] = useState({});
    const [reComment, setReComment] = useState({})
    const [visible, setVisible] = useState(true)

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
     console.log(props)
      const deleteComment = (e) => {
        e.preventDefault()
        props.deleteComment({
          artId: props.article._id,
          token: props.loggedUser.token,
          commentId: e.target.id
        })
      }

      const modifyComment = (e) => {
        const name = e.target.name
        const newComment = e.target.value
        setReComment({
          ...reComment,
          commentId: e.target.id,
          artId: props.article._id,
          token: props.loggedUser.token,
          [name]: newComment
        })
      }

      const updateComment = async (e) => {
        e.preventDefault()
        if(reComment.editComment === undefined){
          setVisible(!visible)
          return false
        }
        await props.editComment(reComment)
      }

      return(
            <>
            <div>
              {props.articlecomment.map(({comment, profilePicture, name, _id}) => 
              <>
              <img src={profilePicture}></img>
              <div>
                <button id={_id} onClick={deleteComment}>delete</button>
                <button onClick={() => setVisible(!visible)}>edit</button>
              </div>
              <p className="textArticle">{name}</p>
              
              {visible ? 
              <p className="textArticle">{comment}</p>
              :
              <>
              <input id={_id} name="editComment" type="text" defaultValue={comment} onChange={modifyComment} />
               <button className="" onClick={updateComment}>send</button>
              </>
              }
              </>
              )}
            </div>
            <div>
                <input type="text" name="comment" placeholder="Enter comment..." onChange={readInput}/>
                <button onClick={sendComment}>Submit</button>
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
    deleteComment: articleActions.deleteComment,
    editComment: articleActions.editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArticle)