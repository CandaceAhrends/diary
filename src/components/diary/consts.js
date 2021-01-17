import React from 'react';

const FoodNameCellRenderer = ({ value }) => {
    return (value ? <span className="name-renderer">{value}</span> : <span>Totals:</span>)
}

const gridOptions = {
    enableSorting: true,
    rowHeight: 125,
    frameworkComponents: {
        'foodNameCellRenderer': FoodNameCellRenderer
    },
    columnDefs: [
        // { field: 'qty', width: 10, pinned: 'left' },
        { field: 'foodName', pinned: 'left', headerName: 'Name', width: 200, cellRenderer: 'foodNameCellRenderer' },
        // { field: 'servingDescription', headerName: 'Portion' },
        { field: 'Energy', headerName: 'Calories' },
        { field: "Caffeine", headerName: 'Caffeine mg' },
        { field: "Calcium", headerName: 'Calcium mg' },
        { field: "Carbohydrate", headerName: 'Carbs g' },
        { field: "Cholesterol", headerName: 'Cholesterol' },
        { field: "Folate", headerName: "Folate" },
        { field: "Fiber", headerName: "Fiber" },
        { field: "vit K (", headerName: 'Vitamin K mg', width: 200 },
        { field: "Copper", headerName: 'Copper mg' },
        { field: "Sugars", headerName: 'Sugars g' },
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
                background: '#333',
                color: 'white',
                fontSize: '1.5rem',

            }
        } else {
            return {
                fontSize: '1.2rem',
                color: 'rgba(200,200,200,1)'
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
};

export default gridOptions;