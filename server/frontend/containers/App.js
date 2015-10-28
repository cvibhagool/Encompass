import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { showPage, fetchApiData, postApiData, } from '../actions';
import NavBar from './NavBar';
import ContentPage from './ContentPage'

class App extends Component {

  constructor(props) {

    super(props);

    //Adds display name for debugging purposes
    this.displayName = 'App';
    
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchApiData('/data/company?fields[]=name&fields[]=id'));
  }

  handleChange(pathToRoute) {
    this.props.pushState(null, `/${pathToRoute}`);
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render() {
    //This gets injected by the connect() call
    const { dispatch, page, api } = this.props;
    return (
      <div id='app-view'>
        {api.companies &&
          <div>
            <NavBar onTabClick={this.handleChange} />
            <div className = "container">
              <ContentPage 
                  apiState={api} 
                  fetchApiData={apiPath => dispatch(fetchApiData(apiPath))} 
                  pageState={page} 
                  postApiData={(apiPath, json) => dispatch(postApiData(apiPath, json))} 
                  removeApiData={(apiPath, id) => dispatch(removeApiData(apiPath, id))} 
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  api: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  pushState: PropTypes.func.isRequired
};

function selectStateProperties(state) {

  return state;
}

/*
state.router.location.pathname.substring(1) to pull path out of the router

Any component wrapped with connect() call will receive a dispatch function as a 
prop, and any state it needs from the global state. The only argument to connect() 
is a function we call a selector. This function takes the global Redux store’s 
state, and returns the props you need for the component. In the simplest case, you 
can just return the state given to you, but you may also wish to transform it first.
*/
export default connect(selectStateProperties, {
  pushState
})(App);
