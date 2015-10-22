import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showPage } from '../actions';
import NavBar from './NavBar';
import ContentPage from './ContentPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    // const { dispatch, selectedReddit } = this.props;
    // dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedReddit !== this.props.selectedReddit) {
    //   const { dispatch, selectedReddit } = nextProps;
      // dispatch(fetchPostsIfNeeded(selectedReddit));
    // }
  }

  handleChange(nextReddit) {
    // this.props.dispatch(selectReddit(nextReddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    // const { dispatch, selectedReddit } = this.props;
    // dispatch(invalidateReddit(selectedReddit));
    // dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  render() {
    //This gets injected by the connect() call
    const { dispatch, pageReducer} = this.props;
    return (
      <div id='app-view'>
        <NavBar onTabClick={tabName => dispatch(showPage(tabName))} />
        <ContentPage pageState={pageReducer}/>
      </div>
    );
  }
}

App.propTypes = {
  
};

function selectStateProperties(state) {

  // const { selectedReddit, postsByReddit } = state;
  // const {
  //   isFetching,
  //   lastUpdated,
  //   items: posts
  // } = postsByReddit[selectedReddit] || {
  //   isFetching: true,
  //   items: []
  // };

  // return {
  //   visibleTodos: selectTodos(state.todos, state.visibilityFilter),
  //   visibilityFilter: state.visibilityFilter
  // };

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
