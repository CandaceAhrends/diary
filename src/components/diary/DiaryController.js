import React, { useState, useContext, useEffect } from 'react';
import DiaryGrid from './DiaryGrid';
import { StoreContext } from "../../AppContext";
import { RELOAD_DIARY_ACTION } from '../../actions';

const DiaryController = () => {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {

        dispatch({
            ...RELOAD_DIARY_ACTION, payload: {
                reloadDiary: true
            }
        });
    }, []);

    return (<>{state.diaryResults.length ? <DiaryGrid nutrientTotals={state.diaryResults}></DiaryGrid> :
        <p className="diary-loading">No food added just yet</p>}</>);
}

export default DiaryController;
