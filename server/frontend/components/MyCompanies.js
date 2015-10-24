// this file is a subview of a user's companies that they follow
// its parent is UserProfile.js

import React, { PropTypes, Component } from 'react';
import _                               from 'lodash';

export default class MyCompanies extends Component {

  render () {
    return (<div>
              <h1>FollowedCompanies Success!</h1>

              <div>
                <ul>
                  {this.props.apiData.companies && 
                    _.map(this.props.apiData.companies, function(val, ind) {
                      return <li key={ind}>{ind}: {val}</li>; 
                    })
                  }
                </ul>
              </div>
            </div>);
  }
}
