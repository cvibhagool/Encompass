import React 			from 'react';
import { Route } 		from 'react-router';
import Landing          from './components/Landing';
import UserProfile     	from './components/UserProfile';
import AddOffer        	from './components/AddOffer';
import SearchCompany   	from './components/SearchCompany';
import Login           	from './components/Login';
import Signup          	from './components/Signup';

export default (
  <Route 
  		path="/" 
  		component={Landing}
  >
  	<Route path="/:profile"
           component={UserProfile} />
    <Route path="/:addOffer"
           component={AddOffer} />
    <Route path="/:searchCompany"
           component={SearchCompany} />
    <Route path="/:login"
           component={Login} />
    <Route path="/:signup"
           component={Signup} />   
  </Route>
);
