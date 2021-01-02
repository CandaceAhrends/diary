import React, { useState, useContext } from 'react';
import DiaryGrid from './DiaryGrid';
import { StoreContext } from "../../AppContext";

const DiaryController = () => {
    const [state,] = useContext(StoreContext);
    return (<>{state.diaryResults.length ? <DiaryGrid nutrientTotals={state.diaryResults}></DiaryGrid> :
        <p className="diary-loading">Loading, please wait...</p>}</>);
}

export default DiaryController;

function getDummy() {

    return [{ "foodName": "1 Burrito with beans, meatless", "servingDescription": "Quantity not specified", "Energy": "547.20", "Protein": "26.28", "Tota": "25.17", "Carbohydrate": "54.44", "Fiber": "7.70", "Sugars": "4.73", "Calcium": "564.30", "Iron": "4.93", "Magnesium": "79.80", "Phosphorus": "521.55", "Potassium": "621.30", "Sodium": "1527.60", "Zinc": "2.85", "Copper": "0.28", "Selenium": "31.35", "vit c": "7.41", "Thiamin": "0.44", "Riboflavin": "0.52", "Niacin": "3.91", "vit B-6": "0.26", "Folate": "82.65", "Foli": "48.45", "vit B-1": "0.00", "vit A, ": "116.85", "vit E (": "0.63", "vit E, ": "0.00", "vit D (": "0.28", "vit K (": "10.54", "Fatty acids": "2.83", "Cholesterol": "48.45", "Caffeine": "0.00", "qty": 1 }, { "totalsRow": true, "servingDescription": "", "Energy": "547.20", "Protein": "26.28", "Tota": "25.17", "Carbohydrate": "54.44", "Fiber": "7.70", "Sugars": "4.73", "Calcium": "564.30", "Iron": "4.93", "Magnesium": "79.80", "Phosphorus": "521.55", "Potassium": "621.30", "Sodium": "1527.60", "Zinc": "2.85", "Copper": "0.28", "Selenium": "31.35", "vit c": "7.41", "Thiamin": "0.44", "Riboflavin": "0.52", "Niacin": "3.91", "vit B-6": "0.26", "Folate": "82.65", "Foli": "48.45", "vit B-1": 0, "vit A, ": "116.85", "vit E (": "0.63", "vit E, ": 0, "vit D (": "0.28", "vit K (": "10.54", "Fatty acids": "2.83", "Cholesterol": "48.45", "Caffeine": 0, "qty": "" }];
}