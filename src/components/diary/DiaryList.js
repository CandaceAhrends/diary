import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { StoreContext } from "../../AppContext";
import './diarylist.scss';
import { getDiaryForDate } from '../../api/getDiary';
import { clearDiary } from '../../api/clearDiary';
import foodDetail from "../../api/foodDetail";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { of, forkJoin } from 'rxjs';



const DiaryList = () => {
    const [list, setList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [nutrientTotals, setNutrientTotals] = useState({
        nutrition: {},
        diary: []
    });
    const [state] = useContext(StoreContext);
    const history = useHistory();

    useEffect(() => {
        setLoaded(true);

    }, []);
    useEffect(() => {

        let list$ = null;
        if (state.isAuthenticated) {
            list$ = getDiaryForDate(null, state.user).subscribe(foodList => {
                console.log("list >>>>", list);
                if (foodList.message) {
                    setErrorMessage(foodList.message);
                }
                else {
                    setList(foodList);
                    loadDiaryItems(foodList);

                    const total = foodList.reduce((sum, food) => {
                        sum += food.cal * food.qty;
                        return sum;
                    }, 0);

                    console.log("getting LIST >>>", foodList);
                }
            })
        } else {
            history.push("/login");
        }


        return () => list$ ? list$.unsubscribe() : null;
    }, []);

    const onClearAll = () => {

        clearDiary(null, state.user).subscribe(res => {
            console.log("diary cleared");
            setNutrientTotals({
                nutrition: {},
                diary: []

            })

        })
    }

    const loadDiaryItems = (foodList) => {

        const foodItem$ = foodList.map((foodItem, idx) => {
            return [`request-${idx}`, foodDetail(foodItem.foodId, foodItem.type === 'fs' ? true : false)];
        });

        const foodQtys = foodList.reduce((qtys, foodItem, idx) => {
            const portion = JSON.parse(foodItem.portion);
            console.log("portion >>>>>>>>>>>", portion);

            qtys[`request-${idx}`] = { qty: foodItem.qty, foodPortion: portion };
            return qtys;
        }, {});

        forkJoin({
            ...Object.fromEntries(foodItem$)
        }).subscribe(details => {
            console.log("details", Object.keys(details));
            const nutrients = Object.entries(details).reduce((totals, [key, nutritionDetails]) => {
                const qty = foodQtys[key].qty;
                const portion = foodQtys[key].foodPortion;

                const computedNutrientValues = nutritionDetails.nutrients.map(nutrient => {
                    const amt = (nutrient.amount * portion.weight) / 100;
                    return {
                        unitName: nutrient.unitName,
                        calculatedAmountPerServing: amt,
                        servingDescription: portion.description,
                        nutrientName: nutrient.name
                    };


                });

                totals[key] = {
                    foodName: nutritionDetails.description,
                    nutrients: computedNutrientValues,
                    qty,
                    portion
                }



                return totals;
            }, {

            });
            console.log("totals nutri >>>>>>>>>>>>>>>>   TABLE TOTALS", nutrients);

            setNutrientTotals(nutrients);
        });



    }

    const loginClasses = classNames(
        {
            "active": loaded,
            "login-wrapper": true
        }
    );
    return (
        <main className="diary-wrapper">
            <div className="diary-wrapper-background">
                <div className="diary-wrapper-content">{errorMessage ? <p>{errorMessage}</p> : <div >
                    <ul> <li>Total Nutrition Today</li>   <Button onClick={onClearAll} varint="contained" color="primary" >
                        <span style={{ border: 'solid white', color: 'white' }}>Clear all and start over</span>
                    </Button></ul>
                    <ul>

                        {Object.entries(nutrientTotals.nutrition).map(([name, data]) => <li className="nutrients" >
                            <span><p>{name.slice(0, 16)}</p></span><span>{data.total.toFixed(2)}{data.unitName}</span></li>)}
                    </ul>
                    <ul>
                        {nutrientTotals.diary.map(item => <li><span>{item.qty}</span><span>{item.description}</span></li>)}
                    </ul>
                </div>}
                </div>
            </div>
        </main>
    );
}

export default DiaryList;