import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import searchFood from "../../api/searchFood";
import DataList from "../datalist/DataList";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import classNames from 'classnames';
import PacmanLoader from "react-spinners/PacmanLoader";
import Switch from '@material-ui/core/Switch';

import "./search.scss";


const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 20,
    color: "#329AF4",
  },
  iconSearch: {
    height: 50,
    width: 50,
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
const searchValidator = (query) => {
  const INVALID_CHAR_ERROR = "Invalid characters used";
  const INVALID_LEN_ERROR = "Enter at least 3 characters";
  const MIN_CHAR_SIZE = 3;

  let errorMessage = null;
  const normalizedQuery = query.replace(/[\u2018\u2019\u201C\u201D]/g, (c) => '\'\'""'.substr('\u2018\u2019\u201C\u201D'.indexOf(c), 1));
  const isValidChar = /^[a-zA-Z0-9‘’'_.-\s]+$/.test(normalizedQuery);
  const isValidLen = normalizedQuery.length >= MIN_CHAR_SIZE;

  if (!isValidChar) {
    errorMessage = INVALID_CHAR_ERROR;
  }
  if (!isValidLen) {
    errorMessage = INVALID_LEN_ERROR;
  }

  return [errorMessage, normalizedQuery];
};

export default function Search({ url, search }) {
  const history = useHistory();
  const [state] = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removeError, SetRemoveError] = useState(false);
  const [useFatSecret, setUseFatSecret] = useState(false);

  const classes = useStyles();

  //const validateSearch = 
  const handleFoodDBChange = ele => {

    setUseFatSecret(!useFatSecret);
  }
  const handleEnter = ele => {
    if ('Enter' === ele.key) {
      handleSearch();
    }
  }
  const handleChange = (ele) => {
    setSearchQuery(ele.target.value);
    setErrorMessage(null);
  };
  const handleSearch = () => {

    if (state.isAuthenticated) {

      SetRemoveError(false);
      const [errorMessage, normalizedQuery] = searchValidator(searchQuery);

      if (!errorMessage) {
        setLoading(true);
        setSearchResults([]);
        const food$ = searchFood(normalizedQuery,useFatSecret).subscribe((foodList) => {

          if (foodList.errorMessage) {
            setErrorMessage(foodList.errorMessage);

          } else {
            console.log("getting fat secret food list", foodList);

            setSearchResults(foodList);
          }
          setLoading(false);
          //food$.unsubscribe();

        });
      } else {
        setErrorMessage(errorMessage);
      }
    } else {
      history.push('/login');
    }
  };

  var errorClasses = classNames({
    'error-msg': errorMessage,
    'no-error': !errorMessage,
    'hide': removeError,
    'show': !removeError
  });

  return (
    <div className="search-container">

      <label className={errorClasses} onClick={() => SetRemoveError(true)}>{errorMessage}</label>
      {/* <Diary></Diary> */}
      <TextField
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleEnter}
        className={classes.search}
        name="search"

        type="text"
        InputProps={{
          className: classes.input,
          pattern: "^[a-zA-Z0-9_.-]+$",
          form: {
            autoComplete: "off",
          },

          endAdornment: (
            <InputAdornment position="end">
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
      <div className="database-switch"><Switch
        checked={useFatSecret}
        onChange={handleFoodDBChange}
        disabled={true}
        name="checkedB"
        color="orange"
      />{useFatSecret ? <p>Fat Secret</p> : <p>USDA</p>}
      </div>
      <div class="results-container">
        {searchResults.length ? (
          <>
            <DataList useFatSecret={useFatSecret} data={searchResults}></DataList></>
        ) : null}
        <div className="loader"> <PacmanLoader

          size={100}
          color={"orange"}
          loading={loading}
        />
        </div>
      </div>
      {/* <p className={searchQuery.length && emptyResults ? 'no-results' : 'hide'}>
        No Results
      </p> */}

      <main className={searchQuery.length || searchResults.length ? 'hide' : 'no-selection'}>
        <img src="book.png" />
        <p>Enter Food or brand name</p>
      </main>

    </div>
  );
}
