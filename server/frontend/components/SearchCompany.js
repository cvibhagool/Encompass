import React, { PropTypes, Component } from 'react';
import { Typeahead } from 'react-typeahead';
import _                                from 'lodash';

import { Companies } from '../constants';
import CompanyProfile from './CompanyProfile';


export default class SearchCompany extends Component {
  
  constructor () {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.setState({companyNames: _.pluck(Companies, 'name')});
  }

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
                let companyEntry = _.find(Companies, 'name', name);
                this.setState({companyId: companyEntry.id});
              }
            }
            />
        {this.state.companyId &&    
          <CompanyProfile apiData={this.props.apiData} companyId={this.state.companyId} fetchApiData={this.props.fetchApiData}/>
		    }
	  </div>
    );
  }
}

