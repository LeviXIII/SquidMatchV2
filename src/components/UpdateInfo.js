import React, { Component } from 'react';
import { TextField, RaisedButton, SelectField, 
        MenuItem } from 'material-ui';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UpdateInfo extends Component {
  
  componentWillMount() {
    axios.get('/current-profile/' + this.props.username)
    .then(result => {
      this.props.getAccountInput({ name: "NSID", value: result.data.NSID });
      this.props.getAccountInput({ name: "age", value: result.data.age });
      this.props.getAccountInput({ name: "location", value: result.data.location });
      this.props.getAccountInput({ name: "rank", value: result.data.rank });
      this.props.getAccountInput({ name: "mode", value: result.data.mode });
      this.props.getAccountInput({ name: "weapon", value: result.data.weapon });
      this.props.getAccountInput({ name: "playstyle", value: result.data.playstyle });
    })
    .catch(error => {
      console.log("Current Profile error: " + error);
    })
  }

  updateProfile = () => {
    //Check email and NSID for validity
    if (/^\d{4}-\d{4}-\d{4}$/g.test(this.props.NSID)) {
      axios.put('/update-profile', {
        username: this.props.username,
        NSID: this.props.NSID,
        age: this.props.age,
        location: this.props.location,
        rank: this.props.rank,
        mode: this.props.mode,
        weapon: this.props.weapon,
        playstyle: this.props.playstyle,
      })
      .then(result => {
        this.props.setUpdateModal(true);
      })
      .catch(error => {
        console.log(error);
      })
    }
    else {
      this.props.setVerifyMessage('Please enter a correct NSID.');
    }
  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section className="container divBorder loginFormSettings">
        <h1 style={subTitle}>Update Profile</h1>
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
            value={this.props.age} style={customWidth}
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
          <Link to="/choose-criteria">
            <RaisedButton overlayStyle={signupButton}>
              Cancel
            </RaisedButton>
          </Link>
          
          <Link to="/choose-criteria">
            <RaisedButton overlayStyle={loginButton}
                    onClick={this.updateProfile}
            >
              Update
            </RaisedButton>
          </Link>
        </section>
        <br />

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    NSID: state.accountReducer.NSID,
    age: state.accountReducer.age,
    location: state.accountReducer.location,
    rank: state.accountReducer.rank,
    mode: state.accountReducer.mode,
    weapon: state.accountReducer.weapon,
    playstyle: state.accountReducer.playstyle,

    isLoggedIn: state.generalReducer.isLoggedIn,
    updateModal: state.generalReducer.updateModal,
    verifyMessage: state.generalReducer.verifyMessage,

    username: state.loginReducer.username,
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

export default connect(mapStateToProps, actions)(UpdateInfo);