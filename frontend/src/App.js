import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage';
import '../src/styles/styles.css'
import Petitions from './Pages/Petitions.jsx'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import authActions from './redux/actions/authActions'
import React, { useState } from 'react'
import CreatePetition from './Components/CreatePetition.jsx';
import BlogAdmin from './Pages/BlogAdmin'
import Petition from './Components/Petition.jsx';

const App = (props) => {

  const [reload, setReload] = useState(false)
  if (props.loggedUser) {
    if (props.loggedUser.rol === "admin") {
      var routes = <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/petitions" component={Petitions} />
        <Route path="/createPetition" component={CreatePetition} />
        <Route exact path="/adminBlog" component={BlogAdmin} />
        <Route path="/petitions/:id" component={Petition} />
        <Redirect to="/" />
      </Switch>
    } else {
      var routes = <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/petitions" component={Petitions} />
        <Route path="/createPetition" component={CreatePetition} />
        <Route exact path="/blog" component={BlogAdmin} />
        <Route path="/petitions/:id" component={Petition} />

        <Redirect to="/" />
      </Switch>
    }
  } else if (localStorage.getItem('token')) {
    props.logFromLS(localStorage.getItem('token'))
      .then(respuesta => {
        if (respuesta === '/') setReload(!reload)
      })
  } else {
    var routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/petitions" component={Petitions} />
        <Route path="/blog" component={BlogAdmin} />
        <Route path="/petitions/:id" component={Petition} />
        <Redirect to="/" />
      </Switch>
    );
  }


  return (
    <>
      <Router>
        {routes}
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

