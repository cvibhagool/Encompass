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
    		{apiData && _.map(apiData, function(val, ind) {
            return <div key={ind}>{ind}: {val}</div>; 
          })
        }
    	</div>
    );
  }
}

