

  const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
          console.log("Action: ", action, state);
          return {
          ...state,
          isAuthenticated: true,
          user: action.payload.userName
          
        };
      case "LOGOUT":   return {
          ...state,
          isAuthenticated: false,
          user: null
        };
        case "SEARCH": return {
          ...state,
          searchQuery: action.payload.searchQuery
        };
        case "SEARCH_RESULTS": return {
          ...state,
          searchResults: action.payload.searchResults
        };
      default:
        return state;
    }
  };

  export default Reducer;