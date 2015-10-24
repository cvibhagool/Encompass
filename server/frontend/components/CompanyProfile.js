import React, { ProtoTypes, Component } from 'react';
import _                                from 'lodash';

const companyPath = '/api/company/1';

export default class CompanyProfile extends Component {

  constructor () {
    super();
    this.state = { data: {} };
  }

  componentDidMount () {
    this.props.fetchApiData(companyPath);
  }

  render() {
    const { apiData } = this.props;

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

