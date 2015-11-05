// URL is /addoffer
// this view renders where a user adds an offer to their profile 
// it's parent is ContentPage

// require our dependencies
import React, { PropTypes, Component }  from 'react';
import { Typeahead }                    from 'react-typeahead';
import { connect }                      from 'react-redux';
import { postApiData }                  from '../actions';
import _                                from 'lodash';
import cookie                           from 'react-cookie';
import { TextField, RaisedButton, Snackbar }      from 'material-ui';
import { Link }                         from 'react-router';

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

    // Segment event tracking when user adds an offer
    window.analytics.track('Add Offer', {
      "Company Name": formData.company_name,
      "Position": formData.position,
      "Salary": formData.salary,
      "Equity": formData.equity
    });

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
            <h2 className="heading">{'We\'ll help you compare your new job offers'}</h2>
            <h5 className="heading">{'Simply input the offers you\'ve received then head over to your profile to compare the value of each'}</h5>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <div className="col-md-4 col-md-offset-4 text-center">

                    { /* creates a dropdown for company name that allows user to click to choose */ }
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
                
                { /* add offer form */ }
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
            <section className = "container hero-landing">
              <div className = "col-xs-21 hero-content">
                <h1> <span className="word">Add</span> your offers</h1>
                <p className = "lead">Calculate & compare the value of your offers</p>
                <Link to="/login" className= "btn btn-primary btn-lg">Login to Access</Link>
              </div>
            </section>
        }
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

