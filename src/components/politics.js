import React from "react";
import "../App.css";
import CarouselBox2 from "./carouselbox2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Politics = () => {
  return (
    <>
      <h2>Top politics</h2>
      <div className="news-holder">
        <div className="inner-holder">
         <CarouselBox2></CarouselBox2>
         <button className="more-btn">
            <Link to="/dashboard/politics" className="link">
              More Politics  {" "}
              <FontAwesomeIcon icon={faArrowRight}/>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Politics;
