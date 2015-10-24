import React, { PropTypes, Component } from 'react';
import { Typeahead } from 'react-typeahead';

import { CompanyNames } from '../constants';
import CompanyProfile from './CompanyProfile';

export default class SearchCompany extends Component {
  constructor () {
    super();
    this.state = { data: {} };
  }

  render() {
    return (
      <div>
      		Company Name:
		     <Typeahead 
		        className="form-control" 
		        name="company" 
		        options={ CompanyNames } 
		        placeholder="Uber" 
		        maxVisible={10}
		        />
		    <CompanyProfile />
	  </div>
    );
  }
}

