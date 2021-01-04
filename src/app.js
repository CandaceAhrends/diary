import { hot } from "react-hot-loader";
import React, { useState, useReducer, useEffect } from "react";
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
import DiaryController from "./components/diary/DiaryController";
import { StoreContext, Auth, initialState } from "./AppContext";
import Reducer from './AppReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { getDiaryForDate } from "./api/getDiary";
import { take } from 'rxjs/operators';
import { createDiaryList } from './components/diary/diaryResultsTransformer';
import { RELOAD_DIARY_ACTION, DIARY_RESULTS_ACTION } from "./actions";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500]
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
 
  useEffect(() => {

    dispatch({
      ...RELOAD_DIARY_ACTION, payload: {
        reloadDiary: true
      }
    })

  }, []);

  useEffect(() => {

    if (state.reloadDiary && /*state.isAuthenticated)*/true) {

      dispatch({
        ...RELOAD_DIARY_ACTION, payload: {
          reloadDiary: false
        }
      });
   

      getDiaryForDate(null, 'cand').pipe(take(1)).subscribe(foodList => {
        if(foodList.length){
        dispatch({
          ...DIARY_RESULTS_ACTION, payload: {
            diaryResults: createDiaryList(foodList)
          }
        })

       
      }
      });
    }

  }, [state.reloadDiary, state.user]);

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
              <DiaryController />
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