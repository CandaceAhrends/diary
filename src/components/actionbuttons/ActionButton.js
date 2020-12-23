import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./actionbutton.scss";


const Actionbuttons = () => {


  return (
    <div className="action-btns">

     
      <Link to="/"><img src="search.svg" /></Link>
      <Link to="/activity"><img src="pie-chart.svg" /></Link>
      <Link to="/diary"><img src="journal.svg" /></Link>     
      <Link to="/login"><img src="user.svg" /></Link>

    </div>
  );
};

export default Actionbuttons;
