import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoard from "../auth/dashboard";
import { Link } from "react-router-dom";

export default function Sports() {
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

  //Pagination Logic

  // const arr = eachArticle
  //   .filter((item) => (item.category === "Sports" ? item : !item))
  //   .reverse();

  // const size = 10;
  // let current = 1;

  // //previous ten articles
  // const previousTen = () => {
  //   if (current > 1) {
  //     current--;
  //     let newArray = getNewArr();
  //     console.log(newArray);
  //   }
  // };

  // //next ten articles
  // const nextTen = () => {
  //   if (current >= 1 && current < arr.length / size) {
  //     current++;
  //     let newArray = getNewArr();
  //     console.log(newArray);
  //   }
  // };

  // const getNewArr = () => {
  //   return arr.slice(size * current - size, size * current);
  // };


  return (
    <>
      <DashBoard />
      <div className="content-holder">
        <h2>Sports</h2>
        <div className="category-holder">
          {eachArticle
            .filter((item) => (item.category === "Sports" ? item : !item))
            .reverse()
            // .slice(0, 10)
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
          {/* <button className="previous-btn" onClick={previousTen}>
            &larr; Previous
          </button>
          <button className="next-btn" onClick={nextTen}> */}
            {/* Next &rarr;
          </button> */}
        </div>
      </div>
    </>
  );
}
