

import { hot } from "react-hot-loader";
import React, { useState, useContext ,useReducer} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./app.scss";
import "./forms.scss";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import Login from "./components/login/Login";
import DiaryList from "./components/diary/DiaryList";
import  { StoreContext, Auth, initialState } from "./AppContext";
import Reducer from './AppReducer';


function RouteGuard({ children, ...rest }) {
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
      Auth.getToken() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const App = () => {

  const [state, dispatch] = useReducer(Reducer, initialState);
  return (<StoreContext.Provider value={
    [state, dispatch, Auth]
  }><Router>

    <Header></Header>

    <main className={location.pathname}>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <RouteGuard path="/diary">
          <DiaryList />
        </RouteGuard>
        <Route path="/">
          <Search></Search>
        </Route>
      </Switch>
    </main>

  </Router></StoreContext.Provider>);

};

export default hot(module)(App);