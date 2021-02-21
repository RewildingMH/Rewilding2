import React,  { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons"
import articleActions from "../redux/actions/articleActions"
import {BiPaperPlane,BiTrash, BiEdit, BiBlock} from 'react-icons/bi'

const BlogArticle = (props) => {
    
    const [visible, setVisible] = useState(false)
    const [pathImage, setPathImage]= useState('/assets/losago.png')

    const buttonDelete = async e => {
        e.preventDefault()
        
        // const id = e.target.id 
        const id = props.article._id
        await props.deleteArticle(id);
    }
    const [article, setArticle] = useState({
        _id: props.article._id,
        title: props.article.title,
        descripcion: props.article.descripcion,
        articleCategory: props.article.articleCategory
      })
    
    const readInput = (e) => {
    const {name, value} = e.target
    setArticle({...article, [name]: value});
    }
    const editArticle = async e => {
        e.preventDefault()
        setVisible(!visible)
        await props.editArticle(article)
        
    }
    
    return (
        <>
            {visible ?
                <>
                <tr>
                    <td>
                        <input type="text" onChange={readInput} name="title"defaultValue={props.article.title}/>
                    </td>
                    <td>
                        <select name="articleCategory" onChange={readInput}>
                            <option value="" selected>Select a Category</option>
                            {props.articleCategories.map((category, index) => {
                                return <option key={index} value={category}>{category}</option>
                                        })}
                        </select>
                    </td>
                    <td>            
                        <textarea name="descripcion" onChange={readInput} cols="55" rows="12" defaultValue={props.article.descripcion} required  />
                    </td>
                    <td>
                        <IconContext.Provider value={{size:'3em'}}>
                            <BiPaperPlane  onClick={(e)=>editArticle(e)}/>                            
                        </IconContext.Provider>
                    </td>
                    <td>
                        <IconContext.Provider value={{size:'3em'}}>
                            <BiBlock type="submit" onClick={()=>setVisible(!visible)}/>
                        </IconContext.Provider>
                    </td>
                </tr>
                </>
                : 
                <tr>
                    <td>{props.article.title}</td>
                    <td>{props.article.articleCategory} </td>
                    <td>{props.article.descripcion.slice(0, 100) + "..."}</td>
                    <td><BiEdit onClick={()=>setVisible(!visible)}/></td>
                    <td><BiTrash onClick={(e)=> buttonDelete(e)}/></td>
                </tr>
            } 
                    </>
    )
}

const mapStateToProps = state => {
    return {
        articles: state.articleR.articles,
        articleCategories: state.articleR.articleCategories
    }
  }
  
const mapDispatchToProps = {
    editArticle: articleActions.editArticle,
    getArticles: articleActions.getArticles,
    deleteArticle: articleActions.deleteArticle
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BlogArticle)





  