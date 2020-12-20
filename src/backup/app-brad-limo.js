import React, { Component } from "react";

import "./app.scss";
import ScalingElement from "./scroll/scaleOnScroll/ScalingElement";
import Menu from "./components/brad/Menu";
import BookForm from "./components/brad/BookForm";

console.log("creating app");
const wifi = "./assets/images/wifi-white-18dp.svg";
const done = "./assets/images/done-white-18dp.svg";
const commute = "./assets/images/commute-white-18dp.svg";

const App = () => (
  //<main className="main">
  <>
    <Menu></Menu>
    <div className="brad-description">
      <p>
        Brad Limo. Please fill out the form below and we will get back to you
        with your quote. Available 24/7
      </p>
    </div>
    <div className="brad-under">
      <p>UNDER CONSTRUCTION</p>
    </div>
    <BookForm></BookForm>

    <span
      className="brad-tips"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: "75px",
        marginLeft: "20px",
        width: "100%",
      }}
    >
      <ScalingElement pageOffsetY={10} cssSelector=".tip-wrapper">
        <div className="tip-wrapper">
          {" "}
          <img className="image" src={wifi}></img>
          <p class="tip">Wifi Included</p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
        </div>
      </ScalingElement>

      <ScalingElement pageOffsetY={10} cssSelector=".tip-wrapper">
        <div className="tip-wrapper">
          {" "}
          <img className="image" src={commute}></img>
          <p class="tip">
            We strive on being reliable and to be the best in the industry.
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
          <p class="tip">
            {" "}
            Services to EWR Newark International Airport, JFK John F. Kennedy
            International Airport, LGA LaGuardia Airport, PHL Philadelphia
            International Airport Airport
          </p>
        </div>
      </ScalingElement>
      <ScalingElement pageOffsetY={10} cssSelector=".tip-wrapper">
        <div className="tip-wrapper">
          {" "}
          <img className="image" src={done}></img>
          <p class="tip">
            Quality transportation and door-to-door personalized service
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
          <p class="tip">
            {" "}
            Available for 6 hour and 12 hour corporate meetings
          </p>
        </div>
      </ScalingElement>
    </span>
  </>
  //</main>
);

export default App;
