import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from 'react-router-dom'
import { login, register } from '../../store/actions/authActions'
import './authPage.css'

const AuthPage = ({ auth, login, register }) => {
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState({})
  
  const { name, email, password, confirmPassword } = formData
  
  // Redirect if authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [auth.isAuthenticated, history])
  
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear errors when typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null })
    }
  }
  
  const validateForm = () => {
    const errors = {}
    
    if (!isLogin && !name) {
      errors.name = 'Name is required'
    }
    
    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (!isLogin && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (isLogin) {
      const success = await login({ email, password })
      if (success) {
        history.push('/dashboard')
      }
    } else {
      const success = await register({ name, email, password })
      if (success) {
        history.push('/dashboard')
      }
    }
  }
  
  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormErrors({})
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <p>{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>
        </div>
        
        {auth.error && (
          <div className="auth-error">
            {auth.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className={formErrors.confirmPassword ? 'error' : ''}
              />
              {formErrors.confirmPassword && (
                <span className="error-message">{formErrors.confirmPassword}</span>
              )}
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={auth.loading}
          >
            {auth.loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleMode} className="toggle-button">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => 
  bindActionCreators({ login, register }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
