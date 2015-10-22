import React, { PropTypes, Component } from 'react';
import Landing from '../components/Landing';
import AddOffer from '../components/AddOffer';

export default class ContentPage extends Component {
  getInitialState() {
    return {
      type: 'info',
      message: ''
    }
  }

  // form submit callback
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  }

  sendFormData() {

    // prepare form data for submitting it
    var formData = {
      company_name: ReactDOM.findDOMNode(this.refs.budget).value,
      position: ReactDOM.findDOMNode(this.refs.position).value,
      salary: ReactDOM.findDOMNode(this.refs.salary).value,
      equity: ReactDOM.findDOMNode(this.refs.equity).value,
      vesting_start_date: ReactDOM.findDOMNode(this.refs.vesting_start_date).value,
      vesting_end_date: ReactDOM.findDOMNode(this.refs.vesting_end_date).value,
      vesting_cliff_date: ReactDOM.findDOMNode(this.refs.vesting_cliff_date).value,
      vesting_cliff_percent: ReactDOM.findDOMNode(this.refs.vesting_cliff_percent).value,
      other_benefits: ReactDOM.findDOMNode(this.refs.other_benefits).value,
      last_financing_round_valuation: ReactDOM.findDOMNode(this.refs.last_financing_round_valuation).value,
      estimated_eit_valuation: ReactDOM.findDOMNode(this.refs.estimated_eit_valuation).value
    };

    // extract the checkbox values
    formData.benefits = this.getSelected('benefits');

    // send the form data
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp === 200 && response.status === 'OK') {
          _this.setState({ type: 'success', message: 'Offer submitted...'});
        }
        else {
          _this.setState({ type: 'danger', message: 'Offer not submitted...'});
        }
      }
    };
    xmlhttp.open('POST', 'send', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(this.requestBuildQueryString(formData));
  }

  requestBuildQueryString(params) {
    var queryString = [];
    for (var property in params) {
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    }
    return queryString.join('&');
  },

  getSelected(fieldName) {
    var i;
    var fields = document.getElementByName(fieldName);
    var selectedFields = [];
    for (i = 0; i < fields.length; i++) {
      if (fields[i].checked === true) {
        selectedFields.push(fields[i].value);
      }
    }
    return selectedFields.join(', ');
  }

  render() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">{this.state.message}</div>
    }
    return (
      <div>
        <h1 id="heading">Add Your Offer</h1>
        {status}
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="company_name">Startup Name *</label>
            <input className="form-control" name="company_name" ref="company_name" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input className="form-control" name="position" ref="position" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary *</label>
            <input className="form-control" name="salary" ref="salary" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="equity">Equity *</label>
            <input className="form-control" name="equity" ref="equity" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_start_date">Vesting Start Date *</label>
            <input className="form-control" name="vesting_start_date" ref="vesting_start_date" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_end_date">Vesting End Date *</label>
            <input className="form-control" name="vesting_end_date" ref="vesting_end_date" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_date">Vesting Cliff Date *</label>
            <input className="form-control" name="vesting_cliff_date" ref="vesting_cliff_date" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_percent">Vesting Cliff Percent *</label>
            <input className="form-control" name="vesting_cliff_percent" ref="vesting_cliff_percent" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="last_financing_round_valuation">Most Recent Valuation *</label>
            <input className="form-control" name="last_financing_round_valuation" ref="last_financing_round_valuation" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="estimated_eit_valuation">Estimated Exit Valuation *</label>
            <input className="form-control" name="estimated_eit_valuation" ref="estimated_eit_valuation" type="text" />
          </div>

          <h3>What additional benefits do you receive?</h3>
          <div className="form-group">
            <label className="checkbox-inline"><input name="benefits" type="checkbox" value="food" />Food</label>
            <label className="checkbox-inline"><input name="healthcare" type="checkbox" value="healthcare" />Healthcare</label>
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit">Add Offer</button>
          </div>
        </form>
      </div>
    )
  }
});
