import { combineReducers } from 'redux';
import {
  SHOW_PAGE
} from '../actions';

function pageReducer(state = {}, action) {
	switch (action.type) {
		case SHOW_PAGE:
			return Object.assign({}, state, {
				currentPage: action.text.id
			});

		default: 
			return state;
	}
}

const rootReducer = combineReducers({
  pageReducer
});

export default rootReducer;
