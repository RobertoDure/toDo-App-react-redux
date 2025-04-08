import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateFilters } from '../../store/actions/todoActions'
import './sidebar.css'

const Sidebar = ({ updateFilters }) => {
  const handleFilterClick = (filter) => {
    updateFilters(filter)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Navigation</h3>
        <ul className="nav-links">          <li>
            <Link to="/" activeClassName="active">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/todos" activeClassName="active">
              All Tasks
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>Filters</h3>
        <ul className="filter-links">
          <li>
            <button 
              onClick={() => handleFilterClick({ done: null, priority: null, category: null })}
              className="filter-button"
            >
              All Tasks
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleFilterClick({ done: false })}
              className="filter-button"
            >
              Active Tasks
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleFilterClick({ done: true })}
              className="filter-button"
            >
              Completed Tasks
            </button>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>Priority</h3>
        <ul className="priority-links">
          <li>
            <button 
              onClick={() => handleFilterClick({ priority: 'high' })}
              className="filter-button priority-high"
            >
              High Priority
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleFilterClick({ priority: 'medium' })}
              className="filter-button priority-medium"
            >
              Medium Priority
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleFilterClick({ priority: 'low' })}
              className="filter-button priority-low"
            >
              Low Priority
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ updateFilters }, dispatch)

export default connect(null, mapDispatchToProps)(Sidebar)
