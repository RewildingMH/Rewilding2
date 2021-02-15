import HomePage from './Pages/HomePage'
import Header from './Components/Header'
import LoginPage from './Pages/LoginPage';
import '../src/styles/styles.css'
import Petitions from './Pages/Petitions.jsx'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import authActions from './redux/actions/authActions'
import React, { useState } from 'react'
import CreatePetition from './Components/CreatePetition.jsx';
import Blog from './Pages/Blog'
import Petition from './Components/Petition.jsx';



const App = (props) => {
  const [reload, setReload] = useState(false)

  if (props.loggedUser) {
    var routes = <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/petitions" component={Petitions} />
      <Route path="/createPetition" component={CreatePetition} />
      <Redirect to="/" />
    </>
  } else if (localStorage.getItem('token')) {
    props.logFromLS(localStorage.getItem('token'))
      .then(respuesta => {
        if (respuesta === '/') setReload(!reload)
      })
  } else {
    var routes = (
      <>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/petitions" component={Petitions} />
        <Route path="/blog" component={Blog} />
        <Redirect to="/" />
      </>
    );
  }
  return (
    <>
      <Router>
        <Header />
        <Switch>
          {routes}
        </Switch>
        <Route path="/petitions/:id" component={Petition} />
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

