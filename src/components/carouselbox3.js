import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUserLarge ,  faExternalLinkSquare,} from "@fortawesome/free-solid-svg-icons";

const CarouselBox3 = () => {
  const [blogarticle, setBlogArticle] = useState([]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get("http://localhost:4000/blog");
      console.log(res.statusText);
      setBlogArticle(res.data);
    } catch (err) {
      console.log(err.message);
      console.log(err.request);
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <>
      {blogarticle
        .filter((item) => (item.category === "Technology" ? item : !item))
        .reverse()
        .slice(0,6)
        .map((item) => (
          <div className="inner-holder2" key={item._id}>
            <div className="carousel-box">
              <h5>{item.title}</h5>
              <div className="image-holder"><img src={item.media1} alt="Article"/></div>
              <div className="post-info">
                {/* <span className="post-span">Posted: {item.updatedAt}</span> */}
                <span className="post-span">
                  <FontAwesomeIcon icon={faUserLarge} /> {item.author}
                </span>
                <button className="redirect-me-btn" type="button">
                  <Link to={`/dashboard/blog/current-post/${item._id}`} className="link">
                    {" "}
                    <FontAwesomeIcon icon={faExternalLinkSquare} />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CarouselBox3;
