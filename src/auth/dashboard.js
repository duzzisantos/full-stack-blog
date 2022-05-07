import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { db, auth, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBlog,
  faCake,
  faClock,
  faHouse,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCake, faPowerOff, faHouse, faClock, faUser, faBars);
const isAuthorized = process.env.REACT_APP_ADMIN;

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    } else if (!user) {
      fetchUserName();
      return navigate("/");
    }
  });

  // handles menu collapse for navbar

  const handleMenuCollapse = () => {
    var navitems = document.getElementById("myTopnav");
    if (navitems.className === "nav-items") {
      navitems.className += " responsive";
    } else {
      navitems.className = "nav-items";
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        {/* <div className="img-holder" id="active"></div> */}
        <ul className="nav-items" id="myTopnav">
          <li className="nav-links" id="active">
            <Link to="/dashboard/blog" className="nav-links">
              Blockhead <FontAwesomeIcon icon={faBlog} />
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/dashboard/blog" className="link">
              Home
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/dashboard/sports" className="link">
              Sports
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/dashboard/politics" className="link">
              Politics
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/dashboard/technology" className="link">
              Technology
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/dashboard/entertainment" className="link">
              Entertainment
            </Link>
          </li>
          {user?.uid === isAuthorized ? ( //Admin Authorization
            <>
              <li className="nav-links">
                <Link to="/dashboard/create" className="link">
                  Create
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/dashboard/admin" className="link">
                  Manage
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {/* <li
            className="nav-links"
            id="hamburger-icon"
            onClick={handleMenuCollapse}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />
          </li> */}
          <li className="nav-links">
            <div className="dashboard-container">
              <span className="dashboard-span">
                <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
              </span>
              <span className="dashboard-span">{name}</span>
              <div className="dashboard-avi" title="Logged in">
                {user?.email[0].toUpperCase()}
              </div>
              <span className="dashboard-span">{user?.email}</span>
              <button
                className="dashboard-btn"
                onClick={logout}
                type="button"
                title="Logout"
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            </div>
          </li>
          <li
            className="nav-links"
            id="hamburger-icon"
            onClick={handleMenuCollapse}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
