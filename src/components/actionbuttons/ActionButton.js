import React from "react";
import {
  NavLink
} from "react-router-dom";
import "./actionbutton.scss";


const Actionbuttons = () => {


  return (
    <div className="actions">
      <NavLink to="/" exact={true} className="actions-link" activeClassName='actions-active' ><img className="png-img" style={{ height: '31px' }} src="diary/home.png" /></NavLink>
      {/* <NavLink to="/activity" className="actions-link" activeClassName='actions-active'><img className="png-img" src="journal.png" /></NavLink> */}
      <NavLink to="/diary" className="actions-link" activeClassName='actions-active'><img className="png-img" style={{ height: '35px' }} src="diary/research.png" /></NavLink>
      <NavLink to="/login" className="actions-link" activeClassName='actions-active'><img src="diary/user.svg" /></NavLink>

    </div>
  );
};

export default Actionbuttons;
