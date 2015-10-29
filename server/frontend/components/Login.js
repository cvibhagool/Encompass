import React, { PropTypes, Component }        from 'react';
import { TextField, RaisedButton, FontIcon }  from 'material-ui';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import { fetchApiData, postApiData } from '../actions';


/*jshint esnext: true */
export default class Login extends Component {
  constructor() {
    super();
  }

  componentWillUpdate (nextProps) {
    if(nextProps.apiData.username) {
      nextProps.fetchApiData('/api/user/profile/me');  
    }
  }

  componentDidUpdate () {
    if(this.props.profile) {
      this.props.pushState(null, '/');
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      username: this.refs.username.getValue().trim(),
      password: this.refs.password.getValue().trim()
    };

    this.props.postApiData('/auth/local', formData);
    this.refs.username.setValue('');
    this.refs.password.setValue('');
  }

	renderLoginForm() {
		return (
    <div>
      <div className = "row">
        <div className = "col-md-4 col-md-offset-4 text-center">
        	<h1 id="heading">{'Login'}</h1>
        	<form 
            action="" 
            onSubmit={this.handleSubmit.bind(this)}
          >
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

            <div className="form-group">
              <RaisedButton 
                  label="Login" 
                  style={{
                      width: 'auto',
                      display: 'absolute'
                  }}
                  type="submit" 
              />
            </div>

            <div className="form-group">
              <RaisedButton 
                  href="auth/facebook" 
                  label="Login with Facebook" 
                  style={{
                      width: 'auto',
                      display: 'absolute'
                  }}
              />
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
