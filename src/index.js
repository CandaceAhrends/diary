console.log("index.js starting");
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./app";
 
import "./styles.scss";

 

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
