import $      from 'jquery';

export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA = 'RECEIVE_API_DATA';
export const RECEIVE_API_DATA_SUCCESS = 'RECEIVE_API_DATA_SUCCESS';
export const RECEIVE_API_DATA_FAILURE = 'RECEIVE_API_DATA_FAILURE';
export const SEND_API_DATA = 'SEND_API_DATA';
export const SEND_API_DATA_SUCCESS = 'SEND_API_DATA_SUCCESS';
export const SEND_API_DATA_FAILURE = 'SEND_API_DATA_FAILURE';
export const DELETE_API_DATA = 'DELETE_API_DATA';
export const DELETE_API_DATA_SUCCESS = 'DELETE_API_DATA_SUCCESS';
export const DELETE_API_DATA_FAILURE = 'DELETE_API_DATA_FAILURE';

function requestApiData(apiPath) {
  return {
    type: REQUEST_API_DATA,
    apiPath
  };
}

function receiveApiDataSuccess(apiPath, json) {
  return {
    type: RECEIVE_API_DATA_SUCCESS,
    apiPath: apiPath,
    apiData: json,
    receivedAt: Date.now()
  };
}

function receiveApiDataFailure(apiPath) {
  return {
    type: RECEIVE_API_DATA_FAILURE,
    apiPath: apiPath,
    failedAt: Date.now()
  };
}

export function fetchApiData(apiPath) {
  return dispatch => {
    dispatch(requestApiData(apiPath));
    $.ajax({
      url: 'http://localhost:3000' + apiPath,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log('GET success:');
        dispatch(receiveApiDataSuccess(apiPath, data));
      },
      error: function(xhr, status, err) {
        console.log('GET failure:');
        console.log(err);
        dispatch(receiveApiDataFailure(apiPath));
      }
    });   
  }
}

function sendApiData(apiPath, json) {
  return {
    type: SEND_API_DATA,
    apiPath: apiPath,
    apiData: json, 
  }
}

function sendApiDataSuccess(apiPath, json) {
  return {
    type: SEND_API_DATA_SUCCESS,
    apiPath: apiPath,
    apiData: json,
    postedAt: Date.now()
  }
}

function sendApiDataFailure(apiPath, json) {
  return {
    type: SEND_API_DATA_FAILURE,
    apiPath: apiPath,
    apiData: json,
    failedAt: Date.now()
  }
}

export function postApiData(apiPath, json) {
  return dispatch => {
    dispatch(sendApiData(apiPath, json));
    $.ajax({
      url: 'http://localhost:3000' + apiPath,
      dataType: 'json',
      type: 'POST',
      data: json,
      success: function(data) {
        console.log('POST success:')
        dispatch(sendApiDataSuccess(apiPath, data));
      },
      error: function(xhr, status, err) {
        console.log('POST failure:')
        console.log(err)
        dispatch(sendApiDataFailure(apiPath, data));
      }
    });
  }
}

function deleteApiData(apiPath, id) {
  return {
    type: DELETE_API_DATA,
    apiPath: apiPath,
  };
}

function deleteApiDataSuccess(apiPath, id) {
  return {
    type: DELETE_API_DATA_SUCCESS,
    apiPath: apiPath,
    deletedAt: Date.now()
  };
}

function deleteApiDataFailure(apiPath, id) {
  return {
    type: DELETE_API_DATA_FAILURE,
    apiPath: apiPath,
    failedAt: Date.now()
  };
}

export function removeApiData(apiPath, id) {
  return dispatch => {
    dispatch(deleteApiData(apiPath, id));
    $.ajax({
      url: 'http://localhost:3000' + apiPath + '/' + id,
      type: 'DELETE',
      success: function(data) {
        console.log('Delete success!!');
        dispatch(deleteApiDataSuccess(apiPath, id));
      },
      error: function(xhr, status, err) {
        console.log('Delete Failure!!');
        console.log(err);
        dispatch(deleteApiDataFailure(apiPath, id));
      }
    });
  }
}
