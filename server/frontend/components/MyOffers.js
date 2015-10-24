// this file is a subview of a user's offers that they received & inputted
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';

export default class MyOffers extends Component {

  funName () {
    console.log(this.props.apiData.offers)
  }

  render () {
    this.funName()

    return (<div>
              <h1>MyOffers Success!</h1>
              <div>
                <ul>
                  {this.props.apiData.offers && 
                    _.map(this.props.apiData.offers, function(offer) {
                      return _.map(offer, function(offerDetails, ind) {
                        return <li key={ind}>{ind}: {offerDetails}</li>
                      })
                    })
                  }
                </ul>
              </div>
            </div>);
  }
}
