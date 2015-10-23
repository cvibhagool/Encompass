import React, { PropTypes, Component } from 'react';
import Landing from '../components/Landing';
import UserProfile from '../components/UserProfile';
import AddOffer from '../components/AddOffer';
import SearchCompany from '../components/SearchCompany';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default class ContentPage extends Component {
  getApiData(apiPath) {
    this.props.fetchApiData(apiPath);
  }

  render() {
    return (
      <div id='content-view'>
        <div className="content" > {this.props.pageState.currentPage === 1 ? <Landing /> : null }</div>
        <div className="content" > {this.props.pageState.currentPage === 2 ? <UserProfile apiData={this.props.apiState.apiData} getApiData={this.getApiData.bind(this)}/> : null }</div>
        <div className="content" > {this.props.pageState.currentPage === 3 ? <AddOffer type='info' message='' /> : null }</div>
        <div className="content" > {this.props.pageState.currentPage === 4 ? <SearchCompany /> : null }</div>
        <div className="content" > {this.props.pageState.currentPage === 5 ? <Login /> : null }</div>
        <div className="content" > {this.props.pageState.currentPage === 6 ? <Signup /> : null }</div>
      </div>
    );
  }
}
