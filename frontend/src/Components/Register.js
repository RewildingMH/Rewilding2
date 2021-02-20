import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import authActions from "../redux/actions/authActions"
import { useEffect, useState } from 'react'
import Compressor from "compressorjs";
import Swal from "sweetalert2";

const Register = (props) => {
    const responseGoogle = (response) => {
        props.loginWithGoogle(response.profileObj);
    }
    useEffect(() => {
    })
    //Usuario a cargar en la db
    var [newUser, setNewUser] = useState({
        name: "",
        lastName: "",
        username: "",
        password: ""
    })
    //Errores
    const [errores, setErrores] = useState([])
    //capturador de los valores de los inputs 
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const [pathImage, setPathImage] = useState('/assets/user.png')
    const [file, setFile] = useState()
    //Funcion para previsualizar imagenes
    
  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };
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
    //Funcion para enviar la informacion del formulario de registro a la db
    const sendUser = async e => {
        e.preventDefault()
        if (newUser.name === '' || newUser.lastName === '' || newUser.username === ''
            || newUser.password === '') {
            alert("Fill in all fields")
            return false
        } else if (file === undefined) {
            alert("Select a Profile Picture")
            return false
        }
        setErrores([])
        const respuesta = await props.newUser(newUser, file)
        if (respuesta && !respuesta.success) {
            setErrores(respuesta.errores)
        } else {
            alert("You have Registered in Mytinerary")
        }
    }

    return (
        <>
            <div className="registerDiv">
                <h1>REGISTER</h1>
                <GoogleLogin
                    className="login_input justify-content-center"
                    clientId="466964485297-vadqpskqigjmjlh81uijpggpiaalluu2.apps.googleusercontent.com"
                    buttonText="Register with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className="separator-line">
                    <span className="text">Or register with your email</span>
                    <span className="line mx-auto"></span>
                </div>
                <input type="text" autoComplete="nope" placeholder="Name" name="name"
                    onChange={(e) => handleChange(e)} className="admin_input" required />
                <div className="errores">
                    {errores && errores.map(({ path }) => {
                        if (path[0] === "name") {
                            return <p>The Name must be at least 4 characters up to 15 characters</p>
                        }
                    })}
                </div>
                <input type="text" autoComplete="nope" placeholder="Last Name" name="lastName"
                    onChange={(e) => handleChange(e)} className="admin_input" required />
                <div className="errores">
                    {errores && errores.map(({ path }) => {
                        if (path[0] === "lastName") {
                            return <p>The Name must be at least 2 characters up to 20 characters</p>
                        }
                    })}
                </div>
                <input type="text" autoComplete="nope" placeholder="Your email address" name="username"
                    onChange={(e) => handleChange(e)} className="admin_input" required />
                <div className="errores">
                    {errores && errores.map(({ path }) => {
                        if (path[0] === "username") {
                            return <p>Enter a valid email address</p>
                        } else if (path[0] === "usernameExist") {
                            return <p>The email is already in use. Choose another.</p>
                        }

                    })}
                </div>
                <input type="password" placeholder="Password" name="password"
                    onChange={(e) => handleChange(e)} className="admin_input" required />
                <div className="d-flex justify-content-center">
                    <p>The password must be 6-8 characters long.</p>
                </div>
                <div className="errores">
                    {errores && errores.map(({ path }) => {
                        if (path[0] === "password") {
                            return <p>Enter a Valid Password</p>
                        }
                    })}
                </div>
                <label htmlFor="profile-pic" className="label_input_file">
                    <div className="d-flex flex-column align-items-center" style={{display:"flex", alignItems:"center"}}>
                        <p>Select your Profile picture</p>
                        <img className="img-fluid profile-pic-register" src={pathImage} alt="profile-pic" style={{width:"20vw"}}/>
                    </div>
                </label>
                <input type="file" id="profile-pic" className="admin_input input-file"
                    name="file" onChange={onFileChange} required />
                <button type="submit" onClick={sendUser} className="btnLog">
                    Register
                </button>
                <p>* By entering with Google you are agreeing to receive offers by email</p>
                <div className="separator-line">
                    <span>Do you already have an account?</span>
                    <span className="line mx-auto"></span>
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
    newUser: authActions.newUser,
    loginWithGoogle: authActions.loginWithGoogle,
}
export default connect(mapStateToProps, mapDispatchToProps)(Register) 
