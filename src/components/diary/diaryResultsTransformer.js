import { addElipses } from '../../utils';

const computedNutrientValues = ({ portion, details }) => details.nutrients.map(nutrient => {
    const amt = (nutrient.amount * portion.weight) / 100;
    const label = stripLabel(nutrient.name);
    return [`${label}`, amt.toFixed(2)];
});

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

export const createDiaryList = foodList => {

    foodList = foodList.filter(food => food.details);

    const items = foodList.map(food => {
        return {
            details: JSON.parse(food.details),
            portion: JSON.parse(food.portion),
            qty: food.qty
        }
    });

    const computedItems = items.map(item => {
        return {
            foodName: `${item.qty} ${addElipses(item.details.description, 30)} \n ${item.portion.description}`,

            ...Object.fromEntries(computedNutrientValues(item)),
            qty: item.qty
        };
    });


    const totals = computedItems.reduce((acc, foodItem) => {
        Object.entries(foodItem).map(([k, v]) => {
            if (/^\d+\.+\d+$/.test(v)) {
                acc[k] = acc[k] || 0;
                acc[k] += (v) * foodItem.qty;
            }
            else {

                acc[k] = '';
            }
        });
        return acc;


    }, {});

    const formattedTotals = Object.entries(totals).map(([k, v]) => {

        if (k === 'Energy') {
            return [k, parseInt(v)];
        }
        else if (/^\d+\.+\d+$/.test(v)) {
            const amt = Number(v).toFixed(2);
            return [k, amt]

        }
        else if (k === 'foodName') {
            return ['totalsRow', true];
        }
        return [k, v];

    })
    computedItems.push(Object.fromEntries(formattedTotals));
    return computedItems;

}