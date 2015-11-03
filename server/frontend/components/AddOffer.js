// this page will add an offer to a user's profile
// it's parent is ContentPage

import React, { PropTypes, Component }  from 'react';
import { Typeahead }                    from 'react-typeahead';

import { connect } from 'react-redux';
import { postApiData } from '../actions';

import _                                from 'lodash';
import cookie                           from 'react-cookie';
import { TextField, RaisedButton, Snackbar }      from 'material-ui';

export default class AddOffer extends Component {
 
  constructor() {
    super();
    this.state = {data: []}
  }

  componentDidMount() {
    // Segment pageview call
    window.analytics.page();
    
    this.setState({companyNames: _.pluck(this.props.companies, 'name')});
  }

  handleSubmit (e) {
    e.preventDefault();

    // capture the form data
    let formData = {
      company_name: this.state.company_name.trim(),
      position: this.refs.position.getValue().trim(),
      salary: this.refs.salary.getValue(),
      equity: this.refs.equity.getValue(),
    }

    // send the user's submission to the server
    this.props.postApiData('/api/offer', formData);

    // reset the form upon submission
    this.setState({company_name: ''});
    this.refs.position.clearValue();
    this.refs.salary.clearValue();
    this.refs.equity.clearValue();
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
        <h1 className="heading">{'Add Your Offer'}</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <div className="col-md-4 col-md-offset-4 text-center">

                { /* creates a dropdown for company name to allow user to click when matched */ }
                <Typeahead 
                    customClasses={
                      { hover: "typeahead-active",
                        input: "typeahead-input",
                        listItem: "typeahead-item",
                        results: "typeahead-results" }
                    }
                    maxVisible={10}
                    name="company_name" 
                    onOptionSelected={
                      (name) =>  {
                        this.setState({company_name: name});
                      }
                    }
                    options={this.state.companyNames} 
                    placeholder="Which company made you an offer?" 
                    style={{
                      'position': 'absolute',
                      'z-index': 2
                    }}
                />
            </div>
            
            <div className="col-md-4 col-md-offset-4 text-center">
              <TextField
                  floatingLabelText="What is your job title?"
                  hintText="Software Engineer"
                  name="position"
                  ref="position" 
              />
            </div>

            <div className="col-md-4 col-md-offset-4 text-center">
              <TextField
                  floatingLabelText="What is your salary?"
                  hintText="numbers only please :)"
                  name="salary"
                  ref="salary" 
                  type="number"
              />
            </div>

            <div className="col-md-4 col-md-offset-4 text-center">
              <TextField
                  floatingLabelText="What is your percentage equity?"
                  hintText="numbers 0 to 100 only please :)"
                  name="equity"
                  ref="equity" 
                  step="any"
                  type="number"
              />
            </div>
            
            <div className="col-md-4 col-md-offset-4 text-center">
              <RaisedButton
                  label={"Add Offer"}
                  primary={true}
                  type="submit"
                  value="Post" 
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

function mapStateToProps(state) {
  const {api} = state;

  return {
    companies: api.companies,
  };
};

export default connect(mapStateToProps, {
  postApiData
})(AddOffer);

