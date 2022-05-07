import React from "react";
import "../App.css";
import CarouselBox4 from "./carouselbox4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const YouMayLike = () => {
  return (
    <>
      <h2>Top entertainment</h2>
      <div className="news-holder">
        <div className="inner-holder">
          <CarouselBox4></CarouselBox4>
          <button className="more-btn">
            <Link to="/dashboard/entertainment" className="link">
              More Entertainment  {" "}
              <FontAwesomeIcon icon={faArrowRight}/>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default YouMayLike;
