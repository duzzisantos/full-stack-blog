import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Reset from "./auth/reset";
import Dashboard from "./auth/dashboard";
import Footer from "./components/footer";
import Blog from "./menu/blog";
import Create from "./menu/create";
import Admin from "./menu/admin";
import Rules from "./menu/rules";
import Privacy from "./components/privacy";
import Sports from "./menu/sports";
import Technology from "./menu/technology";
import Politics from "./menu/politics";
import Entertainment from "./menu/entertainment";
import EditPost from "./menu/edit-post";
import CurrentPost from "./menu/current-post";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login/*" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="dashboard/blog" element={<Blog />} />
          <Route path="dashboard/create" element={<Create />} />
          <Route path="dashboard/sports" element={<Sports />} />
          <Route path="dashboard/technology" element={<Technology />} />
          <Route path="dashboard/politics" element={<Politics />} />
          <Route path="dashboard/entertainment" element={<Entertainment />} />
          <Route path="dashboard/admin" element={<Admin />} />
          <Route path="dashboard/rules" element={<Rules />} />
          <Route path="dashboard/privacy" element={<Privacy />} />
          <Route path="dashboard/admin/edit-post/:ID" element={<EditPost />} />
          <Route path="dashboard/blog/current-post/:ID" element={<CurrentPost/>}/>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
