import React, { PropTypes, Component } from 'react';

export default class Login extends Component {
	handleSubmit() {
		return void 0;
	}

	render() {
		return (
		<div>
		  	<h1 id="heading">Login</h1>
		  	<form action="" onSubmit={this.handleSubmit.bind(this)}>
				<div className="form-group">
		        	<label htmlFor="login-username">Username</label>
		        	<input className="form-control" name="username" ref="username" type="text" />
		      	</div>

		      	<div className="form-group">
		        	<label htmlFor="login-password">Password</label>
		        	<input className="form-control" name="password" ref="password" type="text" />
		      	</div>

				<div className="form-group">
				  <button className="btn btn-primary" type="submit">Login</button>
				</div>
			</form>
		</div>
		);
	}
}