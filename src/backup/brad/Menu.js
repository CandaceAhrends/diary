import React, { useEffect } from "react";
import "./menu.scss";
const IMG_CLASS = "sc-image";
const IMG_CLASS_GROW = "sc-image-grow";
const SCROLL_EVENT = "scroll";
const Menu = () => {
  useEffect(() => {
    const top = document.querySelector(".top-container nav");
    const sub = document.querySelector(".menu");
    top.classList.remove("top-menu");

    sub.classList.remove("sub-menu");
    top.classList.add('nav');

    const scrollfn = () => {

      if (window.pageYOffset > 10) {
        top.classList.add("top-menu");
        sub.classList.add("sub-menu");
        top.classList.remove('nav');
      } else {
        top.classList.remove("top-menu");
        sub.classList.remove("sub-menu");
        top.classList.add('nav');
      }
    };
 

    window.addEventListener(SCROLL_EVENT, scrollfn, false);

    return () => {
      window.removeEventListener(SCROLL_EVENT, scrollfn);
    };
  });
  return (
    <div class="top-container">
      <nav className="top-menu">
        <ul>
          <li>
            <div class="logo-title">
              <span class="title">Brad Limo</span>
              <span class="title-desc"></span>
            </div>
          </li>
        </ul>
      </nav>
      <div class="menu">
        <p class="getintouch">
          <span>Get In Touch Today</span>
          <a href="tel:17323974318">+1 732.397.4318</a>
        </p>
        <div
          style={{ position: "absolute", top: "116px", left: "500px" }}
          id="yelp-biz-badge-plain-Lh4h6bEC-yuxJpNcYqGR0Q"
        >
          <a href="https://www.yelp.com/biz/brad-limo-edison">
            <img
              alt="Brad Limo"
              src="https://dyn.yelpcdn.com/extimg/genericYelpBizButton.png"
              height="33"
              width="88"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
