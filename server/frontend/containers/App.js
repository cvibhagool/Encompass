import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { pushState }                    from 'redux-router';
import { fetchApiData }                 from '../actions';
import NavBar                           from './NavBar';

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const MyRawTheme = require('./CustomTheme');

class App extends Component {
  constructor(props) {
    super(props);
    //Adds display name for debugging purposes
    this.displayName = 'App';
    
    this.handleChange = this.handleChange.bind(this);

  }
  
  //the key passed through context must be called "muiTheme"
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
    };
  }

  componentDidMount() {
    // this.props.fetchApiData('/data/company?fields[]=name&fields[]=id');
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
        {
          <div>
            <NavBar onTabClick={this.handleChange} />
          </div>
        }
        {children}
        <footer>
          Made with <span id="heart"> ❤ </span> by <a href="https://github.com/cvibhagool" target="_blank">Chirat</a>, <a href="https://github.com/aaronnorby" target="_blank">Aaron</a>, <a href="https://github.com/csling" target="_blank">Christian</a>, <a href="https://github.com/benjaminhoffman" target="_blank">Benjamin</a>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  api: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  fetchApiData: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired
};

App.childContextTypes = { muiTheme: React.PropTypes.object,};

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
