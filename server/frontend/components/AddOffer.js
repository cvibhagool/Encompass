import React, { PropTypes, Component }  from 'react';
import { Typeahead }                    from 'react-typeahead';
import _                                from 'lodash';
import cookie from 'react-cookie';

export default class AddOffer extends Component {
 
  constructor() {
    super();
    this.state = {data: []}
  }

  componentDidMount() {
    this.setState({companyNames: _.pluck(this.props.companies, 'name')});
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      company_name: this.state.company_name.trim(),
      position: this.refs.position.value.trim(),
      salary: this.refs.salary.value,
      equity: this.refs.equity.value,
      total_funding: this.refs.total_funding.value,
      employees: this.refs.employees.value
    }

    this.props.postApiData('/api/offer', formData);

    this.setState({company_name: ''});
    this.refs.position.value = '';
    this.refs.salary.value = '';
    this.refs.equity.value = '';
    this.refs.total_funding.value = '';
    this.refs.employees.value = '';
    // this.refs.benefits.value = '';
  }

  checkCookie() {
    let usercookie = cookie.load('connect.sid');
    return usercookie;
  }


  render () {
    return (
      <div> 
      {this.checkCookie() ?
      <div>
        <h1 id="heading">Add Your Offer</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="company">Company *</label>
              <Typeahead 
                className="form-control" 
                name="company_name" 
                options={ this.state.companyNames } 
                placeholder="Google" 
                maxVisible={10}
                onOptionSelected={
                  (name) =>  {
                    this.setState({company_name: name});
                  }
                } />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input className="form-control" name="position" ref="position" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary *</label>
            <input className="form-control" name="salary" ref="salary" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="equity">Equity *</label>
            <input className="form-control" name="equity" ref="equity" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="total_funding">Total Funding *</label>
            <input className="form-control" name="total_funding" ref="total_funding" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="employees">Employees *</label>
            <input className="form-control" name="employees" ref="employees" type="number" />
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit" value="Post">Add Offer</button>
          </div>
        </form>
      </div> :
      <h1>Please log in to use this feature</h1>}
      </div>
    )
  }
};

