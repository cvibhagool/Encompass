import React, { PropTypes, Component }  from 'react';
import { Typeahead }                    from 'react-typeahead';
import _                                from 'lodash';
import { Paper }                        from 'material-ui';

import CompanyProfile                   from './CompanyProfile';

export default class SearchCompany extends Component {
  constructor () {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.setState({companyNames: _.pluck(this.props.companies, 'name')});
  }

  render() {
    return (
      <div>
          <h1 id="heading">{'Search by Company Name'}</h1>
          
          <div>{'Input company name:'}</div>
          <Paper 
              className="left-pane" 
              zDepth={1}
          >
              <Typeahead 
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
                    }
                  }
                  options={this.state.companyNames}
                  placeholder="Google" 
              />
          </Paper>
          <Paper 
              className="content-pane" 
              zDepth={1}
          >
              {this.state.companyId &&
              <CompanyProfile 
                  apiData={this.props.apiData} 
                  className="content-pane"
                  companyId={this.state.companyId} 
                  fetchApiData={this.props.fetchApiData}
              />
    		      }
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
  fetchApiData: PropTypes.func.isRequired
}

