import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { NutritionFacts } from './NutritionFacts';
import "./datalist.scss";

const PORTION_SELECT_DROP_DOWN = "portion-select";
const MAX_PORTION_LABEL_SIZE = 25;
export default function UsdaDetails({ data, show, errorMessage, onSelectedPortion, saveToDiary }) {
    console.log("show is ? ", show);

    const [nutritionList, setNutritionList] = useState([]);
    const [selectedPortion, setSelectedPortion] = useState('');
    const [showPortionPopup, setShowPortionPopup] = useState(false);
    const [portionLabel, setPortionLabel] = useState('Select a Portion');
    useEffect(() => {

        if (data.portionList && data.portionList.length) {
            const firstPortion = data.portionList[0];
            setPortionLabel(firstPortion.description);
            setSelectedPortion(JSON.stringify(firstPortion));
            calculateNutritionValuesPerPortions(firstPortion);

        }

    }, data);
    const onAddToDiary = foodId => {
        saveToDiary(foodId);
    }
    const calculateNutritionValuesPerPortions = portion => {

        const nutritionData = data.nutrients.map(({ unitName, name, amount }) => {

            const factor = amount * portion.weight;
            amount = (factor / 100);
            amount = amount.toFixed(2);
            return {
                unitName, name, amount
            };

        });
        setNutritionList(nutritionData);
        onSelectedPortion(portion);

    }

    const handleClick = evt => {
        const portionSelectData = evt.currentTarget.getAttribute('data-select');
        const portionData = evt.target.id;


        if (!portionData && portionSelectData === PORTION_SELECT_DROP_DOWN) {
            setShowPortionPopup(true);
        }
        else {
            setShowPortionPopup(false);
            const portion = JSON.parse(portionData);
            const portionLabel = portion.description.length > MAX_PORTION_LABEL_SIZE ?
                `${portion.description.slice(0, MAX_PORTION_LABEL_SIZE)}...` : portion.description;
            setPortionLabel(portionLabel);
            setSelectedPortion(portion);
            calculateNutritionValuesPerPortions(portion);
            console.log(portion);
        }


    };

    return (
        data.portionList ? < ><div className={show ? 'show calorie-details' : 'hide calorie-details'}>
            <div>


                <section>
                    <div className="calorie-details-select-wrapper"
                        onClick={handleClick} data-select={PORTION_SELECT_DROP_DOWN}>
                        <div
                            className="calorie-details-portion-select"


                        >
                            <span>{portionLabel}</span>
                            <span data-select={PORTION_SELECT_DROP_DOWN} className="calorie-details-select-wrapper-arrow" onClick={handleClick}>

                            </span>

                            <ul className={showPortionPopup ? 'show' : ''}> {data.portionList.map((portion, idx) => <li key={idx} id={JSON.stringify(portion)}>{portion.description}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div> <span className="calorie-badge"
                        onClick={() => onAddToDiary(data.foodId)}>
                        <img src="./add.svg"></img>


                    </span>  </div>
                </section>

                {nutritionList.length ? <NutritionFacts nutrients={nutritionList}></NutritionFacts> : null}
                {/* {nutritionList.map(({ unitName, name, amount }) => <div className="detail"><span>{name}</span>
                    <span> {amount} {unitName}</span></div>)} */}

            </div>

        </div></> : errorMessage ? <p class="error">{errorMessage}</p> : <div className={show ? 'loading-details-spinner' : 'hide'}> <PropagateLoader

            size={30}
            color={"orange"}
            loading={true}
        /></div>
    );
}

