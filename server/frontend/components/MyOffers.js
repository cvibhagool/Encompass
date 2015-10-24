// this file is a subview of a user's offers that they received & inputted
// its parent is UserProfile.js

import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';

export default class MyOffers extends Component {

  render () {
    return (<div>
              <h1>MyOffers Success!</h1>

              <div>
                <ul>
                  {this.props.apiData.offers && 
                    _.map(this.props.apiData.offers, function(val, ind) {
                      return <li key={ind}>{ind}: {val}</li>;
                    })
                  }
                </ul>
              </div>
            </div>);
  }
}
