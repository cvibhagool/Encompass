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
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('Error:');
        console.log(err);
      }
    });
  }

  render() {
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

