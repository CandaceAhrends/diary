import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";


import "./datalist.scss";

const milligrams = ['cholesterol', 'sodium', 'potassium', , 'vitamin_c', 'calcium', 'iron'];
const micrograms = ['vitamin_d', 'vitamin_a'];
const empty = ['calories'];

export default function Details({ data, show, changeServingSize }) {

    const [selectedServing, setSelectedServing] = useState({});
    useEffect(() => {
        const servings = data?Object.keys(data):[];
        if (servings.length) {
            setSelectedServing({ ...data[servings[0]] });
        }
    }, data);

    const handleChange = evt => {

        const details = { ...data[evt.target.value] };
        setSelectedServing(details);
        changeServingSize(details);
    }
    return (
        show ? Object.keys(data).length ? <div className={show ? 'show calorie-details' : 'hide calorie-details'}>

            <select onChange={handleChange} >
                {Object.keys(data).map(key => <option key={key} value={key}>{key} </option>)}
            </select>
            {Object.entries(selectedServing).map(([k, v]) => <div key={k} className="detail"><span>{k.replace('_',' ')}</span>
                <span> {v} 
                {milligrams.includes(k) ? ' mg' : micrograms.includes(k) ? ' mcg' : empty.includes(k) ? ' ' :' g'}</span></div>)}

        </div> : <div className={show ? 'loading-details-spinner' : 'hide'}> <PropagateLoader

            size={30}
            color={"orange"}
            loading={true}
        /></div> : null
    );
}

