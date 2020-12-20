console.log("index.js starting");
import React, { Component } from "react";
import ReactDOM from "react-dom";
 
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";

import Lookup from "./Lookup";
import retargetEvents from 'react-shadow-dom-retarget-events';

 

class XSearch extends HTMLElement {
    static get observedAttributes() {
        return ['search']
    }
 
  connectedCallback() {
   
    const mountPoint = document.createElement("span");
     this.reactRoot = this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    const jss = create({
      ...jssPreset(),
      insertionPoint: this.reactRoot,
    });
    retargetEvents(this.reactRoot);
    ReactDOM.render(
      <StylesProvider jss={jss}>
           <Lookup searchUrl="testUrl" />
      </StylesProvider>,
      mountPoint
    );

    
  }
}
customElements.define("food-search", XSearch);

 