import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchApiData } from '../actions';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);

    //Adds display name for debugging purposes
    this.displayName = 'App';
    
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchApiData('/data/company?fields[]=name&fields[]=id');
    this.props.fetchApiData('/api/user/profile/me');
  }

  handleChange(pathToRoute) {
    this.props.pushState(null, pathToRoute);
  }

  render() {
    //This gets injected by the connect() call
    const { api, children } = this.props;
    return (
      <div id='app-view'>
        {api.companies &&
          <div>
            <NavBar onTabClick={this.handleChange} />
          </div>
        }
        { children }
      </div>
    );
  }
}

App.propTypes = {
  api: PropTypes.object.isRequired
};

function mapStateToProperties(state) {

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
export default connect(mapStateToProperties, {
  fetchApiData, 
  pushState
})(App);
