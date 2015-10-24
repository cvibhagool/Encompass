// this view is the user's profile page /#/profile

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';

// import subviews
import MyCompanies                      from './MyCompanies.js';
import MyOffers                         from './MyOffers.js';

// define all constant variables
const userPath = '/api/company/1';
const myOffersPath = '/api/offers';
const myCompaniesPath = '/api/companies';

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

  test () {
    console.log()
  }


  render() {

    return (<div>
              <h1>H1 Testing</h1>

              <MyCompanies apiData={this.props.apiData} fetchApiData={this.props.fetchApiData.bind(this)} />
              <MyOffers apiData={this.props.apiData} />

            	<ul>
            		{this.props.apiData && _.map(this.props.apiData, function(val, ind) {
                    return <li key={ind}>{ind}: {val}</li>; 
                  })
                }
            	</ul>
            </div>);
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


