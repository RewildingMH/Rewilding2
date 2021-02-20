import React, { useState } from 'react'
import { connect } from 'react-redux';
import articleActions from '../redux/actions/articleActions';

const ArtComment = ({comment, profilePicture, name, artId ,commentId, userId, loggedUser, editComment, deleteComment}) => {

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
        if(reComment.editComment === undefined){
          setVisible(!visible)
          return false
        }
        await editComment(reComment)
        setVisible(!visible)
      }
    return (
        <div>
           <>
              <img src={profilePicture}></img>
              {loggedUser && loggedUser.userId === userId && <div>
                <button onClick={sendDeleteComment}>delete</button>
                <button onClick={() => setVisible(!visible)}>edit</button>
              </div>}
              
              <p className="textArticle">{name}</p>
              
              {!visible ? 
              <p className="textArticle">{comment}</p>
              :
              <>
                <input name="editComment" type="text" defaultValue={comment} onChange={modifyComment} />
                <button className="" onClick={updateComment}>send</button>
              </>
              }
              </>
        </div>
    )
}


const mapDispatchToProps = {
    deleteComment: articleActions.deleteComment,
    editComment: articleActions.editComment
}

export default connect(null, mapDispatchToProps)(ArtComment)