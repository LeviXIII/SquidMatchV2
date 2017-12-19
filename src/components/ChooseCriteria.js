import React, { Component } from 'react';
import { TextField, RaisedButton, SelectField, 
        MenuItem } from 'material-ui';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ChooseCriteria extends Component {

  render() {

    if (!this.props.isLoggedIn) {
      //return <Redirect to='/' />
    }
    console.log(this.props.isLoggedIn);
    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Choose Your Criteria</h1>
        
        <section className="grid">
          <SelectField
            value={this.props.searchAge} style={customWidth}
            onChange={(e, index, value) => this.props.setSearchInput({ name: "searchAge", value: value })}
            floatingLabelFixed floatingLabelText="Age"
          >
            <MenuItem value="Any" primaryText="Any" />
            <MenuItem value="< 19" primaryText="< 19" />
            <MenuItem value="19-25" primaryText="19-25" />
            <MenuItem value="26-30" primaryText="26-30" />
            <MenuItem value="> 30" primaryText="> 30" />
          </SelectField>
        </section>
        
        <section className="grid">
          <SelectField
            name="location" value={this.props.searchLocation}
            onChange={(e, index, value) => this.props.setSearchInput({ name: "searchLocation", value: value })}
            floatingLabelFixed floatingLabelText="Location"
            style={customWidth}
          >
            <MenuItem value="Any" primaryText="Any" />
            <MenuItem value="Canada" primaryText="Canada"/>
            <MenuItem value="USA" primaryText="USA" />
            <MenuItem value="Europe" primaryText="Europe" />
            <MenuItem value="Japan" primaryText="Japan" />
          </SelectField>
        </section>

        <section className="grid">
          <SelectField
            name="rank" value={this.props.searchRank}
            onChange={(e, index, value) => this.props.setSearchInput({ name: "searchRank", value: value })}
            floatingLabelFixed floatingLabelText="Rank"
            style={customWidth}
          >
            <MenuItem value="Any" primaryText="Any" />
            <MenuItem value="C" primaryText="C"/>
            <MenuItem value="B" primaryText="B"/>
            <MenuItem value="A" primaryText="A"/>
            <MenuItem value="S" primaryText="S"/>
            <MenuItem value="S+" primaryText="S+"/>
          </SelectField>
        </section>

        <section className="grid">
          <SelectField
            name="mode" value={this.props.searchMode}
            onChange={(e, index, value) => this.props.setSearchInput({ name: "searchMode", value: value })}
            floatingLabelFixed floatingLabelText="Mode"
            style={customWidth}
          >
            <MenuItem value="Any" primaryText="Any" />
            <MenuItem value="Turf War" primaryText="Turf War"/>
            <MenuItem value="League" primaryText="League"/>
            <MenuItem value="Salmon Run" primaryText="Salmon Run"/>
          </SelectField>
        </section>
        
        <section className="gridSelector">
          <SelectField
            name="weapon" value={this.props.searchWeapon}
            onChange={(e, index, value) => this.props.setSearchInput({ name: "searchWeapon", value: value })}
            floatingLabelFixed floatingLabelText="Weapon"
            style={customWidth}
          >
            <MenuItem value="Any" primaryText="Any" />
            <MenuItem value="Shooters" primaryText="Shooters"/>
            <MenuItem value="Rollers" primaryText="Rollers"/>
            <MenuItem value="Chargers" primaryText="Chargers"/>
            <MenuItem value="Sloshers" primaryText="Sloshers"/>
            <MenuItem value="Splatlings" primaryText="Splatlings"/>
            <MenuItem value="Dualies" primaryText="Dualies"/>
            <MenuItem value="Brellas" primaryText="Brellas"/>
          </SelectField>
        </section>
        <br />

        <section className="grid">
        <RaisedButton overlayStyle={loginButton}>
          Search
        </RaisedButton>
        </section>
        <br />

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchAge: state.searchReducer.searchAge,
    searchLocation: state.searchReducer.searchLocation,
    searchRank: state.searchReducer.searchRank,
    searchMode: state.searchReducer.searchMode,
    searchWeapon: state.searchReducer.searchWeapon,

    isLoggedIn: state.generalReducer.isLoggedIn,
  }
}

//////////
//Styles//
//////////

const fieldWidth = {
  width: '80%'
}

const customWidth = {
  width: 250,
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
  fontFamily: 'paintball',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '3%',
  marginBottom: '1%',
}

export default connect(mapStateToProps, actions)(ChooseCriteria);