import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA_SUCCESS,
  RECEIVE_API_DATA_FAILURE,
  SEND_API_DATA,
  SEND_API_DATA_SUCCESS,
  SEND_API_DATA_FAILURE,
  DELETE_API_DATA,
  DELETE_API_DATA_SUCCESS,
  DELETE_API_DATA_FAILURE
} from '../actions';

function api(state = {
	isFetching: false,
	apiData: {}
}, action) {
	switch (action.type) {
		case REQUEST_API_DATA:
			return Object.assign({}, state, {
				isFetching: true
			});

		case RECEIVE_API_DATA_SUCCESS:
			let newState = {
				isFetching: false,
				apiData: action.apiData
			};
			if(action.apiPath==="/data/company?fields[]=name&fields[]=id")
				newState.companies = action.apiData;
			else if(action.apiPath==="/api/user/profile/me")
				newState.profile = action.apiData;
			return Object.assign({}, state, newState);

		case RECEIVE_API_DATA_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				apiData: {}
			})

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
	  		apiData: {}
	  	});

	  case DELETE_API_DATA:
	  	return Object.assign({}, state, {
	  		isDeleting: true
	  	});

  	case DELETE_API_DATA_SUCCESS:
	  	return Object.assign({}, state, {
	  		isDeleting: false,
	  		apiData: null
	  	});

	  case DELETE_API_DATA_FAILURE:
	  	return Object.assign({}, state, {
	  		isDeleting: false,
	  		apiData: null
	  	});

		default:
			return state;
	}
}

const rootReducer = combineReducers({
  api,
  router
});

export default rootReducer;
