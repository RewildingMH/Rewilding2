import React, { useState } from 'react'
import { connect } from 'react-redux';
import articleActions from '../redux/actions/articleActions';
import {AiFillDelete, AiTwotoneEdit, AiOutlineSend} from "react-icons/ai";

const ArtComment = ({ comment, profilePicture, name, artId, commentId, userId, loggedUser, editComment, deleteComment }) => {

  const [visible, setVisible] = useState(false)
  const [reComment, setReComment] = useState({})

  const modifyComment = (e) => {
    const name = e.target.name
    const newComment = e.target.value
    setReComment({
      ...reComment,
      commentId,
      artId,
      token: loggedUser.token,
      [name]: newComment
    })
  }
  const sendDeleteComment = (e) => {
    e.preventDefault()
    deleteComment({
      artId,
      token: loggedUser.token,
      commentId,
    })
  }

  const updateComment = async (e) => {
    e.preventDefault()
    if (reComment.editComment === undefined) {
      setVisible(!visible)
      return false
    }
    await editComment(reComment)
    setVisible(!visible)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 text-center">
          <div className="rounded-circle centerArticleImage mx-3" style={{backgroundImage:`url(${profilePicture})`, width: '5vw', height:'5vw'}}></div>
          <p className="nameArticleComment">{name}</p>
        </div>
        <div className="col-9 d-flex justify-content-between">
          <div>
            {!visible ?
              <div className="articleCommentContainer p-1">
                <p className="textArticleComment">{comment}</p>
              </div>
              :
              <>
                <input name="editComment" type="text" defaultValue={comment} onChange={modifyComment} />
                <AiOutlineSend
                  onClick={updateComment}
                  style={{ cursor: "pointer" }}
                />
              </>
              }
          </div>
          <div>
            {loggedUser && loggedUser.userId === userId && 
          <div className="commentArticleIcons">
              <AiFillDelete className="aiIcon delete" onClick={sendDeleteComment} />
              <AiTwotoneEdit className="aiIcon edit" onClick={() => setVisible(!visible)}/>
          </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = {
  deleteComment: articleActions.deleteComment,
  editComment: articleActions.editComment
}

export default connect(null, mapDispatchToProps)(ArtComment)