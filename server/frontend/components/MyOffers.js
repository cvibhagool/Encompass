// this file is a subview of a user's offers that they received & inputted
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';

export default class MyOffers extends Component {

  render () {

    return (<div>
              <h1>MyOffers Success!</h1>
              <div>
                <ul>
                  {_.map(this.props.apiData.offers, function(offer) {
                      return _.map(offer, function(offerDetails, ind) {
                        if (ind === 'Company') {
                            return <li key='CompanyName'>Company Name: {offerDetails.name}</li>
                        } else {
                            return <li key={ind}>{ind}: {offerDetails}</li>
                        }
                      })
                    })
                  }
                </ul>
              </div>
            </div>);
  }
}
