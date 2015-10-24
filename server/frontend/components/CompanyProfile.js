import React, { ProtoTypes, Component } from 'react';
import _                                from 'lodash';

export default class CompanyProfile extends Component {

  constructor () {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchApiData('/api/company/' + this.props.companyId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.companyId !== nextProps.companyId)
      this.props.fetchApiData('/api/company/' + nextProps.companyId);
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

