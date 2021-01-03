import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import searchFood from "../../api/searchFood";
import NutritionList from "../nutrition-facts/NutritionList";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import classNames from 'classnames';
import PacmanLoader from "react-spinners/PacmanLoader";
import { inputValidator, stripIphoneQuotes } from "../../utils";
import { timeout } from 'rxjs/operators';
import { take } from 'rxjs/operators';

//import Switch from '@material-ui/core/Switch';

import "./search.scss";


const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 20,
    // color: "#329AF4",
    color: '#999'
  },
  iconSearch: {
    height: 43,
    width: 61,
    padding: '17px'

  },
  search: {
    borderRadius: 25,
  },
  input: {

    "&:invalid": {
      color: "#999 !important",
      textDecoration: 'line-through'

    }
  }

}));
const NO_RESULTS = "No Results";

const SEARCH_ACTION = {
  type: 'SEARCH'
}
const SEARCH_RESULTS_ACTION = {
  type: 'SEARCH_RESULTS'
};
export default function Search({ url, search }) {
  const history = useHistory();
  const [state, dispatch] = useContext(StoreContext);
  const [searchQueryEl, setSearchQueryEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultsErrorMessage, setResultsErrorMessage] = useState(null);
  const [useFatSecret, setUseFatSecret] = useState(false);
  const classes = useStyles();


  useEffect(() => {

    console.log(searchQueryEl)
    if (searchQueryEl) {
      searchQueryEl.value = state.searchQuery;
      setSearchResults(state.searchResults);
    }
  }, searchQueryEl);

  const handleFoodDBChange = ele => {
    setUseFatSecret(!useFatSecret);
  }

  const handleChange = ele => setShowError(false);

  const handleEnter = ele => {
    if ('Enter' === ele.key) {
      handleSearch();
    }
  }

  const handleSearch = () => {

    const query = searchQueryEl.value;
    setResultsErrorMessage(null);
    dispatch({
      ...SEARCH_ACTION, payload: {
        searchQuery: query
      }
    })

    if (state.isAuthenticated) {

      const errorFound = inputValidator(query);

      setErrorMessage(errorFound);

      if (!errorFound) {
        setLoading(true);
        setSearchResults([]);
        searchFood(stripIphoneQuotes(query), useFatSecret).pipe(take(1)).subscribe((foodList) => {
          if (!foodList || !foodList.length) {
            setResultsErrorMessage(NO_RESULTS);
          }
          if (foodList.errorMessage) {
            setResultsErrorMessage(foodList.errorMessage);
          } else {
            setSearchResults(foodList);
            dispatch({
              ...SEARCH_RESULTS_ACTION, payload: {
                searchResults: foodList
              }
            });

            setLoading(false);
          }
        });
      } else {
        setShowError(true);
      }
    } else {
      history.push('/login');
    }
  };
  const handleClear = evt => {
    searchQueryEl.value = '';
  }
  const errorClasses = classNames({
    'error-msg': true,
    'hide': !showError,
    'show': showError
  });
  const resultsClasses = classNames({
    'results-container': true,
    'initial-load': !state.searchQuery.length || loading || resultsErrorMessage,
    'show-intro': !state.isAuthenticated || state.searchQuery.length && !searchResults.length
  });
  const initialLoadClasses = classNames({
    'no-selection': true,
    'hide': state.searchQuery.length && state.isAuthenticated
  });

  return (
    <div className="search-container">

      <label className={errorClasses} htmlFor="search" onClick={() => setShowError(false)}>{errorMessage}</label>

      <TextField
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleEnter}
        className={classes.search}
        name="search"
        inputRef={el => setSearchQueryEl(el)}
        type="text"

        InputProps={{
          className: classes.input,

          form: {
            autoComplete: "off",
          },

          endAdornment: (
            <InputAdornment position="end">

              <CancelIcon className={searchQueryEl ? 'cancel-search' : 'hide'} onClick={handleClear}></CancelIcon>



              <IconButton
                onClick={handleSearch}
                className={classes.iconButton}
                edge="end"

              >

                <SearchIcon className={classes.iconSearch}></SearchIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div className={resultsClasses} >
        {
          searchResults.length ? (
            <>
              <NutritionList useFatSecret={useFatSecret} data={searchResults}></NutritionList></>
          ) : null
        }
        < div className="loader"> <PacmanLoader

          size={100}
          color={"orange"}
          loading={loading}
        />
        </div>
      </div>
      { resultsErrorMessage ? <p className="results-error">{resultsErrorMessage}</p> : null}
      <main className={initialLoadClasses}>
        <img src="diary/book-101.gif" />
        <p>Enter Food or brand name</p>

      </main>

    </div >
  );
}
