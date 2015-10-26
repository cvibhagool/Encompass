import React, { PropTypes, Component } from 'react';
import { TextField, RaisedButton, FontIcon } from 'material-ui';

export default class Login extends Component {
  constructor() {
    super();
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

	render() {
		return (
    <div>
      <div className = "row">
        <div className = "col-md-4 col-md-offset-4 text-center">
      	<h1 id="heading">Login</h1>
      	<form action="" onSubmit={this.handleSubmit.bind(this)}>          
          <div>
            <TextField hintText="" floatingLabelText={<span>
              <i className="material-icons" style={{
              "vertical-align": 'middle'
            }}>person</i>
              Username</span>} ref="username"
              style={{
              width: 'auto',
              display: 'absolute'
            }}/>
          </div>
          <div>
            <TextField hintText="" floatingLabelText={<span>
              <i className="material-icons" style={{
              "vertical-align": 'middle'
            }}>lock</i>
              Password</span>} type="password" ref="password"
              style={{
              width: 'auto',
              display: 'absolute'
            }}/>
          </div>

          <div className="form-group">
            <RaisedButton label="Login" primary={true} type="submit" style={{
              width: 'auto',
              display: 'absolute'
            }}/>
          </div>

          <div className="form-group">
            <RaisedButton linkButton={true} href="auth/facebook" secondary={true} label="Login with Facebook" style={{
              width: 'auto',
              display: 'absolute'
            }}/>
          </div>

      	</form>
        </div>
      </div>
    </div>
		);
	}
}