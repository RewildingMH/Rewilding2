import React,  { useState } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'


const Blog = (props) => {
  console.log(props)
    const [article, setArticle] = useState({
      title: "",
      message: "",
      articleCategories: ""
    })
    const readInput = (e) => {
      const {name, value} = e.target
      setArticle({...article, [name]: value});
    }

    const sendArticle = async (e) => {
      e.preventDefault()
      if(article.title === "", article.articleCategories === "", article.message === ""){
        alert("All fields are required")
        return false
      }
      const token = localStorage.getItem('token')
      alert(`Titulo ${article.title}, categoria  ${article.articleCategories}, mensaje  ${article.message}, token ${token} `)
  
      //const response = await props.newArticle(article, file, token)
    }
    //recordatorio: cambiar pic de pathImage por defecto linea 32.
    const [pathImage, setPathImage]= useState('/assets/losago.png')
    const [file, setFile] = useState()
    //Funcion para previsualizar imagenes
    const onFileChange= e =>{
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]
            if(file.type.includes('image')){
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload= function load(){
                    setPathImage(reader.result)
                }
                setFile(file)
            }else{
                console.log('Something went wrong')
            }
        }
    }
//estilo linea 66 de prueba(el div).
  return (
    <>
      <div>
        <h2>Blog</h2>
        <input type="text" onChange={readInput} name="title"placeholder="Put your title for this article"/>
        <label htmlFor="signature-pic" className="label_input_file" >
            <div className="d-flex flex-column align-items-center">
              <p>Select your picture</p> 
                <img className="" src={pathImage} alt="logo"/>
            </div>
        </label>
        <select name="articleCategories" onChange={readInput} >
          <option value="" selected>Select a Category</option>
            {props.articleCategories.map((category, index) => {
                                    return <option key={index} value={category}>{category}</option>
                                })}
        </select>
        
            <input type="file" id="signature-pic" className="admin_input input-file"
            name="file" onChange={onFileChange} required/>
            <div style={{display: 'flex'}}>
            <textarea name="message" onChange={readInput} cols="55" rows="12" placeholder="Write something in this article" required  />
            </div>
        <button onClick={sendArticle}>Submit</button>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articleR.articles,
    articleCategories: state.articleR.articleCategories
  }
}

const mapDispatchToProps = {
  newArticle: articleActions.newArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)