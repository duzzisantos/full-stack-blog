import React from "react";
import "../App.css";
import CarouselBox3 from "./carouselbox3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Technology = () => {
  return (
    <>
      <h2>Top technology</h2>
      <div className="news-holder">
        <div className="inner-holder">
          <CarouselBox3></CarouselBox3>
          <button className="more-btn">
            <Link to="/dashboard/technology" className="link">
              More Technology  {" "}
              <FontAwesomeIcon icon={faArrowRight}/>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Technology;
