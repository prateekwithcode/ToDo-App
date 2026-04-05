import React from 'react'
import { Link } from "react-router-dom";
import "../style/navbar.css";
function Navbar() {
  return (
    <nav className='navbar'>
        <h1 className='logo'>ToDo-<span>App</span></h1>
      <ul>
        <li>
          <Link to="/">List</Link>
        </li>
        <li>
          <Link to="/add">Add Task</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar