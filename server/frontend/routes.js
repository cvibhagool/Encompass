// this page controls our navbar routing
// its parent is index.js

// require our dependencies
import React 			            from 'react';
import { IndexRoute, Route } 	from 'react-router';

import App                    from './containers/App';
import Landing                from './components/Landing';
import UserProfile     	      from './components/UserProfile';
import AddOffer        	      from './components/AddOffer';
import SearchCompany   	      from './components/SearchCompany';
import Login           	      from './components/Login';

export default (
  <Route
      component={App}
      path="/" 
  >
    <IndexRoute component={Landing} />   
  	<Route 
        component={UserProfile}
        path="profile"
    />
    <Route 
        component={AddOffer}
        path="addOffer"
    />
    <Route 
        component={SearchCompany}
        path="searchCompany"
    />
    <Route 
        component={Login} 
        path="login"
    />
  </Route>
);

