import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Axios from "../../Axios";
import { API } from "../login.config";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import "./login.scss";
import "./forms.scss";

const Login = () => {
  const [user, setUser] = useState({ name: "", pwd: "" });
  const [message, setMessage] = useState("please log in");

  window.addEventListener("x-increment", (event) => {
    // extract data
    const { q } = event.detail;

    console.log("search >>", q);

    // pass down to a child
    //this.shadowRoot.querySelector('x-target').amount = amount;
  });

  const handleChange = (evt) => {
    console.log("data changed >", evt.target.name, evt.target.value);
    const changedUser = { ...user, [evt.target.name]: evt.target.value };
    setUser(changedUser);
    console.log(changedUser);
  };
  const handleSubmit = () => {
    console.log(user);
    Axios.post(`${API}/login`, user)
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          return of({ message: "Server Error" });
        })
      )
      .subscribe((res) => {
        console.log("log in response : > ", res);
        setMessage(res.message);
      });
  };
  return (
    <div class="login-container">
      <form class="login-form" onChange={handleChange} autoComplete="off">
        <label for="name">User Name</label>
        <TextField name="name" type="text" />
        <label for="name">Password</label>
        <TextField name="pwd" type="password" />
        {/* <Button color="primary" onClick={handleSubmit}>Sign In</Button> */}
      </form>
      {/* <div>{message}</div> */}
    </div>
  );
};

export default Login;
