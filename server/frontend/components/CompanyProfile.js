import React, { ProtoTypes, Component } from 'react';
import $                                from 'jquery';
import _                                from 'lodash';

export default class CompanyProfile extends Component {

  var companyPath = '/api/company/1';
  var userPath = '/api/company/1';

  constructor () {
    super();
    this.state = { data: {} };
  }

  componentDidMount () {
    this.props.fetchApiData(companyPath);
  }

  render() {
    return (
      <ul>
        { apiData && _.map(apiData, function(val, ind) {
            return (<li key={ind}>{ind}: {val}</li>);
          })
        }
      </ul>
    )
  }
};

