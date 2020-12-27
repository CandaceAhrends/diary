import React from 'react';
import TokenStore from "./api/TokenStore";
export const StoreContext = React.createContext({});

export const initialState = {
    isAuthenticated: false,
    user: null,
    searchQuery: '',
    searchResults: []

};
export const Auth = TokenStore.getInstance();