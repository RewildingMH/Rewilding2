import React,  { useState, useEffect } from "react";
import { connect } from "react-redux";
import articleActions from '../redux/actions/articleActions'
import BlogArticle from '../Components/BlogArticle'
import Table from 'react-bootstrap/Table'
import banner from '../assets/rewildingBanner.png'
import Compressor from "compressorjs";
import Swal from "sweetalert2";
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
    //Funcion ara mandar un mensaje de error
    
  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };
    //Funcion para previsualizar imagenes
    const onFileChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.type.includes("image")) {
          const compressedFile = new Compressor(file, {
            quality: 0.5,
            success(result) {
              const reader = new FileReader();
              reader.readAsDataURL(result);
              reader.onload = function load() {
                setPathImage(reader.result);
              };
            },
          });
          setFile(compressedFile);
        } else {
          errorAlert(
            "error",
            "Something went wrong!",
            "Files must be of an image type"
          );
        }
      }
    };
//estilo linea 66 de prueba(el div).
  return (
    <>
    <div className="communityBanner" style={{ backgroundImage: `url(${banner})`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
      <div className="bg-dark topSectionAdmin">
        <div className="sectionAdminBlog">
          <h2 className="whiteAdminText">Blog add Articles</h2>
        </div>
        <div className="positionArticleAdmin">
          <input className="adminInputs" type="text" onChange={readInput} name="title"placeholder="Put your title for this article"/>
        </div>
        <label htmlFor="signature-pic" className="label_input_file" >
            <div className="d-flex flex-column align-items-center">
              <p className="whiteAdminText">Select your picture</p> 
              <img className="" src={pathImage} alt="logo"/>
            </div>
        </label>
        <div className="positionArticleAdmin">
          <select name="articleCategory" onChange={readInput} >
            <option value="" selected hidden>Select a Category</option>
              {props.articleCategories.map((category, index) => {
                                      return <option key={index} value={category}>{category}</option>
                                  })}
          </select>
        </div>
            <input type="file" id="signature-pic" className="admin_input input-file"
            name="file" onChange={onFileChange} required/>
            <div className="positionArticleAdmin">
            <textarea name="descripcion" onChange={readInput} cols="55" rows="12" placeholder="Write something in this article" required  />
            </div>
            <div className="positionArticleAdmin">
              <button className="adminButton" onClick={sendArticle}>Submit</button>
            </div>
      </div>
      <h1>Edit and delete articles</h1>
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
    articles: state.articleR.allArticles,
    articleCategories: state.articleR.articleCategories
  }
}

const mapDispatchToProps = {
  newArticle: articleActions.newArticle,
  getArticles: articleActions.getArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogAdmin)