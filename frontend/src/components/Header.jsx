import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {
    return (
        <div>
            <nav className='navbar-md bg-light text-dark'>
                <div className='nav-logo'>CODENOW EVENTS<img className='W-200' /></div>
                <Link className="text-decoration-none link-dark" to="/login">Logout</Link>
                <Link className="text-decoration-none text-dark" to="/home">Home</Link>
                <Link className="text-decoration-none text-dark" to="/home/events">Events</Link>
                <Link className="text-decoration-none text-dark" to="/home/gallery">Gallery</Link>
                <Link className="text-decoration-none text-dark" to="/home/contact">Contact</Link>
            </nav>
        </div>
    )
}

export default Header