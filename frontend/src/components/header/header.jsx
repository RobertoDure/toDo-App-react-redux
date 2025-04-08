import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'
import './header.css'

const Header = ({ auth, logout }) => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <h1>Todo App</h1>
        </Link>
      </div>
      
      <div className="user-menu">
        {auth.user && (
          <>
            <span className="user-name">Hello, {auth.user.name}</span>
            <button className="btn btn-logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => 
  bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
