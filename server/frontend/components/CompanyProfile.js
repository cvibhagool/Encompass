import React, { ProtoTypes, Component } from 'react';
import $                                from 'jquery';
import _                                from 'lodash';

export default class CompanyProfile extends Component {

  constructor () {
    super();
    this.state = { data: {} };
  }

  componentDidMount () {
    $.ajax({
      url: '/api/company/1',
      // url: '/api/company/' + this.props.companyId,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data})
        //   [
        //   data.id,
        //   data.name,
        //   data.website,
        //   data.growth_score,
        //   data.mindshare_score,
        //   data.custom_score,
        //   data.weekly_momentum,
        //   data.employees,
        //   data.employees_mom,
        //   data.monthly_unique,
        //   data.monthly_unique_mom,
        //   data.founding_date,
        //   data.stage,
        //   data.total_funding,
        //   data.last_funding_date,
        //   data.city,
        //   data.state,
        //   data.country,
        //   data.createdAt,
        //   data.updatedAt
        // ]
      // })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('Error:');
        console.log(err);
      }
    });
  }

  render() {
    console.log(this.state.data)
    return (
      <ul>
        { _.map(this.state.data, function(val, ind) {
            return (<li key={ind}>{ind}: {val}</li>);
          })
        }
      </ul>
    )
  }
};

