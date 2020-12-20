import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./datalist.scss";

export default function UsdaDetails({ data, show, errorMessage, onSelectedPortion }) {
    console.log("show is ? ", show);

    const [nutritionList, setNutritionList] = useState([]);
    
    useEffect( ()=>{

        if(data.portionList && data.portionList.length){
        const firstPortion = data.portionList[0];
        calculateNutritionValuesPerPortions(firstPortion);

        }

    },data);

    const calculateNutritionValuesPerPortions = portion=>{

        const nutritionData = data.nutrients.map( ({unitName, name, amount})=>{

            const factor = amount*portion.weight;
            amount = (factor/100);
            amount = amount.toFixed(2);
            return {
                unitName, name, amount
            };

        });
        setNutritionList(nutritionData);        
        onSelectedPortion(portion);

    }

    const handleChange = evt=>{
        const portion = JSON.parse(evt.target.value);
        calculateNutritionValuesPerPortions(portion);
        console.log(portion);
        
    };

    return (
        data.portionList ? < ><div className={show ? 'show calorie-details' : 'hide calorie-details'}>
             <select onChange={handleChange} >
                {data.portionList.map( (portion,idx) => <option key={idx} value={JSON.stringify(portion)}>{portion.description}</option>)}
            </select>
            {nutritionList.map(({ unitName, name, amount }) => <div className="detail"><span>{name}</span>
                <span> {amount} {unitName}</span></div>)}
        </div></> : errorMessage ? <p class="error">{errorMessage}</p> : <div className={show ? 'loading-details-spinner' : 'hide'}> <PropagateLoader

            size={30}
            color={"orange"}
            loading={true}
        /></div>
    );
}

