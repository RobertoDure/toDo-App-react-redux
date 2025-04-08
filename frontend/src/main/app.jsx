import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Header from '../components/header/header'
import Sidebar from '../components/sidebar/sidebar'
import Dashboard from '../pages/dashboard/dashboard'
import TodoList from '../pages/todo/todoList'
import AuthPage from '../pages/auth/authPage'
import { validateToken } from '../store/actions/authActions'

import './app.css'

const App = props => {
  const { auth, validateToken } = props
  
  // Check for token on app load
  useEffect(() => {
    validateToken()
  }, [validateToken])

  return (
    <Router>
      <div className="app-container">
        {auth.isAuthenticated && <Header />}
        <div className="main-content">
          {auth.isAuthenticated && <Sidebar />}
          <div className="content-area">
            <Switch>
              <Route exact path="/" render={() => (
                auth.isAuthenticated ? <Dashboard /> : <Redirect to="/auth" />
              )} />
              <Route path="/todos" render={() => (
                auth.isAuthenticated ? <TodoList /> : <Redirect to="/auth" />
              )} />              <Route path="/auth" render={() => {
                return !auth.isAuthenticated 
                  ? <AuthPage /> 
                  : <Redirect to="/dashboard" />
              }} />
              <Route path="/dashboard" render={() => (
                auth.isAuthenticated ? <Dashboard /> : <Redirect to="/auth" />
              )} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => 
  bindActionCreators({ validateToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
