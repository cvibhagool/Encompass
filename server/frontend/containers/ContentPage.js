import React, { PropTypes, Component } from 'react';
import Landing from '../components/Landing';
import UserProfile from '../components/UserProfile';
import AddOffer from '../components/AddOffer';
import SearchCompany from '../components/SearchCompany';
import Login from '../components/Login';
import Signup from '../components/Signup';

// to be deleted
import CompanyProfile from '../components/CompanyProfile.js';

export default class ContentPage extends Component {
  getApiData(apiPath) {
    this.props.fetchApiData(apiPath);
  }

  postApiData(apiPath, json) {
    this.props.postApiData(apiPath, json);
  }

  render() {
    return (
      <div id='content-view'>
        <div className="content" > {this.props.pageState.currentPage === 1 ? <Landing /> : null }</div>

        <div className="content" > {this.props.pageState.currentPage === 2 ? <UserProfile apiData={this.props.apiState.apiData} getApiData={this.getApiData.bind(this)}/> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 3 ? <AddOffer apiData={this.props.apiState.apiData} postApiData={this.postApiData.bind(this)} /> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 4 ? <SearchCompany /> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 5 ? <Login postApiData={this.postApiData.bind(this)}/> : null }</div>
        
        <div className="content" > {this.props.pageState.currentPage === 6 ? <Signup postApiData={this.postApiData.bind(this)}/> : null }</div>

        <div className="content" > {this.props.pageState.currentPage === 7 ? <CompanyProfile /> : null }</div>
      </div>
    );
  }
}
