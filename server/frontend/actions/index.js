import fetch  from 'isomorphic-fetch';
import $      from 'jquery';

export const SHOW_PAGE = 'SHOW_PAGE';
export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA = 'RECEIVE_API_DATA';
export const SEND_API_DATA = 'SEND_API_DATA';
export const SEND_API_DATA_SUCCESS = 'SEND_API_DATA_SUCCESS';
export const SEND_API_DATA_FAILURE = 'SEND_API_DATA_FAILURE';

export function showPage(text) {
  return {
    type: SHOW_PAGE,
    text
  };
}

function requestApiData(apiPath) {
  return {
    type: REQUEST_API_DATA,
    apiPath
  };
}

function receiveApiData(apiPath, json) {
  return {
    type: RECEIVE_API_DATA,
    apiPath: apiPath,
    apiData: json,
    receivedAt: Date.now()
  };
}

export function fetchApiData(apiPath) {
  return dispatch => {
    dispatch(requestApiData(apiPath));
    return fetch(`http://127.0.0.1:3000${apiPath}`)
      .then(response => response.json())
      .then(json =>
        // console.log('About to dispatch receiveApiData') 
        // console.log(json)
          dispatch(receiveApiData(apiPath, json))
      );
  }
}

function sendApiData(apiPath, json) {
  return {
    type: SEND_API_DATA,
    apiPath: apiPath,
    apiData: json, 
  };
}

function sendApiDataSuccess(apiPath, json) {
  return {
    type: SEND_API_DATA_SUCCESS,
    apiPath: apiPath,
    apiData: json,
    transmitedAt: Date.now()
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
  console.log(apiPath)
  return dispatch => {
    dispatch(sendApiData(apiPath, json));
    $.ajax({
      url: 'http://localhost:3000' + apiPath,
      dataType: 'json',
      type: 'POST',
      data: json,
      success: function(data) {
        console.log('post success: ')
        dispatch(sendApiDataSuccess(apiPath, json));
      },
      error: function(xhr, status, err) {
        console.log('post failure: ')
        console.log(err)
        dispatch(sendApiDataFailure(apiPath, json));
      }
    });
  }
}
// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit];
//   if (!posts) {
//     return true;
//   }
//   if (posts.isFetching) {
//     return false;
//   }
//   return posts.didInvalidate;
// }

// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit));
//     }
//   };
// }
