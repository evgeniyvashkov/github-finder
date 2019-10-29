import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>

            <ul className="navbar__list">
                <li className="navbar__list-item">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
}

export default Navbar
