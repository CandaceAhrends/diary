

import { hot } from "react-hot-loader";
import React, { useState, useContext, useReducer } from "react";
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
import Activity from "./components/activity/Activity";
import DiaryList from "./components/diary/DiaryList";
import { StoreContext, Auth, initialState } from "./AppContext";
import Reducer from './AppReducer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});

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
   <ThemeProvider theme={theme}>
      <Header></Header>

      <main className={location.pathname}>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <RouteGuard path="/diary">
            <DiaryList />
          </RouteGuard>
          <RouteGuard path="/activity">
            <Activity></Activity>
          </RouteGuard>
          <Route path="/">
            <Search></Search>
          </Route>
        </Switch>
      </main>
      </ThemeProvider>

    </Router></StoreContext.Provider>);

};

export default hot(module)(App);