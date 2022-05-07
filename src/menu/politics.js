import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoard from "../auth/dashboard";
import { Link } from "react-router-dom";

export default function Politics() {
  const [eachArticle, setEachArticle] = useState([]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get("http://localhost:4000/blog");
      console.log(res.statusText);
      setEachArticle(res.data);
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <>
      <DashBoard />
      <div className="content-holder">
        <h2>Politics</h2>
        <div className="category-holder">
          {eachArticle
            .filter((item) => (item.category === "Politics" ? item : !item))
            .reverse()
            // .slice(0, 15)
            .map((item) => (
              <div className="each-article" key={item._id}>
                <Link
                  to={`/dashboard/blog/current-post/${item._id}`}
                  className="link"
                >
                  {item.title} -{" "}
                  <span
                    className="article-span"
                    style={{ fontSize: "small", color: "purple" }}
                  >
                    {new Date(item.updatedAt).getDay()}.
                    {new Date(item.updatedAt).getMonth() + 1}.
                    {new Date(item.updatedAt).getFullYear()}
                  </span>
                  <span
                    className="article-span-author"
                    style={{ fontSize: "small", color: "purple" }}
                  >
                    by - {item.author}
                  </span>
                </Link>
              </div>
            ))}
          {/* <button className="previous-btn">&larr; Previous</button>
          <button className="next-btn">Next &rarr;</button> */}
        </div>
      </div>
    </>
  );
}
