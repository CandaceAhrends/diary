import React, { useEffect, useState } from 'react';
import './nutritionFacts.scss';

export const NutritionFacts = ({ nutrients }) => {
    const [facts, setFacts] = useState(null);

    useEffect(() => {

        const facts = nutrients.reduce((emphasizedNutrients, nutrient) => {
            if (nutrient.unitName === 'kcal') {
                emphasizedNutrients.calories = nutrient.amount;
            }
            else if (nutrient.name.includes('total') && nutrient.name.includes('fat')) {
                emphasizedNutrients.totalFat = nutrient.amount;
            }
            else if (nutrient.name.includes('Fatty acids')) {
                emphasizedNutrients.fats.push(nutrient);
            }
            else {
                emphasizedNutrients.facts.push(nutrient);
            }

            return emphasizedNutrients;
        }, { fats: [], facts: [], calories: 0, totalFat: 0 });
        setFacts(facts);

    }, []);

    return (<>{facts ? <div className="nutrition-facts">
        <section className="nutrition-facts-calories">
            <span>Calories</span> <span>{facts.calories}</span>

        </section>
        <section className="nutrition-facts-fat">
            <ul>
                <li>  <span>Total fat</span> <span>{facts.totalFat}</span>
                </li>
                {facts.fats.map(fat => <li>
                    <span>{fat.name.replace('Fatty acids,', '')}</span><span>{fat.amount}</span></li>)}

            </ul>
        </section>

        <section className="nutrition-facts-content">
            <ul>
                   {facts.facts.map(fat => <li>
                    <span>{fat.name}</span><span>{fat.amount}</span></li>)}

            </ul>


        </section>


    </div> : null}</>

    );


};