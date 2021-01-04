import React, { useState, useContext } from 'react';
import DiaryGrid from './DiaryGrid';
import { StoreContext } from "../../AppContext";

const DiaryController = () => {
    const [state,] = useContext(StoreContext);
    return (<>{state.diaryResults.length ? <DiaryGrid nutrientTotals={state.diaryResults}></DiaryGrid> :
        <p className="diary-loading">No food added just yet</p>}</>);
}

export default DiaryController;
 