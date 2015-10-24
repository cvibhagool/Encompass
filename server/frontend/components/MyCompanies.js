import React, { PropTypes, Component } from 'react';
import _                               from 'lodash';

export default class MyCompanies extends Component {

  render () {
    return (<div>
              <h1>FollowedCompanies Success!</h1>

              <div>
                <ul>
                  {this.props.apiData && _.map(this.props.apiData, function(val, ind) {
                      return <li key={ind}>{ind}: {val}</li>; 
                    })
                  }
                </ul>
            </div>
          </div>)
  }
}
