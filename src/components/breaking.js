import React from "react";
import "../App.css";
import CarouselBox from "./carouselbox1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Breaking = () => {
  return (
    <>
      <h2 >Top sports</h2>
      <div className="news-holder">
        <div className="inner-holder">
          <CarouselBox></CarouselBox>
          <button className="more-btn">
            <Link to="/dashboard/sports" className="link">
              More Sports {" "}
              <FontAwesomeIcon icon={faArrowRight}/>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Breaking;
