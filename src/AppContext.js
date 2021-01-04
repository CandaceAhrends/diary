import React from 'react';
import TokenStore from "./api/TokenStore";
import { getSessionData } from './utils';
export const StoreContext = React.createContext({});

const sessionData = getSessionData();


export const initialState = {
    isAuthenticated: sessionData && sessionData.isAuthenticated ? true : false,
    errorMessage: null,
    user: sessionData ? sessionData.userName : null,
    searchQuery: '',
    searchResults: [],
    diaryResults: [],
    reloadDiary: false


};
export const Auth = TokenStore.getInstance();