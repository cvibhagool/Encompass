// this file is the user's profile page /#/profile
// its parent is ContentPage.js

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';
import cookie                           from 'react-cookie';

// import subviews/children
import MyCompanies                      from './MyCompanies.js';
import MyOffers                         from './MyOffers.js';

// define all constant variables
const userPath = '/api/user/profile/me';

// create UserProfile view
export default class UserProfile extends Component {

  constructor () {
    super();
    this.state = {};
  }

  // GET request for when page loads for our user data & subview components
  componentDidMount() {
    this.props.fetchApiData(userPath);
  }

  checkCookie() {
    let usercookie = cookie.load('connect.sid');
    return usercookie;
  }

  render() {
    return (
          <div>

          { /* check if user is logged in */ }
          {this.checkCookie() ?
            
            <div>

              <h1>{'Welcome'} {this.props.apiData.user && this.props.apiData.user.username}{'!'}
              </h1>

              <p>{'Below we have saved your offers and the companies you follow. Click on any offer or company to drill down for more information.  Go on now, dont be shy!'}</p>
            
              { /* instantiate the MyOffers child and pass it props (the offers) that this logged-in user has entered previously */ }
              <MyOffers 
                  apiData={this.props.apiData}
                  fetchApiData={this.props.fetchApiData.bind(this)} 
              />

              { /* instantiate the MyCompanies child and pass it props (the companies) that this logged-in user currently follows */ }
              <MyCompanies 
                  apiData={this.props.apiData} 
                  fetchApiData={this.props.fetchApiData.bind(this)} 
              />

            </div> :
            <h1>{'Please log in to use this feature'}</h1>}
          </div>
          );
  }
}

UserProfile.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  fetchApiData: PropTypes.func.isRequired
}
