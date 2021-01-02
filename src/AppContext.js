import React from 'react';
import TokenStore from "./api/TokenStore";
export const StoreContext = React.createContext({});

export const initialState = {
    isAuthenticated: false,
    errorMessage: null,
    user: null,
    searchQuery: '',
    searchResults: [],
    diaryResults: [],
    reloadDiary: false


};
export const Auth = TokenStore.getInstance();