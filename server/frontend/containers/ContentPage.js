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

    //Adds display name for debugging purposes
    this.displayName = "ContentPage";
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
        {this.props.pageState.currentPage === 1 ? 
          <div className="content" > 
            <Landing /> 
          </div> : null}

        {this.props.pageState.currentPage === 2 ? 
          <div className="content" > 
            <UserProfile 
                apiData={this.props.apiState.apiData} 
                fetchApiData={this.fetchApiData.bind(this)} 
            /> 
          </div>: null}
        
        {this.props.pageState.currentPage === 3 ? 
          <div className="content" > 
            <AddOffer 
                apiData={this.props.apiState.apiData} 
                companies={this.props.apiState.companies} 
                postApiData={this.postApiData.bind(this)}
            /> 
          </div>: null}
        
        {this.props.pageState.currentPage === 4 ? 
          <div className="content" > 
            <SearchCompany 
                apiData={this.props.apiState.apiData} 
                companies={this.props.apiState.companies} 
                fetchApiData={this.fetchApiData.bind(this)}
            /> 
            </div>: null}
        
        {this.props.pageState.currentPage === 5 ? 
          <div className="content" > 
            <Login 
                postApiData={this.postApiData.bind(this)}
            /> 
            </div>: null}
        
        {this.props.pageState.currentPage === 6 ? 
          <div className="content" > 
            <Signup postApiData={this.postApiData.bind(this)}/> 
          </div>: null}
      </div>
    );
  }
}

ContentPage.propTypes = {
  apiData: PropTypes.object.isRequired,
  apiState: PropTypes.object.isRequired,
  fetchApiData: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired,
  postApiData: PropTypes.func.isRequired
};

