import React, { useState, useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Details from "./Details";
import saveFood from "../../api/savefood";
import foodDetail from "../../api/foodDetail";
import { getcurrentDate } from "../../utils";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import { take } from 'rxjs/operators';
import ClipLoader from "react-spinners/ClipLoader";
import { stripAllAfterFirstComma, stripAllBeforeFirstComma } from "../../utils";
import "./datalist.scss";
import UsdaDetails from "./UsdaDetails";
import { useInView } from "react-intersection-observer";
import VirtualScroll from "../virtual-scroll/VirtualScroll";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    position: "absolute",
    left: 0,
    backgroundColor: "black",
    height: "calc(100vh - 300px)",
    overflow: "scroll",
    overflowX: "hidden",
    color: "white",
    [theme.breakpoints.up('md')]: {
      height: "calc(100vh - 320px)",
    },
    [theme.breakpoints.up('lg')]: {
      height: "calc(100vh - 350px)",
    },
  },
  secondary: {
    color: "orange",
  }
}));


export default function NutritionList({ data, useFatSecret }) {
  const history = useHistory();
  const [state] = useContext(StoreContext);
  const classes = useStyles();
  const [expandables, setExpandables] = useState(null);
  const [foodList, setFoodList] = useState(null);
  const [selectedPortion, setSelecedPortion] = useState({});
  const [saveStatus, setSaveStatus] = useState(0);
  const [testing, setTesting] = useState("testing value")

  //const [t, setT]= useRef('okay');
  useEffect(() => {
    const expandables = data.reduce((expandables, foodItem) => {
      expandables[foodItem.food_id] =
      {
        expanded: false,
        details: {},
        isFetched: false,
        fetching: false,
        selectedPortion: null
      }
      return expandables;
    }, {});
    setExpandables(expandables);
    const foodList = data.map(food => {
      return {
        ...food,
        primaryDescription: stripAllAfterFirstComma(food.food_name),
        secondaryDescription: stripAllBeforeFirstComma(food.food_name)
      }
    });


    setFoodList(foodList);

  }, data);


  const toggleExpanded = (expandedItem) => {
    expandedItem.expanded = !expandedItem.expanded;
    setExpandables({ ...expandables });
  }

  const onSelectedPortion = (portion, foodId) => {
    expandables[foodId].selectedPortion = portion;

    setExpandables({ ...expandables });
  }
  const onExpandDetails = ({ food_id }) => {


    if (state.isAuthenticated) {
      const expandedItem = expandables[food_id];

      if (!expandedItem.expanded && !expandedItem.isFetched) {
        expandedItem.fetching = true;
        foodDetail(food_id, useFatSecret).subscribe(details => {
          if (details.errorMessage) {
            expandedItem.errorMessage = details.errorMessage;
          }
          expandedItem.isFetched = true;
          expandedItem.fetching = false;
          expandedItem.details = { ...details, foodId: food_id };
          setExpandables({ ...expandables });

        });

      }
      toggleExpanded(expandedItem);

    }
    else {
      history.push('/login');
    }

  };


  const saveToDiary = foodId => {
    setSaveStatus(null);

    if (state.isAuthenticated) {
      const portion = expandables[foodId].selectedPortion;
      if (portion) {
        const diaryItem = {
          id: foodId,
          date: getcurrentDate(),
          qty: 1,
          type: useFatSecret ? 'fs' : 'usda',
          userId: state.user,
          portion: JSON.stringify(portion)
        }
        saveFood(diaryItem).pipe(take(1)).subscribe(res => {
          console.log(res);
          if (res.data && res.data.message) {
            setSaveStatus(1);
          }
          else {
            setSaveStatus(-1);
          }

        });
      }
    }
    else {
      history.push('/login');
    }


  }

  const isExpanded = (id) => {
    console.log("what is value", testing)
    //return true;
    return expandables[id].expanded;
  }

  const scrollNext = info => {
    console.log("scroll next", info);
  }

  return (
    <>

      {expandables ? <List className={classes.root}>
        <VirtualScroll scrollNext={scrollNext.bind(this)} data={foodList} rowRenderer={foodList => foodList.map((food, idx) => {
          return (
            <>
              <ListItem
                key={idx}
                dense
                button
                onClick={() => onExpandDetails(food)}
              >
                <img src="arrow-right.svg" className={isExpanded(food.food_id) ? 'expand' : 'collapse'} />
                <ListItemText
                  id={food.food_id}
                  key={food.food_id}
                  primary={food.primaryDescription}
                  secondary={food.secondaryDescription}
                />

              </ListItem>
              <span>{expandables[food.food_id].fetching || expandables[food.food_id].isFetched ? <UsdaDetails errorMessage={expandables[food.food_id].errorMessage} show={expandables[food.food_id].expanded}
                data={expandables[food.food_id].details}
                saveToDiary={saveToDiary}
                saveStatus={saveStatus}
                onSelectedPortion={portion => onSelectedPortion(portion, food.food_id)} ></UsdaDetails> : null}</span>

            </>

          );
        })}

        >
        </VirtualScroll>
      </List> : null}
    </>
  );
}
