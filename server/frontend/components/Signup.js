import React, { PropTypes, Component } from 'react';

export default class Signup extends Component {
  getInitialState () {
    return {};
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      username: this.refs.username.value.trim(),
      password: this.refs.password.value.trim()
    };

    this.props.postApiData('/auth/signup', formData);

    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    return (
    <div>
        <h1 id="heading">Sign Up</h1>
        <form action="" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="login-username">Username</label>
          <input className="form-control" name="username" ref="username" type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input className="form-control" name="password" ref="password" type="password" />
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
      <a href="auth/facebook">Sign up with Facebook</a>
    </div>
    );
  }
}

