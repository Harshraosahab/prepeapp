import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h2 className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <span className="logo-icon">📚</span>
              Prep<span>Dash</span>
            </Link>
          </h2>
          {user && (
            <div className="navbar-search">
              <FaSearch />
              <input type="text" placeholder="Search companies, roles..." />
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Nav Links */}
        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/quiz"
              className={location.pathname === "/quiz" ? "active-link" : ""}
              onClick={closeMenu}
            >
              Quizzes
            </Link>
          </li>
          <li>
            <Link
              to="/practice"
              className={location.pathname === "/practice" ? "active-link" : ""}
              onClick={closeMenu}
            >
              Practice
            </Link>
          </li>
          <li>
            <Link
              to="/resume"
              className={location.pathname === "/resume" ? "active-link" : ""}
              onClick={closeMenu}
            >
              Resume Builder
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active-link" : ""}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          {/* Admin Panel Link */}
          <li>
            <Link
              to="/admin"
              className={location.pathname === "/admin" ? "active-link" : ""}
              onClick={closeMenu}
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Auth Buttons or User Menu */}
        <div className={`navbar-auth ${menuOpen ? "active" : ""}`}>
          {user ? (
            <>
              <button className="icon-btn" title="Notifications">
                <FaBell />
              </button>
              <div className="user-menu">
                <button className="user-avatar">
                  <FaUserCircle />
                </button>
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user.name || user.email}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                  <Link to="/profile" onClick={closeMenu}>Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="btn-register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
