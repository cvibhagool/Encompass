// this file controls the logic for our navbar tabs; its parent is App.js

// import our dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';

// import children
import Landing                          from '../components/Landing';
import UserProfile                      from '../components/UserProfile';
import AddOffer                         from '../components/AddOffer';
import SearchCompany                    from '../components/SearchCompany';
import Login                            from '../components/Login';
import Signup                           from '../components/Signup';

// instantiate our ContentPage Class
export default class ContentPage extends Component {
  constructor () {
    super();
    this.state = {};
  } 


  // GET request at given path
  fetchApiData(apiPath) {
    this.props.fetchApiData(apiPath);
  }

  // POST request at given path + json object to send to server
  postApiData(apiPath, json) {
    this.props.postApiData(apiPath, json);
  }

  render() {
    return (
      <div id='content-view'>

        { /* controls the logic of our navbar tabs; each component gets passed the necessary internal api data */ }
        <div className="content" > {this.props.pageState.currentPage === 1 ? <Landing /> : null }</div>

        <div className="content" > {this.props.pageState.currentPage === 2 ? <UserProfile apiData={this.props.apiState.apiData} fetchApiData={this.fetchApiData.bind(this)} /> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 3 ? <AddOffer companies={this.props.apiState.companies} apiData={this.props.apiState.apiData} postApiData={this.postApiData.bind(this)} /> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 4 ? <SearchCompany companies={this.props.apiState.companies} apiData={this.props.apiState.apiData} fetchApiData={this.fetchApiData.bind(this)}/> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 5 ? <Login postApiData={this.postApiData.bind(this)}/> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 6 ? <Signup postApiData={this.postApiData.bind(this)}/> : null }</div>
      </div>
    );
  }
}
