import React, { PropTypes, Component } from 'react';
import { Typeahead } from 'react-typeahead';
import _                                from 'lodash';

import { Paper } from 'material-ui';

import CompanyProfile from './CompanyProfile';

export default class SearchCompany extends Component {
  constructor () {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.setState({companyNames: _.pluck(this.props.companies, 'name')});
  }

  //CSS styling forthcoming
  render() {
    return (
      <div>
      		<h1>Search by Company Name:</h1>
          <Paper className="left-pane" zDepth={1}>
            <Typeahead 
              name="company" 
              options={ this.state.companyNames } 
              placeholder="Google" 
              maxVisible={10}
              onOptionSelected={
                (name) =>  {
                  let companyEntry = _.find(this.props.companies, 'name', name);
                  this.setState({companyId: companyEntry.id});
                }
              }
              customClasses={
                { input: "typeahead-input",
                  results: "typeahead-results",
                  listItem: "typeahead-item",
                  hover: "typeahead-active"}
              }
              />
            </Paper>
          <Paper className="content-pane" zDepth={1}>
            {this.state.companyId &&
              <CompanyProfile 
                className="content-pane"
                apiData={this.props.apiData} 
                companyId={this.state.companyId} 
                fetchApiData={this.props.fetchApiData}/>
    		    }
          </Paper>
	  </div>
    );
  }
}

