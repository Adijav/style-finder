import {SHOW_ICON} from '../constants/action-types';
import {HIDE_ICON} from '../constants/action-types';

const initialState = {
    showBackToTopIcon: false,
    styleMapper: {}
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
        default:
            return state;

    }
};
  
  export default rootReducer;