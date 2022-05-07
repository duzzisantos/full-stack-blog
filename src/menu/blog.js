import React from "react";
import Breaking from "../components/breaking";
import Politics from "../components/politics";
import Technology from "../components/technology";
import YouMayLike from "../components/youmaylike";

import "../App.css";
import Dashboard from "../auth/dashboard";

const Blog = () => {
  return (
    <>
      <Dashboard />
      <div className="content-holder">
        <Breaking />
        <Politics />
        <Technology />
        <YouMayLike />
      </div>
    </>
  );
};

export default Blog;
