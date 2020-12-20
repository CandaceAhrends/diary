import React, { useState, useContext, useEffect } from "react";
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
import ClipLoader from "react-spinners/ClipLoader";

import "./datalist.scss";
import UsdaDetails from "./UsdaDetails";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    position: "absolute",
    left: 0,
    backgroundColor: "black",
    height: "80vh",
    overflow: "scroll",
    overflowX: "hidden",
    color: "white",
  },
  secondary: {
    color: "orange",
  },
}));


export default function DataList({ data, useFatSecret }) {
  const history = useHistory();
  const [state] = useContext(StoreContext);
  const classes = useStyles();
  const [expandables, setExpandables] = useState(null);
  const [foodList, setFoodList] = useState(null);
  const [selectedPortion, setSelecedPortion] = useState({});
  const [selectedServing, setSelectedServing] = useState(null);

  useEffect(() => {
    const expandables = data.reduce((expandables, foodItem) => {
      expandables[foodItem.food_id] =
        {
          expanded: false,
          details: {},
          isFetched: false
        }
      return expandables;
    },{});
    setExpandables(expandables);
    setFoodList(data);

  }, data);
 

  const toggleExpanded = (expandedItem)=>{
     expandedItem.expanded = !expandedItem.expanded;
     setExpandables({ ...expandables});
  }

  const onSelectedPortion = portion=>setSelecedPortion(portion);
  const onExpandDetails = ({ food_id }) => {


    if (state.isAuthenticated) {
      const expandedItem = expandables[food_id];    
    
      if (!expandedItem.expanded && !expandedItem.isFetched) {
        expandedItem.isFetched = true;
        foodDetail(food_id, useFatSecret).subscribe(details => {
          if(details.errorMessage){
            expandedItem.errorMessage = details.errorMessage;
          }
          expandedItem.details = { ...details };
          setExpandables({ ...expandables });

        });

      } 
      toggleExpanded(expandedItem);

    }
    else {
      history.push('/login');
    }

  };
  const onChangeServingSize = selectedServing => {
    console.log("changing serving", selectedServing);
    setSelectedServing(selectedServing);

  }
 
  const saveToDiary = foodId => {


    if (state.isAuthenticated) {

      const diaryItem = {
        id: foodId,        
        date: getcurrentDate(),
        qty: 1,
        type: useFatSecret?'fs':'usda',
        userId: state.user,
        portion: JSON.stringify(selectedPortion)
      }
      saveFood(diaryItem).subscribe(res => {
        console.log(res);
      });
    }
    else {
      history.push('/login');
    }


  }

  return (
    <>{expandables ? <List className={classes.root}>
      {foodList.map((food, idx) => {        
        return (
          <>
            <ListItem
              key={idx}
              dense
              button
              onClick={() => onExpandDetails(food)}
            >             
              <img src="arrow-right.svg" className={expandables[food.food_id].expanded ? 'expand' : 'collapse'} />
              <ListItemText
                id={food.food_id}
                key={food.food_id}
                primary={food.food_name}
                secondary={`${food.food_description.slice(food.food_description.indexOf('|') + 1)} `}
              />

              {expandables[food.food_id].errorMessage?null:<p className="calorie-badge" onClick={() => saveToDiary(food.food_id)}>
                <span>{food.food_description.slice(food.food_description.indexOf("-") + 1, selectedServing ? selectedServing.calories : food.food_description.indexOf("kcal"))}</span>
                <img src="./add.svg"></img>
                <div className="btn-spinner"> <ClipLoader

                  size={30}
                  color={"orange"}
                  loading={false}
                /></div>
              </p>}

            </ListItem>
            {/* {useFatSecret?<Details show={expandables[food.food_id].expanded} 
            data={expandables[food.food_id].details} changeServingSize={onChangeServingSize}></Details>: */}
            {expandables[food.food_id].isFetched?
              <UsdaDetails errorMessage={expandables[food.food_id].errorMessage} show={expandables[food.food_id].expanded} 
              data={expandables[food.food_id].details}
              onSelectedPortion={onSelectedPortion} ></UsdaDetails>:null
            }
          </>

        );
      })}
    </List> : null}
    </>
  );
}
