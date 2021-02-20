import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

const MailValidate = (props) => {
const [ email, setEmail] = useState({})
const [user, setUser] = useState({})
const { oneUser } = props
useEffect(() => {
    setUser(oneUser)
}, [oneUser])

const captureEmail = (e) => {
    const {name, value } = e.target
    setEmail(
        {...email,
        [name]: value})
}
const sendEmail = e => {
    e.preventDefault()
    props.recoverPassword(email)
}
    return (
        <div style={{width: "100", height:"50vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {!user.name ? 
            <>
            <p>Recover password</p>
          <input name="email" type="email"  placeholder="Enter your email" onChange={captureEmail} />
          <button onClick={sendEmail}>Send</button> 
          </>: 
          <p>{user.name} te enviamos un mail</p>
          }         
        </div>
    )
}

const mapStateToProps = state => {
    return {
        oneUser: state.authR.oneUser
    }
}

const mapDispatchToProps = {
    recoverPassword: userActions.recoverPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(MailValidate)