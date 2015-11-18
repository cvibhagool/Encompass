// URL is /login
// this view renders the login/signup box
// its parent is ContentPage

// require our dependencies
import React, { PropTypes, Component }        from 'react';
import { TextField, RaisedButton, FontIcon }  from 'material-ui';
import { pushState }                          from 'redux-router';
import { connect }                            from 'react-redux';
import { fetchApiData, postApiData }          from '../actions';
import cookie                                 from 'react-cookie';


/*jshint esnext: true */
export default class Login extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // Segment pageview call
    window.analytics.page();
  }

  componentWillUpdate (nextProps) {

    // if the user exists in our db, make a GET request for their profile info
    if(nextProps.apiData.username) {
      nextProps.fetchApiData('/api/user/profile/me');  
    }
  }

  componentDidUpdate () {

    // if login is successful
    if(this.props.profile) {

      // Segment identify call; passes in username property
      var userID = cookie.load('user.id');
      var userUsername = cookie.load('user.username');
      window.analytics.identify(userID, {
        Username: userUsername
      });

      // Segment tracking for Sign Up event
      window.analytics.track('Logged In', {
        Username: userUsername,
        "User ID": userID
      });

      // forward user to their profile page upon login
      this.props.pushState(null, '/profile');
    }
  }

  handleClick (e) {
    e.preventDefault();

    // collect login data to send to server
    let formData = {
      username: this.refs.username.getValue().trim(),
      password: this.refs.password.getValue().trim()
    };

    // determine whether user is logging in or signing up
    if (e.target.textContent === 'Login'){
      this.props.postApiData('/auth/local', formData);
    } else {
      this.props.postApiData('/auth/signup', formData);
    }
    this.refs.username.setValue('');
    this.refs.password.setValue('');
  }

	renderLoginForm() {
		return (
    <div>
      <div className = "row">
        <div className = "col-md-4 col-md-offset-4 text-center">
        	<h1 id="heading">{'Login'}</h1>
        	<form>
            <div>
              <TextField 
                  floatingLabelText={
                    <span>
                      <i 
                          className="material-icons" 
                          style={{"verticalAlign": 'middle'}}
                      >{'person'}
                      </i>{'Username'}
                    </span>} 
                  hintText="" 
                  ref="username"
                  style={{
                    width: 'auto',
                    display: 'absolute'
                  }}
              />
            </div>
            <div>
              <TextField 
                  floatingLabelText={
                    <span>
                      <i 
                          className="material-icons" 
                          style={{"vertical-align": 'middle'}}
                      >{'lock'}
                      </i>{'Password'}
                    </span>} 
                  hintText="" 
                  ref="password"
                  style={{
                      width: 'auto',
                      display: 'absolute'
                  }}
                  type="password" 
              />
            </div>

            <div className="buttons" style = {{'margin-top':'5%'}}>
              <div className="form-group">
                <RaisedButton 
                    label="Login" 
                    style={{
                        width: 'auto',
                        display: 'absolute'
                    }}
                    primary={true}
                    onClick={this.handleClick.bind(this)}
                    type='login'
                />
              </div>

              {/*<div className="form-group">
                <RaisedButton 
                    label="Signup" 
                    style={{
                        width: 'auto',
                        display: 'absolute'
                    }}
                    primary={true}
                    onClick={this.handleClick.bind(this)}
                    type='signup'
                />
              </div>*/}

              <div className="form-group">
                <RaisedButton 
                    href="auth/facebook" 
                    label="Use Facebook" 
                    style={{
                        width: 'auto',
                        display: 'absolute'
                    }}
                    primary={true}
                />
              </div>
            </div>
        	</form>
        </div>
      </div>
    </div>
		);
	}

  renderLoggedInNotice() {
    return (
      <div>
        <h1>{'You are already logged in!'}</h1>
      </div>
    );
  }

  render() {
    const {profile} = this.props;
    return (
      <div>
        {!profile ? this.renderLoginForm() : this.renderLoggedInNotice()}
      </div>
    );
  }
};

Login.propTypes = {
  apiData: PropTypes.object.isRequired,
  fetchApiData: PropTypes.func.isRequired, 
  postApiData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  pushState: PropTypes.func.isRequired
}

function mapStateToProperties(state) {
  const { api } = state;
  return { 
    apiData: api.apiData,
    profile:  api.profile
    };
}

export default connect(mapStateToProperties, {
  fetchApiData,
  postApiData,
  pushState
})(Login);
