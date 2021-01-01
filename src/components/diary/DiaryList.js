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
import { AgGridColumn, AgGridReact } from 'ag-grid-react';



const DiaryList = () => {
    const [list, setList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [nutrientTotals, setNutrientTotals] = useState([]);
    const [state] = useContext(StoreContext);
    const history = useHistory();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


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
            setNutrientTotals([]);

        })
    }
    const stripLabel = label => {
        const indexOfSpace = label.indexOf(' ');
        const indexOfComma = label.indexOf(",");
        if (label.indexOf("ascorbic acid") > 0) {
            return 'vit c';
        }
        else if (label.indexOf("Vitamin") === 0) {
            return `vit${label.slice(7, 11)}`;
        }
        else if (indexOfComma > 0) {
            return label.slice(0, indexOfComma);
        }
        else if (indexOfSpace > 0) {
            return label.slice(0, indexOfSpace - 1);
        }

        return label;
    }
    const loadDiaryItems = (foodList) => {

        const foodItem$ = foodList.map((foodItem, idx) => {
            return [`request-${idx}`, foodDetail(foodItem.foodId, foodItem.type === 'fs' ? true : false)];
        });

        const foodQtys = foodList.reduce((qtys, foodItem, idx) => {
            const portion = JSON.parse(foodItem.portion);
            qtys[`request-${idx}`] = { qty: foodItem.qty, foodPortion: portion };
            return qtys;
        }, {});

        forkJoin({
            ...Object.fromEntries(foodItem$)
        }).subscribe(details => {
            const nutrients = Object.entries(details).reduce((totals, [key, nutritionDetails]) => {
                const qty = foodQtys[key].qty;
                const portion = foodQtys[key].foodPortion;

                const computedNutrientValues = nutritionDetails.nutrients.map(nutrient => {
                    const amt = (nutrient.amount * portion.weight) / 100;
                    const label = stripLabel(nutrient.name);
                    return [`${label}`, amt.toFixed(2)];
                });

                totals.push({
                    foodName: `${qty} ${nutritionDetails.description}`,
                    servingDescription: portion.description,
                    ...Object.fromEntries(computedNutrientValues),
                    qty,

                });

                return totals;
            }, []);

            const totalNutrition = nutrients.reduce((summary, item) => {
                Object.entries(item).map(([k, v]) => {
                    if (/^\d+\.+\d+$/.test(v)) {
                        summary[k] = summary[k] || 0;
                        summary[k] += (v) * item.qty;
                    }
                 else {

                        summary[k] = '';
                    }
                });
                return summary;
            }, {});

            const formattedTotals = Object.entries(totalNutrition).map(([k, v]) => {
                console.log("k ???", k, v);
                if (/^\d+\.+\d+$/.test(v)) {
                    const amt = Number(v).toFixed(2);
                    console.log("amt ", amt, k, v);
                    return [k, amt]

                }
                else if (k === 'foodName') {
                    return ['totalsRow', true];
                }
                return [k, v];

            })


            nutrients.push(Object.fromEntries(formattedTotals));
            console.log(nutrients);

            setNutrientTotals(nutrients);
        });



    }
    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const loginClasses = classNames(
        {
            "active": loaded,
            "login-wrapper": true
        }
    );





    const gridOptions = {
        enableSorting: true,
        columnDefs: [
            // { field: 'qty', width: 10, pinned: 'left' },
            { field: 'foodName', pinned: 'left', headerName: 'Name', width: 200 },
            { field: 'servingDescription', headerName: 'Portion' },
            { field: 'Energy', headerName: 'Calories' },
            { field: "Caffeine", headerName: 'Caffeine mg' },
            { field: "Calcium", headerName: 'Calcium mg' },
            { field: "Carbohydrate", headerName: 'Carbs g' },
            { field: "Cholesterol", headerName: 'Cholesterol'},
            { field: "Folate", headerName: "Folate" },
            { field: "Fiber", headerName: "Fiber" },
            { field: "vit K (", headerName: 'Vitamin K mg', width: 200 },
            { field: "Copper", headerName: 'Copper mg' },
             { field: "Sugars" , headerName: 'Sugars g'},
            // { field: "polyunsaturated(g)" , headerName: 'Polyunsaturated g'},
            // { field: "saturated(g)", headerName: 'Saturated g' },
            // { field: "Fiber(g)" , headerName: 'Fiber g'},
            // { field: "Folate, (µg)", },
            // { field: "Folic acid(µg)" },
            { field: "Iron", headerName: 'Iron mg' },
            { field: "Magnesium", headerName: 'Magnesium mg' },
            { field: "Phosphorus", headerName: 'Phosphorus mg' },
            { field: "Potassium", headerName: 'Potasium mg' },
            { field: "Protein", headerName: 'Protein g' },
            { field: "Riboflavin", headerName: 'Riboflavin mg' },
            // { field: "Selenium, Se(µg)", headerName: 'Selenium ug' },
            { field: "Sodium", headerName: 'Sodium mg' },
            { field: "Thiamin", headerName: 'Thiamin mg' },
            { field: "Tota", headerName: 'Fat g' },
            { field: "vit B-6", headerName: 'B-6 mg' },
            { field: "vit B-1", headerName: 'B-12 ug' },
            { field: "vit c", headerName: 'Vitamin C mg' },
            { field: "vit D (", headerName: 'Vitamin D ug' },
            { field: "Zinc", headerName: 'Zink mg' }


        ],
        getRowStyle: function (params) {

            if (params.node.data['totalsRow']) {
                return {
                    background: '#999',
                    color: 'white',
                    fontSize: '1.2rem',
                    height: '68px'
                }
            }
        },
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            filter: true,
            sortable: true,
            resizable: true,
        }
    }
    return (
        <main className="diary-wrapper">


            {/* <div className="diary-wrapper-background">
                <div className="diary-wrapper-content">{errorMessage ? <p>{errorMessage}</p> : <div >
              */}
            <button onClick={onClearAll}>CLEAR ALL</button>

            <div className="ag-theme-alpine-dark" style={{ height: '80vh', width: '95vw' }}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowData={nutrientTotals}>

                </AgGridReact>
            </div>


        </main>
    );
}

export default DiaryList;