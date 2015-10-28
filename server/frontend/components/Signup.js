import React, { PropTypes, Component }  from 'react';
import { TextField, RaisedButton, FontIcon } from 'material-ui';

import { connect } from 'react-redux';
import { fetchApiData, postApiData } from '../actions';

export default class Signup extends Component {
  constructor() {
    super();
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      username: this.refs.username.getValue().trim(),
      password: this.refs.password.getValue().trim()
    };

    this.props.postApiData('/auth/signup', formData);
    this.props.fetchApiData('/api/user/profile/me');

    this.refs.username.setValue('');
    this.refs.password.setValue('');
  }

  renderSignUpForm() {
    return (
        <div>
          <div className = "row">
            <div className = "col-md-4 col-md-offset-4 text-center">
            <h1 id="heading">{'Sign up'}</h1>
            <form action="" 
                onSubmit={this.handleSubmit.bind(this)}
            >
              <div>
                <TextField 
                    floatingLabelText={
                        <span> 
                          <i 
                              className="material-icons" 
                              style={{"vertical-align": 'middle'}}
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
                    floatingLabelText={<span>
                    <i 
                        className="material-icons" 
                        style={{
                          "vertical-align": 'middle'
                        }}
                    >{'lock'}</i>
                  {'Password'}</span>} 
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
                    label="Sign up" 
                    style={{
                      display: 'absolute',
                      width: 'auto',
                    }}
                    type="submit" 
                />
              </div>

              <div className="form-group">
                <RaisedButton 
                    href="auth/facebook" 
                    label="Sign up with Facebook" 
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
        {!profile ? this.renderSignUpForm() : this.renderLoggedInNotice()}
      </div>
    );
  }
};

Signup.propTypes = {
  postApiData: PropTypes.func.isRequired
}

function mapStateToProperties(state) {
  const { api } = state;
  return { profile: api.profile };
}

export default connect(mapStateToProperties, {
  fetchApiData,
  postApiData
})(Signup);

