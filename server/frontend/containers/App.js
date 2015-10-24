import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showPage, fetchApiData, postApiData } from '../actions';
import NavBar from './NavBar';
import ContentPage from './ContentPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchApiData('/data/company?fields[]=name&fields[]=id'));
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render() {
    //This gets injected by the connect() call
    const { dispatch, page, api } = this.props;
    return (
      <div id='app-view'>
        { api.companies &&
          <div>
            <NavBar onTabClick={tabName => dispatch(showPage(tabName))} />
            <ContentPage 
              fetchApiData={apiPath => dispatch(fetchApiData(apiPath))} 
              apiState={api} 
              postApiData={(apiPath, json) => dispatch(postApiData(apiPath, json))} 
              pageState={page} />
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function selectStateProperties(state) {

  return state;
}

/*
Any component wrapped with connect() call will receive a dispatch function as a 
prop, and any state it needs from the global state. The only argument to connect() 
is a function we call a selector. This function takes the global Redux store’s 
state, and returns the props you need for the component. In the simplest case, you 
can just return the state given to you, but you may also wish to transform it first.
*/
export default connect(selectStateProperties)(App);
