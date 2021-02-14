import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import authActions from './redux/actions/authActions'
import React, { useState } from 'react'

function App(props) {
  const [reload, setReload] = useState(false)
  if (props.loggedUser) {
    var routes = <>
      <Route exact path="/" component={HomePage} />
      <Redirect to="/" />
    </>
  } else if (localStorage.getItem('token')) {
    props.logFromLS(localStorage.getItem('token'))
      .then(respuesta => {
        if (respuesta === '/') setReload(!reload)
      })
  } else {
    var routes = <>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Redirect to="/" />
    </>
  }
  return (
    <>
    <Router>
      <Switch>
        {routes}
      </Switch>
    </Router>
  </>
  )
    
  
 
  
}

const mapStateToProps = state => {
  return {
    loggedUser: state.authR.loggedUser
  }
}

const mapDispatchToProps = {
  logFromLS: authActions.logFromLS
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

