import React, { useEffect, useContext, } from "react";
import Actionbuttons from "../actionbuttons/ActionButton";
import { StoreContext } from "../../AppContext";
import "./header.scss";

const ANIMATE_CLASS = "animated-menu";

const Header = (props) => {
  const [state] = useContext(StoreContext);

  useEffect(() => {
    const top = document.querySelector(".primary-menu");

    const animateLoad = setTimeout(() => {
      top.classList.add(ANIMATE_CLASS);

    }, 0);

    if (state.isAuthenticated) {
      top.classList.add('loggedin-menu');
    }
    console.log("use effect ran for state change >>", state);
    return () => {
      clearTimeout(animateLoad);
    };
  }, [state.isAuthenticated]);

  return (
    <>
      {state.user ? <span className='user'>Welcome  {state.user}</span> : null}
      <nav class="primary-menu">
        <div class="logo">
          <p>Diet
            {/* <a href="https://platform.fatsecret.com">
            <img src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg" border="0" />
          </a> */}
            < p className="usda" >USDA</p>
          </p>
          <p>Diary</p>

        </div>


        <div>
          <Actionbuttons></Actionbuttons>

        </div>
      </nav>

    </>
  );
};

export default Header;
