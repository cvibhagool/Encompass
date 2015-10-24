import React, { PropTypes, Component } from 'react';

const userPath = '/api/company/1';

export default class UserProfile extends Component {
  componentWillMount() {
    this.props.fetchApiData(userPath);
  }

  render() {
  	const { apiData, isFetching } = this.props;
    return (
    	<div>
    		{isFetching &&
    		  	<h2>Loading...</h2>
    		}
    		{apiData && _.map(apiData, function(val, ind) {
            return <div key={ind}>{ind}: {val}</div>; 
          })
        }
    	</div>
    );
  }
}

// header will be persons name
// sub window of all the companies they follow (component FollowedCompanies)
// sub window of all the offers they have recevied (component SavedOffers)


create two new files -- sub components
import into this file
carve a space them here 
  <FollowedCompanies />
  <SavedOffers />
  note: must send in any properties that they might need; give it to them here
    a function
    info, etc



  FC 
    hyperlinked list item
    componentWillMount so you 
  SavedOffers
    summary + hyperlinked that will allow them to edit the offer


