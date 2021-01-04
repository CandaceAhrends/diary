import { saveSessionData } from "./utils";


const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Action: ", action, state);
      saveSessionData({ ...action.payload, isAuthenticated: true });
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.userName

      };
    case "LOGOUT": return {
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
    case "DIARY_RESULTS":

      //const results = [...state.diaryResults, ...action.payload.diaryResults];

      return {
        ...state,
        diaryResults: action.payload.diaryResults
      };
    case "ERROR_MESSAE": return {
      ...state,
      errorMessage: action.payload.errorMessage
    };
    case "RELOAD_DIARY": return {
      ...state,
      reloadDiary: action.payload.reloadDiary
    }

    default:
      return state;
  }
};

export default Reducer;