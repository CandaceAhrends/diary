import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import searchFood from "../../api/searchFood";
import DataList from "../nutrition-details/DataList";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import classNames from 'classnames';
import PacmanLoader from "react-spinners/PacmanLoader";
import { inputValidator, stripIphoneQuotes } from "../../utils";
//import Switch from '@material-ui/core/Switch';

import "./search.scss";


const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 20,
    color: "#329AF4",
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

const SEARCH_ACTION = {
  type: 'SEARCH'
}
const SEARCH_RESULTS_ACTION = {
  type: 'SEARCH_RESULTS'
};
export default function Search({ url, search }) {
  const history = useHistory();
  const [state,dispatch] = useContext(StoreContext);  
  const [searchQueryEl, setSearchQueryEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useFatSecret, setUseFatSecret] = useState(false);
  const classes = useStyles();


  useEffect( ()=>{
    
    console.log(searchQueryEl)
    if(searchQueryEl){
      searchQueryEl.value = state.searchQuery;
      setSearchResults(state.searchResults);
    }
  },searchQueryEl);
 
  const handleFoodDBChange = ele => {
    setUseFatSecret(!useFatSecret);
  }

  const handleChange = ele =>setShowError(false); 

  const handleEnter = ele => {
    if ('Enter' === ele.key) {
      handleSearch();
    }
  }

  const handleSearch = () => {
    
    const query = searchQueryEl.value;
    dispatch({
      ...SEARCH_ACTION, payload: {
          searchQuery: query
      }
  })

    if (state.isAuthenticated) {

      const errorMessage = inputValidator(query);

      setErrorMessage(errorMessage);

      if (!errorMessage) {
        setLoading(true);
        setSearchResults([]);
        const food$ = searchFood(stripIphoneQuotes(query), useFatSecret).subscribe((foodList) => {

          if (foodList.errorMessage) {
            setErrorMessage(foodList.errorMessage);

          } else {
            const foodListSort = (a, b) => {
              const descA = a.food_name || '';
              const descB = b.food_name || '';

              if (descA.indexOf(query) < 3) {
                return -1;
              }
              else if (descB.indexOf(query) < 3) {
                return 0;
              }
              return 1;
            }
            const sorted = foodList.sort(foodListSort);

            setSearchResults(sorted);

            dispatch({
              ...SEARCH_RESULTS_ACTION, payload: {
                  searchResults: sorted
              }});

            
          }
          setLoading(false);
          //food$.unsubscribe();

        });
      } else {
        setShowError(true);
      }
    } else {
      history.push('/login');
    }
  };

  var errorClasses = classNames({
    'error-msg': true,
    'hide': !showError,
    'show': showError
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

      <main className={!searchQueryEl || searchQueryEl.value.length? 'hide no-selection' : 'no-selection'}>
        <img src="book.png" />
        <p>Enter Food or brand name</p>
      </main>

    </div>
  );
}
