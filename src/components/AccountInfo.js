import React, { Component } from 'react';
import { TextField, RaisedButton, SelectField, 
        MenuItem } from 'material-ui';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

let colorArray = ['green', 'pink', 'purple', 'orange', 'teal',
                  'brown', 'aqua', 'cornflowerblue', 'gold', 
                  'firebrick'];

class AccountInfo extends Component {
  
  componentDidMount() {
    this.props.setInitialAccountState();
  }

  createAccount = (e) => {
    e.preventDefault();

    //Check email and NSID for validity
    if (/^\d{4}-\d{4}-\d{4}$/g.test(this.props.NSID) && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.props.email))
    {
      //Sets the color for the avatar.
      let avatarColor = colorArray[Math.floor(Math.random() * 10)];

      axios.post('/register', {
        username: this.props.username,
        password: this.props.password,
        email: this.props.email,
        NSID: this.props.NSID,
        age: this.props.age,
        location: this.props.location,
        rank: this.props.rank,
        mode: this.props.mode,
        weapon: this.props.weapon,
        playstyle: this.props.playstyle,
        status: "Available",
        avatar: avatarColor,
      })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        this.props.setLoggedIn(true);
        this.props.getLoginInput({ name: 'verified', value: false });
        this.props.getAccountInput({ name: 'avatar', value: avatarColor });
      })
      .catch(error => {
        this.props.setVerifyMessage('That email address is taken.');
      })
    }
    else {
      this.props.setVerifyMessage('Please enter a correct email or NSID.');
    }
  }

  render() {

    if (!this.props.verified) {
      return <Redirect to='/' />
    }

    if (this.props.isLoggedIn) {
      return <Redirect to='/choose-criteria' />
    }

    return (
      <section className="container divBorder loginFormSettings">
        <h1 style={subTitle}>Create Profile</h1>
        <section className="grid">
          <TextField floatingLabelText="Email" floatingLabelFixed style={fieldWidth}
                    name="email" type="email" value={this.props.email}
                    errorText={!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.props.email) && "Please enter a valid email address."}
                    placeholder="email@mail.com"
                    onChange={e => this.props.getAccountInput({
                      name: e.target.name, value: e.target.value.replace(/ /g, "")
                    })} />
        </section>
      
        <section className="grid">
          <TextField type="text" floatingLabelText="NSID" floatingLabelFixed style={fieldWidth}
                  name="NSID" value={this.props.NSID} placeholder="1234-5678-9012"
                  errorText={!/^\d{4}-\d{4}-\d{4}$/g.test(this.props.NSID) && "Please include -'s."}
                  onChange={e => this.props.getAccountInput({
                    name: e.target.name, value: e.target.value
                  })} />
        </section>
        
        <section className="gridSelector">
          <SelectField
            name="age" value={this.props.age} style={customWidth}
            onChange={(e, index, value) => this.props.getAccountInput({ name: "age", value: value })}
            floatingLabelFixed floatingLabelText="Age"
          >
            <MenuItem value="< 19" primaryText="< 19" />
            <MenuItem value="19-25" primaryText="19-25" />
            <MenuItem value="26-30" primaryText="26-30" />
            <MenuItem value="> 30" primaryText="> 30" />
          </SelectField>
        
          <SelectField
            name="location" value={this.props.location}
            onChange={(e, index, value) => this.props.getAccountInput({ name: "location", value: value })}
            floatingLabelFixed floatingLabelText="Location"
            style={customWidth}
          >
            <MenuItem value="Canada" primaryText="Canada"/>
            <MenuItem value="USA" primaryText="USA" />
            <MenuItem value="Europe" primaryText="Europe" />
            <MenuItem value="Japan" primaryText="Japan" />
          </SelectField>
        </section>

        <section className="gridSelector">
          <SelectField
            name="rank" value={this.props.rank}
            onChange={(e, index, value) => this.props.getAccountInput({ name: "rank", value: value })}
            floatingLabelFixed floatingLabelText="Rank"
            style={customWidth}
          >
            <MenuItem value="C" primaryText="C"/>
            <MenuItem value="B" primaryText="B"/>
            <MenuItem value="A" primaryText="A"/>
            <MenuItem value="S" primaryText="S"/>
            <MenuItem value="S+" primaryText="S+"/>
          </SelectField>

          <SelectField
            name="mode" value={this.props.mode}
            onChange={(e, index, value) => this.props.getAccountInput({ name: "mode", value: value })}
            floatingLabelFixed floatingLabelText="Mode"
            style={customWidth}
          >
            <MenuItem value="Turf War" primaryText="Turf War"/>
            <MenuItem value="League" primaryText="League"/>
            <MenuItem value="Salmon Run" primaryText="Salmon Run"/>
          </SelectField>
        </section>
        
        <section className="gridSelector">
          <SelectField
            name="weapon" value={this.props.weapon}
            onChange={(e, index, value) => this.props.getAccountInput({ name: "weapon", value: value })}
            floatingLabelFixed floatingLabelText="Weapon"
            style={customWidth}
          >
            <MenuItem value="Shooters" primaryText="Shooters"/>
            <MenuItem value="Rollers" primaryText="Rollers"/>
            <MenuItem value="Chargers" primaryText="Chargers"/>
            <MenuItem value="Sloshers" primaryText="Sloshers"/>
            <MenuItem value="Splatlings" primaryText="Splatlings"/>
            <MenuItem value="Dualies" primaryText="Dualies"/>
            <MenuItem value="Brellas" primaryText="Brellas"/>
          </SelectField>

          <SelectField
            name="playstyle" value={this.props.playstyle}
            onChange={(e, index, value) => this.props.getAccountInput({ name: "playstyle", value: value })}
            floatingLabelFixed floatingLabelText="Playstyle"
            style={customWidth}
          >
            <MenuItem value="Casual" primaryText="Casual"/>
            <MenuItem value="Competitive" primaryText="Competitive"/>
          </SelectField>
        </section>

        <section className="grid">
          <p style={messageStyle}>{this.props.verifyMessage}</p>
        </section>
        
        <section className="gridSelector">
          <RaisedButton href="/" overlayStyle={signupButton}>Cancel</RaisedButton>

          <RaisedButton overlayStyle={loginButton}
                  onClick={e => this.createAccount(e)}>
                  Create
          </RaisedButton>
        </section>
        <br />

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.accountReducer.email,
    NSID: state.accountReducer.NSID,
    age: state.accountReducer.age,
    location: state.accountReducer.location,
    rank: state.accountReducer.rank,
    mode: state.accountReducer.mode,
    weapon: state.accountReducer.weapon,
    playstyle: state.accountReducer.playstyle,

    isLoggedIn: state.generalReducer.isLoggedIn,
    verifyMessage: state.generalReducer.verifyMessage,

    username: state.loginReducer.username,
    password: state.loginReducer.password,
    verified: state.loginReducer.verified,
  }
}

//////////
//Styles//
//////////

const fieldWidth = {
  width: '80%'
}

const customWidth = {
  width: 130,
}

const messageStyle = {
  fontFamily: 'overpass',
  fontSize: '1.2rem',
  textAlign: 'center',
  color: 'red',
  marginTop: '1%',
  marginBottom: '2%',
}

const signupButton = {
  width: 150,
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const loginButton = {
  width: 150,
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
}

const subTitle =  {
  fontFamily: 'overpass',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '3%',
  marginBottom: '1%',
}

export default connect(mapStateToProps, actions)(AccountInfo);