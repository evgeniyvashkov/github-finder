import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USER,
    GET_REPOS,
    SET_LOADING,
    SET_ALERT,
    REMOVE_ALERT
  } from "../types";

  export default (state, action) => {
    switch(action.type) {
        case SEARCH_USERS: 
            return {
                ...state,
                users: action.payload,
                loading: false
            }
            case CLEAR_USER: 
            return {
                ...state,
                user: [],
                loading: false
            }
        case SET_LOADING: 
            return {
                ...state, 
                loading: true
            }
        default: return state;
    }
  }