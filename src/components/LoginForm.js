import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';

import { connect } from 'react-redux';
import { getUsername } from '../actions';

import squidIcon from '../images/squidIcon.png';
import passwordIcon from '../images/passwordIcon.png';

class LoginForm extends Component {
  
  getUsername = (e) => {
    this.props.getUsername(e.target.value);
  }



  render() {
    return (
      <form className="col s12 container divBorder formSettings">
        <h1 className="siteTitle">Squid Match</h1>
        <h4 style={subTitle}>Login to find active players to play with</h4>
          <div className="row">

            <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="username-icon" src={squidIcon}/>
	          <Input s={8} m={9} l={9} label="Username" validate
                    value={this.props.username}
                    onChange={e => this.getUsername(e)}>
            </Input>
      
            <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="password-icon" src={passwordIcon}/>
            <Input s={8} m={9} l={9} type="password" label="Password" validate>
            </Input>

            <section className="center-align">
              <Button style={loginButton} waves='light'>Login</Button>
            </section>

            <p className="center-align" style={secondOption}><a>Create Account</a></p>

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

const mapStateToPrps = (state) => {
  return {
    username: state.loginReducer.username
  }
}

export default connect(mapStateToPrps, { getUsername })(LoginForm);