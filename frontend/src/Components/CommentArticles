import { connect } from "react-redux"
import articleActions from "../redux/actions/articleActions"
import { useState, useEffect } from "react"
import { IconContext } from "react-icons"
import {BiPaperPlane,BiTrash, BiEdit, BiBlock} from 'react-icons/bi'


const CommentArticle =(props)=> {
    const {name, profilePicture, comments, _id} = props.comment
    const [visible, setVisible] = useState(false)
    const [updatedComment, setUpdatedComment] = useState('')
    const [loggedUser, setLoggedUser] = useState('')
    const [reload, setReload] = useState(false)
    // const edit =(e)=> {s
    //     setVisible(!visible)  
    //     setUpdatedComment(commentaryDescription)
    //   }

    // const updateComment= async () => {
    //   await props.updateComment(updatedComment, props.comment._id, props.id, props.loggedUser.token)
    //   setVisible(!visible)
    //   setReload(!reload)
    // }

    // const deleteComment =async()=>{
    //   swal.fire({
    //     title: 'Are you sure to delete the comment?',
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: `Delete`,
    //     denyButtonText: `Cancel`,
    //   }).then((result) => {
    //      if  (result.isConfirmed) {
    //       borrarComentario()
    //       setReload(!reload)

    //     } 
    //   })
      
    // }
    // async function borrarComentario(){
    //   await props.deleteComment(props.comment._id, props.id, props.loggedUser.token)
    //   swal.fire('Comment deleted', '', 'success')
    // }
    // useEffect(() => {
    //   if(props.loggedUser){
    //      setLoggedUser(props.loggedUser.username)
    //   }
    // }, [reload])
    return (
        <h1>Hola Hugo</h1>
        // <div className="container p-2 m-1">
        //   <div className="row mx-auto justify-content-center ">
        //     <div className="col-3 bg-danger d-flex  align-items-center rounded-pill border border-secondary">
        //       <img src={commentaryPic} className="rounded-circle  mr-3" style={{height: "30px", width:"30px"}}/>
        //       <h3>{name}</h3>
        //     </div>
        //     <div className="col-9 rounded-pill border border-secondary">
        //       {visible ?
        //           <>
        //             <div className="d-flex justify-content-between">
        //               <input type="text" onChange={(e)=>setUpdatedComment(e.target.value)} value={updatedComment} 
        //               style={{borderRadius: '30px', border: 'none', outline: 'none', textAlign: 'center'}}/>
        //               <div>
        //                   <IconContext.Provider value={{size:'3em'}}>
        //                     <BiPaperPlane type="submit" onClick={updateComment}/>
        //                     <BiBlock type="submit" onClick={()=>setVisible(!visible)}/>
        //                   </IconContext.Provider>

        //               </div>
        //             </div>
                    
        //           </>
        //           : <div className="d-flex justify-content-between align-items-center">
        //               <p className=" my-auto h3">{commentaryDescription}</p>
        //               {loggedUser === commentaryAuthor&& 
        //                 <div>
        //                   <IconContext.Provider value={{size:'3em'}}>
        //                     <BiEdit onClick={edit} type="submit"/>
        //                     <BiTrash onClick={deleteComment} type="submit"/>
        //                   </IconContext.Provider>
        //                 </div>
        //               }
        //             </div>
        //       } 
        //     </div>
            
        //   </div>
        // </div>
      )
    }


const mapStateToProps = state => {
    return {
        loggedUser: state.authReducer.loggedUser
    }
}
      
// const mapDispatchToProps = {
//     deleteComment: commentActions.deleteComment,
//     updateComment: commentActions.updateComment
// }
      
export default connect(mapStateToProps)(CommentArticle)