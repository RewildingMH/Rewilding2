import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux'
import authActions from "../redux/actions/authActions"
import { useEffect, useState } from 'react'


const Login = (props) => {
    useEffect(() => {

    })
    const responseGoogle = async (response) => {
        const respuesta = await props.loginWithGoogle(response.profileObj)
    }
    //Usuario a loguearse
    var [loginUser, setLoginUser] = useState({
        username: "",
        password: "",
    })
    //Errores
    const [errores, setErrores] = useState([])
    //capturo valores de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginUser({ ...loginUser, [name]: value })
    }
    //Funcion para confirmar el login
    const sendUser = async e => {
        e.preventDefault()
        if (loginUser.username === '' || loginUser.password === '') {
            alert('all fields are required!')
            return false
        }
        setErrores([])
        const respuesta = await props.loginUser(loginUser)
        if (respuesta && !respuesta.success) {
            setErrores([respuesta.mensaje])
        }
    }
    const forgotPassword = e => {
        alert('forgotPassword')
    }

    return (
        <div className="loginDiv">
            <h1>LOGIN</h1>
            <GoogleLogin
                className="login_input justify-content-center"
                clientId="70385013439-d765viglf0jv9tq89u53csihoja864u0.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <div className="separator-line">
                <span>Or</span>
                <span className="line mx-auto"></span>
            </div>
            <input type="text" autoComplete="nope" placeholder="Your email address" className="admin_input" name="username"
                onChange={(e) => handleChange(e)} />
            <input type="password" placeholder="Password" className="admin_input" name="password"
                onChange={(e) => handleChange(e)} />
            <p onClick={forgotPassword} className="forgotPass">I forgot my password</p>

            <button onClick={sendUser} className="btnLog">
                Login
            </button>
            <p>* By entering with Google you are agreeing to receive offers by email</p>
            <div className="separator-line">
                <span>You do not have an account?</span>
                <span className="line mx-auto"></span>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.authR.loggedUser
    }
}
const mapDispatchToProps = {
    loginWithGoogle: authActions.loginWithGoogle,
    loginUser: authActions.loginUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(Login) 