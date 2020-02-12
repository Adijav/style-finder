import {SHOW_ICON} from '../constants/action-types';
import {HIDE_ICON} from '../constants/action-types';
import { SELECT_COUNTRY } from '../constants/action-types';

const initialState = {
    showBackToTopIcon: false,
    selectedCountry: ''
  };
  
function rootReducer(state = initialState, action) {
    switch(action.type) {
        case SHOW_ICON:
            return {
                ...state,
                showBackToTopIcon: true
            };
        case HIDE_ICON:
            return {
                ...state,
                showBackToTopIcon: false
            }
        case SELECT_COUNTRY:
            return {
                ...state,
                selectedCountry: action.payload
            }
        default:
            return state;

    }
};
  
  export default rootReducer;