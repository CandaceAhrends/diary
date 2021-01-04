import React, { useState, useContext, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import saveFood from "../../api/savefood";
import foodDetail from "../../api/foodDetail";
import { getcurrentDate } from "../../utils";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import { take } from 'rxjs/operators';
import { stripAllAfterFirstComma, stripAllBeforeFirstComma } from "../../utils";
import "./datalist.scss";
import "./nutritionList.scss";
import UsdaDetails from "./UsdaDetails";

const LOGIN_PATH = '/login';

const RELOAD_DIARY_ACTION = {
  type: 'RELOAD_DIARY'

};

export default function NutritionList({ data, useFatSecret }) {
  const history = useHistory();
  const [state, dispatch] = useContext(StoreContext);
  const [expandables, setExpandables] = useState(null);
  const [foodList, setFoodList] = useState(null);

  useEffect(() => {
    const expandables = data.reduce((expandables, foodItem) => {
      expandables[foodItem.food_id] =
      {
        expanded: false,
        details: {},
        isFetched: false,
        fetching: false,
        selectedPortion: null,
        saveStatus: 0
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
        foodDetail(food_id).subscribe(details => {
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
      history.push(LOGIN_PATH);
    }

  };


  const saveToDiary = foodId => {

    if (state.isAuthenticated) {
      const expandedItem = expandables[foodId];

      const portion = expandedItem.selectedPortion;

      portion.saveStatus = 0;
      if (portion) {
        const diaryItem = {
          id: foodId,
          date: getcurrentDate(),
          qty: 1,
          type: 'usda',
          userId: state.user,
          portion: JSON.stringify(portion)
        }
        saveFood(diaryItem).pipe(take(1)).subscribe(res => {
          console.log(res);
          if (res.data && res.data.message) {
            expandedItem.saveStatus = 1;
            setExpandables({ ...expandables });

            dispatch({
              ...RELOAD_DIARY_ACTION, payload: {
                reloadDiary: true
              }
            })

          }
          else {
            expandedItem.saveStatus = -1
            setExpandables({ ...expandables });
          }

        });
      }
    }
    else {
      history.push(LOGIN_PATH);
    }
  }

  const isExpanded = (id) => {
    return expandables[id].expanded;
  }

  return (
    <>

      {expandables ? <List className="nutrition-list">
        {foodList.map((food, idx) => {
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
                saveStatus={expandables[food.food_id].saveStatus}
                onSelectedPortion={portion => onSelectedPortion(portion, food.food_id)} ></UsdaDetails> : null}</span>

            </>

          );
        })}



      </List> : null}
    </>
  );
}
