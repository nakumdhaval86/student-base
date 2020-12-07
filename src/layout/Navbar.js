import React from "react";
import { NavLink } from "react-router-dom";
import UserImage from "../componets/UserImage";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();
  const firebase = useFirebase();

  const handleLogout = async () => {
    await firebase.logout();
    history.replace("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border shadow">
        <NavLink className="navbar-brand" to="/">
          <span className="brand_name">STUDENT BASE</span>
        </NavLink>
        <NavLink
          activeClassName="active_link"
          className="navbar-brand"
          exact
          to="/"
        >
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto" style={{ marginRight: "120px" }}>
            <li className="nav-item">
              <NavLink
                className="nav-link btn btn-secondary text-white mr-3"
                to="/student/add"
              >
                Add Student <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <UserImage url="https://i.pravatar.cc/150?img=3" width="35px" />
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                User Name
              </NavLink>
              <div
                className="dropdown-menu bg-white"
                aria-labelledby="navbarDropdown"
              >
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
