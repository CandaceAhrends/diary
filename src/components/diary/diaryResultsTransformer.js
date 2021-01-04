

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




export function getNutrients(foodList, details) {

    const foodQtys = foodList.reduce((qtys, foodItem, idx) => {
        const portion = JSON.parse(foodItem.portion);
        qtys[`request-${idx}`] = { qty: foodItem.qty, foodPortion: portion };
        return qtys;
    }, {});

    return Object.entries(details).reduce((totals, [key, nutritionDetails]) => {
        if (nutritionDetails.description) {
            const qty = foodQtys[key].qty;
            const portion = foodQtys[key].foodPortion;

            const computedNutrientValues = nutritionDetails.nutrients.map(nutrient => {
                const amt = (nutrient.amount * portion.weight) / 100;
                const label = stripLabel(nutrient.name);
                return [`${label}`, amt.toFixed(2)];
            });

            totals.push({
                foodName: `${qty} ${nutritionDetails.description} ${ortion.description}`,

                ...Object.fromEntries(computedNutrientValues),
                qty,

            });
        }

        return totals;
    }, []);
}


export function nutrientsTotals(nutrients) {


    return nutrients.reduce((summary, item) => {
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

}

export function formatTotals(totalNutrition) {

    return Object.entries(totalNutrition).map(([k, v]) => {
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


}

