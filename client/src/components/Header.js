import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return(
    <div>
      <Link to="/" className="nav">Home</Link>
      <Link to="/books/new" className="nav">Create</Link> 
      <Link to="/add" className="nav">Create-2</Link> 
      <Link to="/form" className="nav">Form</Link> 
    </div>
  )
}
export default Header;