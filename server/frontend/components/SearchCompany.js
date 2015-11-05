// URL is /searchcompany
// this view renders when a user is searching for a company
// its parent is ContentPage

// require our dependencies
import React, { PropTypes, Component }  from 'react';
import { Link }                         from 'react-router';
import { connect }                      from 'react-redux';
import cookie                           from 'react-cookie';
import { Typeahead }                    from 'react-typeahead';
import { Paper, RaisedButton, ClearFix }          from 'material-ui';

//Import the following api actions
import { fetchApiData, postApiData }    from '../actions';

//Import component to display a specific company's profile
import CompanyProfile                   from './CompanyProfile';
import IndustryGraph                    from './IndustryGraph';
import Parallel                         from './Parallel';

//Import lodash utility functions
import _                                from 'lodash';

export default class SearchCompany extends Component {
  constructor () {
    super();
    this.state = {
      displayParallel: false
    };
    this.clickFollowCompany = this.clickFollowCompany.bind(this);
  }

  componentDidMount() {
    // Segment pageview call
    window.analytics.page();
    
    this.setState({companyNames: _.pluck(this.props.companies, 'name'), companyFollowed: false});
  }

  showParallel() {
    this.setState({displayParallel: true});
  }

  clickFollowCompany(e) {
    e.preventDefault();

    // POST request to follow a company
    this.props.postApiData('/api/company/follow/' + this.state.companyId, {});
    this.setState({companyFollowed: true});

    // Segment event tracking; fires when user follows a company
    window.analytics.track('Follow Company', {
      "Company ID": this.state.companyId,
      "Company Name": this.state.companyName
    });
  }

  checkCookie() {
    let usercookie = cookie.load('connect.sid');
    return usercookie;
  }

  render() {
    return (
      <div>

        {this.checkCookie() ? 
          <div>
            <h1 className="heading">{'Search by Company Name'}</h1>
            <h2 className="heading">{'Want to research your future employer?'}</h2>
            <h5 className="heading">{'Let us do the hard work for you. Search from over 47,000 startups to find the best one for you.'}</h5>
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
                      this.setState({companyId: companyEntry.id, companyName: companyEntry.name});
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
                style = {{'boxShadow': '0 0px 0px'}}
            >
              <IndustryGraph
                apiData={this.props.apiData}
                className="content-pane"
                companyId={this.state.companyId} 
              />
            </Paper>

            <div className="col-md-12  text-center" style={{marginBottom: "15px"}}>
              <h1 className="heading">{'Or view the data summarized by industry:'}</h1>
              <RaisedButton
                label="View"
                primary={true}
                onClick={this.showParallel.bind(this)}
              />
            </div>  
            <ClearFix />
              {this.state.displayParallel ? <Parallel /> : ''}		
          </div> :
            <section className = "container hero-landing">
              <div className = "col-xs-21 hero-content">
                <h1> <span className="word">Look</span> for startups</h1>
                <p className = "lead">Over 47,000 startups to choose from</p>
                <Link to="/login" className= "btn btn-primary btn-lg">Login to Access</Link>
              </div>
            </section>
        }
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
