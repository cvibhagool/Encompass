import React, { PropTypes, Component }  from 'react';

//Connect this component to Redux dispatcher and store
import { connect } from 'react-redux';

//Import the following api actions
import { fetchApiData, postApiData } from '../actions';

//Import third party components
import { Typeahead }                    from 'react-typeahead';
import { Paper, RaisedButton }          from 'material-ui';

//Import component to display a specific company's profile
import CompanyProfile                   from './CompanyProfile';
import IndustryGraph                   from './IndustryGraph';

//Import lodash utility functions
import _                                from 'lodash';

export default class SearchCompany extends Component {
  constructor () {
    super();
    this.state = {};
    this.clickFollowCompany = this.clickFollowCompany.bind(this);
  }

  componentDidMount() {
    this.setState({companyNames: _.pluck(this.props.companies, 'name'), companyFollowed: false});
  }

  clickFollowCompany(e) {
    e.preventDefault();
    this.props.postApiData('/api/company/follow/' + this.state.companyId, {});
    this.setState({companyFollowed: true});
  }

  render() {
    return (
      <div>
        <h1 className="heading">{'Search by Company Name'}</h1>

        <div className="col-md-4 col-md-offset-4 text-center">
          {<Typeahead 
              customClasses={
                { hover: "typeahead-active",
                  input: "typeahead-input",
                  listItem: "typeahead-item",
                  results: "typeahead-results" }
              }
              maxVisible={10}
              name="company" 
              onOptionSelected={
                (name) =>  {
                  let companyEntry = _.find(this.props.companies, 'name', name);
                  this.setState({companyId: companyEntry.id});
                  if(this.props.profile) { 
                    this.setState({companyFollowed : !!_.find(this.props.profile.companies, 'id', companyEntry.id)})
                  }
                }
              }
              options={this.state.companyNames}
              placeholder="Google" 
          />}
        </div>

        <div className="col-md-12 col-md-offset-4 text-center">
          <Paper 
              className="content-pane" 
              zDepth={1}
          >
            {this.state.companyId &&
              <div>
                <CompanyProfile 
                    apiData={this.props.apiData} 
                    className="content-pane"
                    companyId={this.state.companyId} 
                    fetchApiData={this.props.fetchApiData}
                    postApiData={this.props.postApiData}
                />
              </div>
  		      }
            {(this.state.companyId && this.props.profile) && 
              <div>
                <RaisedButton 
                    disabled={this.state.companyFollowed}
                    label={this.state.companyFollowed ? "Company has been followed!" : "Follow Company"}
                    onClick={this.clickFollowCompany}
                    primary={true}
                />
              </div>
            }
          </Paper>
        </div>
        
        <Paper
            className="graph-container" 
            zDepth={2}
        >
          <IndustryGraph
            className="content-pane"
            companyId={this.state.companyId} 
            fetchApiData={this.props.fetchApiData}
            apiData={this.props.apiData} 
          />
        </Paper>
	    </div>
    );
  }
};

SearchCompany.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  companies: PropTypes.array.isRequired,
  fetchApiData: PropTypes.func.isRequired,
  postApiData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log("State", state);
  const {api} = state;  return {
    apiData: api.apiData,
    companies: api.companies,
    company: api.company,
    profile: api.profile
  };
};

export default connect(mapStateToProps, {
  fetchApiData,
  postApiData
})(SearchCompany);
