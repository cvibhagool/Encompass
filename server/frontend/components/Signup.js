import React, { PropTypes, Component }  from 'react';
import { TextField, RaisedButton, FontIcon } from 'material-ui';

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

    this.refs.username.setValue('');
    this.refs.password.setValue('');
  }

  render() {
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
                floatingLabelText={<span> <i className="material-icons" style={{"vertical-align": 'middle'}}>{'person'}</i>{'Username'}</span>} 
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
                primary={true} 
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
}

