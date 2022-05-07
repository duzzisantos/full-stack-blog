import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dashboard from "../auth/dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTrashCan,
  faMicrochip,
  faVideoCamera,
  faGlobeAfrica,
  faFootballBall,
} from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faTrashCan);

const Admin = () => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/blog");
      console.log(res.status);
      setDisplay(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePost = (_id) => {
    axios
      .delete(`http://localhost:4000/blog/` + _id)
      .then((res) => {
        console.log(res.status);
        console.table(res.data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dashboard />
      <div className="content-holder">
        <h2>Content Manager</h2>
        <select id="selection" onChange={(e) => setSearch(e.target.value)}>
          <option value="default" name="default">
            --Everything--
          </option>
          <option value="Technology" name="Technology">
            Technology
          </option>
          <option value="Politics" name="Politics">
            Politics
          </option>
          <option value="Sports" name="Sports">
            Sports
          </option>
          <option value="Entertainment" name="Entertainment">
            Entertainment
          </option>
        </select>
        <div className="manage-content">
          {display
            .filter((item) =>
              search === "default"
                ? item
                : search.match(new RegExp(`${item.category}`), "gi")
                ? item
                : !item
            )
            .map((item) => (
              <fieldset key={item._id}>
                <legend>
                  {item.category === "Entertainment" ? (
                    <FontAwesomeIcon icon={faVideoCamera} />
                  ) : item.category === "Sports" ? (
                    <FontAwesomeIcon icon={faFootballBall} />
                  ) : item.category === "Politics" ? (
                    <FontAwesomeIcon icon={faGlobeAfrica} />
                  ) : item.category === "Technology" ? (
                    <FontAwesomeIcon icon={faMicrochip} />
                  ) : (
                    !item
                  )}
                </legend>
                <ul className="content-list">
                  <li className="content-info">ID: {item.ID}</li>
                  <li className="content-info">Title: {item.title}</li>
                  <li className="content-info">Category: {item.category}</li>
                  <li className="content-info">
                    Date published: {item.updatedAt}
                  </li>
                </ul>
                <button
                  // key={item._id}
                  type="button"
                  title="Delete file"
                  className="delete-btn"
                  onClick={(e) => deletePost(item._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button className="edit-btn" type="button" title="Edit file">
                  <Link
                    to={`/dashboard/admin/edit-post/${item._id}`}
                    className="link"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </button>
              </fieldset>
            ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
