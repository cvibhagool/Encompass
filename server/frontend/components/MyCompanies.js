// this file is a subview of a user's companies that they follow
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component } from 'react';
import _                               from 'lodash';

export default class MyCompanies extends Component {

  render () {
    return (<div>
              <h1>MyCompanies Success!</h1>
              <div>
                <ul>
                  {_.map(this.props.apiData.companies, function(company) {
                      return _.map(company, function(companyDetails, ind) {
                        if (ind !== 'UserFollows') {
                            return <li key={ind}>{ind}: {companyDetails}</li>
                        }
                      })
                    })
                  }
                </ul>
              </div>
            </div>)
  }
}
