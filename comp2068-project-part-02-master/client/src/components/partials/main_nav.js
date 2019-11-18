import React from "react";
import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      ChitChat
    </a>
    <button
      className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/users/show">
            Profile
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/users/">
            Contacts
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/conversations/">
            Conversations
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default MainNav;
