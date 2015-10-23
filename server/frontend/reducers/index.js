import { combineReducers } from 'redux';
import {
  SHOW_PAGE,
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  SEND_API_DATA,
  SEND_API_DATA_SUCCESS,
  SEND_API_DATA_FAILURE

} from '../actions';

function page(state = {}, action) {
	switch (action.type) {
		case SHOW_PAGE:
			return Object.assign({}, state, {
				currentPage: action.text.id
			});

		default: 
			return state;
	}
}

function api(state = {
	isFetching: false,
	apiData: {}
}, action) {
	switch (action.type) {
		case REQUEST_API_DATA:
			return Object.assign({}, state, {
				isFetching: true
			});

		case RECEIVE_API_DATA:
			return Object.assign({}, state, {
				isFetching: false,
				apiData: action.apiData
			});

		case SEND_API_DATA:
	  	return Object.assign({}, state, {
	  		isSending: true
	  	});

	  case SEND_API_DATA_SUCCESS:
	  	return Object.assign({}, state, {
	  		isSending: false,
	  		apiData: action.apiData
	  	});

	  case SEND_API_DATA_FAILURE:
	  	return Object.assign({}, state, {
	  		isSending: false,
	  		apiData: null
	  	});

		default:
			return state;
	}
}

const rootReducer = combineReducers({
  page,
  api
});

export default rootReducer;
