import React, { PropTypes, Component }  from 'react';
import { Typeahead }                    from 'react-typeahead';
import _                                from 'lodash';

import CompanyProfile                   from './CompanyProfile';

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
      		Company Name:
          <Typeahead 
            className="form-control" 
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
        {this.state.companyId &&    
          <CompanyProfile apiData={this.props.apiData} companyId={this.state.companyId} fetchApiData={this.props.fetchApiData}/>
		    }
	  </div>
    );
  }
}

