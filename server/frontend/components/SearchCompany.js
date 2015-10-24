import React, { PropTypes, Component } from 'react';
import { Typeahead } from 'react-typeahead';

import { CompanyNames } from '../constants';

export default class SearchCompany extends Component {
  render() {
    return (
      <div>Company Name:
	      <Typeahead 
	        className="form-control" 
	        name="company" 
	        options={ CompanyNames } 
	        placeholder="Uber" 
	        maxVisible={10}
	        />
	  </div>
    );
  }
}

