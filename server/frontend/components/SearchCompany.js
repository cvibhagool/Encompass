import React, { PropTypes, Component } from 'react';
import { Typeahead } from 'react-typeahead';

import { CompanyNames } from '../constants';
import CompanyProfile from './CompanyProfile';

const googlePath = '/api/company/2';

export default class SearchCompany extends Component {
  constructor () {
    super();
    this.state = { data: {} };
  }

  render() {
    const { apiData } = this.props;
    return (
      <div>
      		Company Name:
		     <Typeahead 
            className="form-control" 
		        name="company" 
		        options={ CompanyNames } 
            filterOption="name"
            displayOption="name"
		        placeholder="Uber" 
		        maxVisible={10}
            onOptionSelected={
              (option) =>  {
                this.props.getApiData('/api/company/' + option.id)
              }
            }
		        />
		    {apiData.name &&
          <CompanyProfile 
            companyData={apiData} 
            />
        }
	  </div>
    );
  }
}

