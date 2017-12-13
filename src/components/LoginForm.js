import React, { Component } from 'react';

import squidIcon from '../images/squidIcon.png';
import passwordIcon from '../images/passwordIcon.png';

class LoginForm extends Component {
  
  render() {
    return (
      <form class="col s12 container">
        <div class="divBorder formSettings col s10 col m6 offset-s1 offset-m3">
        <h1 className="siteTitle">Squid Match</h1>
        <h4 style={subTitle}>Login to find active players to play with</h4>
          <div class="row">
            
            <img class="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="username-icon" src={squidIcon}/>
            <section class="input-field col s8 m9 l9">
              <input id="username" type="text" class="validate"/>
              <label for="username">Username</label>
            </section>
      
            <img class="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="password-icon" src={passwordIcon}/>
            <section class="input-field col s8 m9 l9">
              <input id="password" type="password" class="validate"/>
              <label for="password">Password</label>
            </section>

            <section class="center-align">
              <a style={loginButton} class="waves-effect waves-light btn">Login</a>
            </section>

            <p class="center-align" style={secondOption}><a>Create Account</a></p>

          </div>
        </div>
      </form>
    )
  }

}

//////////
//Styles//
//////////

const secondOption = {
  fontFamily: 'overpass',
}

const signupButton = {
  width: '150px',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const loginButton = {
  width: '150px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
}

const subTitle =  {
  fontFamily: 'overpass',
  textAlign: 'center',
  color: '#948f8f',
  marginTop: '1%'
}

export default LoginForm;