import React, { Component } from 'react';

class LoginForm extends Component {
  
  render() {
    return (
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate"/>
            <label for="icon_prefix">First Name</label>
          </div>
          <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate"/>
            <label for="password">Password</label>
          </div>
        </div>
        </div>
      </form>
    )
  }

}

export default LoginForm;