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
const userPath = '/api/user/profile/7';

// {this.props.apiData.user.username.bind(this)}


// create UserProfile view
export default class UserProfile extends Component {

  constructor () {
    super();
    this.state = { data: {} };
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
          {this.checkCookie() ?
            <div>

              <h1>Welcome !</h1>

              { /* iterate over the user's profile info and display it on the page */ }
            	<ul>
            		{_.map(this.props.apiData.user, function(val, ind) {
                    return <li key={ind}>{ind}: {val}</li>; 
                  })
                }
            	</ul>
            
              { /* instantiate/invoke/import the MyOffers child and pass it props (the offers) that this logged-in user has entered previously */ }
              <MyOffers apiData={this.props.apiData} fetchApiData={this.props.fetchApiData.bind(this)} />

              { /* instantiate/invoke/import the MyCompanies child and pass it props (the companies) that this logged-in user currently follows */ }
               <MyCompanies apiData={this.props.apiData} fetchApiData={this.props.fetchApiData.bind(this)} />


            </div> :
            <h1>Please log in to use this feature</h1>}
            </div>
            );
  }
}


// header will be persons name
// sub window of all the companies they follow (component FollowedCompanies)
// sub window of all the offers they have recevied (component SavedOffers)


// create two new files -- sub components
// import into this file
// carve a space them here 
//   <FollowedCompanies />
//   <SavedOffers />
//   note: must send in any properties that they might need; give it to them here
//     a function
//     info, etc



//   FC 
//     hyperlinked list item
//     componentWillMount so you 
//   SavedOffers
//     summary + hyperlinked that will allow them to edit the offer


