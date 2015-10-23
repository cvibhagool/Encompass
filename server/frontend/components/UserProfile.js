import React, { PropTypes, Component } from 'react';

const testPath = '/api/company/1';

export default class UserProfile extends Component {
  componentWillMount() {
    this.props.getApiData(testPath);
  }

  render() {
  	const { apiData, isFetching } = this.props;
    return (
    	<div>
    		{isFetching &&
    		  	<h2>Loading...</h2>
    		}
    		{apiData && Object.keys(apiData).map(function(key, value) {
    			return <div key={key}>{key}: {value}</div>; 
    		})}
    	</div>
    );
  }
}

