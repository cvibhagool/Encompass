import React, { PropTypes, Component }  from 'react';
import { Typeahead }                    from 'react-typeahead';
import _                                from 'lodash';
import cookie                           from 'react-cookie';
import { TextField, RaisedButton }      from 'material-ui';

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
        <h1 id="heading">{'Add Your Offer'}</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <div className="col-md-4 col-md-offset-4 text-center">
              <label htmlFor="company">{'Company *'}</label>
                <Typeahead 
                    customClasses={
                      { input: "typeahead-input",
                        results: "typeahead-results",
                        listItem: "typeahead-item",
                        hover: "typeahead-active" }
                    }
                    maxVisible={10}
                    name="company_name" 
                    onOptionSelected={
                      (name) =>  {
                        this.setState({company_name: name});
                      }
                    }
                    options={this.state.companyNames} 
                    placeholder="Google" 
                    style={{
                      'position': 'absolute',
                      'z-index': 2
                    }}
                />
            </div>
            
          <div className="col-md-4 col-md-offset-4 text-center">
            <TextField
              hintText="Software Engineer"
              floatingLabelText="What is your job title?"
              name="position"
              ref="position" 
            />
          </div>

          <div className="col-md-4 col-md-offset-4 text-center">
            <TextField
              hintText="numbers only please :)"
              floatingLabelText="What is your salary?"
              name="salary"
              ref="salary" 
              type="number"
            />
          </div>

          <div className="col-md-4 col-md-offset-4 text-center">
            <TextField
              hintText="numbers only please :)"
              floatingLabelText="What is your equity?"
              name="equity"
              ref="equity" 
              type="number"
            />
          </div>
          
          <div className="col-md-4 col-md-offset-4 text-center">
            <TextField
              hintText="numbers only please :)"
              floatingLabelText="Total funding?"
              name="total_funding"
              ref="total_funding" 
              type="number"
            />
          </div>

          <div className="col-md-4 col-md-offset-4 text-center">
            <TextField
              hintText="numbers only please :)"
              floatingLabelText="How many employees?"
              name="employees"
              ref="employees" 
              type="number"
            />
          </div>

          <div></div>
          
          <div className="col-md-4 col-md-offset-4 text-center">
            <RaisedButton
              type="submit"
              value="Post" 
              label={"Follow Company"}
              primary={true}
            />
          </div>
          </div>
        </form>
      </div> :
      <h1>{'Please log in to use this feature'}</h1>}
      </div>
    )
  }
};

AddOffer.propTypes = {
  companies: PropTypes.array.isRequired,
  postApiData: PropTypes.func.isRequired
}

