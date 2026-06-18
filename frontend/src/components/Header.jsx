import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {
    return (
        <div>
            <nav className='navbar-md bg-dark text-light'>
                <div className='nav-logo'>CODENOW EVENTS<img className='W-200' /></div>
                <Link className="text-decoration-none link-light" to="/login">Login</Link>
                <Link className="text-decoration-none text-light" to="/home">Home</Link>
                <Link className="text-decoration-none text-light" to="/events">Events</Link>
                <Link className="text-decoration-none text-light" to="/gallery">Gallery</Link>
                <Link className="text-decoration-none text-light" to="/contact">Contact</Link>
            </nav>
        </div>
    )
}

export default Header