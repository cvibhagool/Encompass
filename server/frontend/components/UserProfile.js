// URL is /profile
// this view renders when user navigates to their profile page
// its parent is ContentPage

// require our dependencies

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';
import cookie                           from 'react-cookie';
import { connect }                      from 'react-redux';
import { fetchApiData, removeApiData }  from '../actions';
import { Link }                         from 'react-router';

// import subviews/children
import MyCompanies                      from './MyCompanies.js';
import MyOffers                         from './MyOffers.js';


// define all constant variables
const userPath = '/api/user/profile/me';

// create UserProfile view
export default class UserProfile extends Component {

  constructor () {
    super();
    this.state = {};
  }

  // GET request for when page loads for our user data & subview components
  componentWillMount() {
    this.props.fetchApiData('/data/company?fields[]=name&fields[]=id');
    this.props.fetchApiData(userPath);
  }

  componentDidMount() {
    // Segment pageview call
    window.analytics.page();
  }

  checkCookie() {
    let usercookie = cookie.load('connect.sid');
    return usercookie;
  }

  render() {
    const {profile} = this.props;
    return (
            <div>
              { /* check if user is logged in */ }
              {profile ?
                
                <div>
                  <div className="container">
                    <h1>{'Welcome'} {profile.user && profile.user.username}{'!'}</h1>

                    <p style={{'font-size': '15px'}}>{'Below we have saved your offers and the companies you follow. Click on any offer or company to drill down for more information.  Go on now, dont be shy!'}</p>
                  </div>

                  { /* instantiate the MyOffers child and pass it props (the offers) that this logged-in user has entered previously */ }
                  <MyOffers 
                      apiData={profile}
                      fetchApiData={this.props.fetchApiData.bind(this)} 
                      removeApiData={this.props.removeApiData.bind(this)} 
                  />
                  <div style={{marginTop: "100px"}}></div>  

                  { /* instantiate the MyCompanies child and pass it props (the companies) that this logged-in user currently follows */ }
                  <MyCompanies 
                      apiData={profile} 
                      fetchApiData={this.props.fetchApiData.bind(this)} 
                      removeApiData={this.props.removeApiData.bind(this)}
                  />
                </div> :

                <section className = "container hero-landing">
                  <div className = "col-xs-21 hero-content">
                    <h1> <span className="word">Organize</span> your life</h1>
                    <p className = "lead">Keep track of who is offering you what</p>
                    <Link to="/login" className= "btn btn-primary btn-lg">Login to Access</Link>
                  </div>
                </section>
              }
            </div>
          );
  }
}

UserProfile.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  fetchApiData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  removeApiData: PropTypes.func.isRequired
}

function mapStateToProperties(state) {
  const { api } = state;
  return { profile: api.profile };
}

export default connect(mapStateToProperties, {
  fetchApiData,
  removeApiData
})(UserProfile);
