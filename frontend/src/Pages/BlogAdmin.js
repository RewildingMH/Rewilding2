import React,  { useState, useEffect } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'
import BlogArticle from '../Components/BlogArticle'
import Table from 'react-bootstrap/Table'

const BlogAdmin = (props) => {
    const [article, setArticle] = useState({
      title: "",
      descripcion: "",
      articleCategory: ""
    })
    useEffect(() => {
      props.getArticles();
    }, [props.articles])

    const readInput = (e) => {
      const {name, value} = e.target
      setArticle({...article, [name]: value});
    }

    const sendArticle = async (e) => {
      e.preventDefault()
      if(article.title === "", article.articleCategory === "", article.descripcion === ""){
        alert("All fields are required")
        return false
      }
      const token = localStorage.getItem('token')
      await props.newArticle(article, file, token)
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
<<<<<<< HEAD
      <div>
        <h2>Blog agregar articulo</h2>
=======
      <div className="adminBanner"></div>
      <div className="adminBlog container">
        <h2>Blog</h2>
>>>>>>> 2fb2c221981124606ce439ae227d583dcbc36c55
        <input type="text" onChange={readInput} name="title"placeholder="Put your title for this article"/>
        <label htmlFor="signature-pic" className="label_input_file" >
            <div className="d-flex flex-column align-items-center">
              <p>Select your picture</p> 
                <img className="" src={pathImage} alt="logo"/>
            </div>
        </label>
        <select name="articleCategory" onChange={readInput} >
          <option value="" selected>Select a Category</option>
            {props.articleCategories.map((category, index) => {
                                    return <option key={index} value={category}>{category}</option>
                                })}
        </select>
        
            <input type="file" id="signature-pic" className="admin_input input-file"
            name="file" onChange={onFileChange} required/>
            <div style={{display: 'flex'}}>
            <textarea name="descripcion" onChange={readInput} cols="55" rows="12" placeholder="Write something in this article" required  />
            </div>
        <button onClick={sendArticle}>Submit</button>
      </div>
      <h1>Editar y borrar articulos</h1>
      <div classname="container">
        <Table striped bordered hover>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>
              {props.articles.map((article)=>{
                  return <BlogArticle article={article} />                

              }) }
          </tbody>
        </Table>
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
  newArticle: articleActions.newArticle,
  getArticles: articleActions.getArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogAdmin)