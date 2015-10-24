import React, { PropTypes, Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

export default class Signup extends Component {
  getInitialState () {
    return {};
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      username: this.refs.username.getValue().trim(),
      password: this.refs.password.getValue().trim()
    };

    this.props.postApiData('/auth/signup', formData);

    this.refs.username.setValue('');
    this.refs.password.setValue('');
  }

  render() {
    return (
    <div>
      <h1 id="heading">Sign Up</h1>
      <form action="" onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <TextField hintText="" floatingLabelText="Username" ref="username"/>
        </div>
        <div>
          <TextField hintText="" floatingLabelText="Password" type="password" ref="password"/>
        </div>

        <div className="form-group">
          <RaisedButton label="Login" primary={true} type="submit"/>
        </div>

      </form>
      <a href="auth/facebook">Sign up with Facebook</a>
    </div>
    );
  }
}

