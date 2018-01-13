import React, { Component } from 'react';
import { TextField, RaisedButton, SelectField, 
        MenuItem } from 'material-ui';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ChooseCriteria extends Component {

  searchUsers = () => {
    axios.post('/search-criteria', {
      username: this.props.username,
      searchAge: this.props.searchAge,
      searchLocation: this.props.searchLocation,
      searchRank: this.props.searchRank,
      searchMode: this.props.searchMode,
      searchWeapon: this.props.searchWeapon,
      searchPlaystyle: this.props.searchPlaystyle,
      searchScreenName: this.props.searchScreenName,
    })
    .then(result => {
      this.props.setSearchResults(result.data.result);
    })
    .catch(error => {
      console.log(error);
    })

  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Choose Your Criteria</h1>
        
        <section className="grid">
          <TextField style={fieldWidth} floatingLabelText="Screen Name" floatingLabelFixed
                      name="searchScreenName" value={this.props.searchScreenName}
                      onChange={e => this.props.setSearchInput({
                        name: "searchScreenName", value: e.target.value.replace(/ /g, "")
                      })}>
          </TextField>
        </section>

        <section className="gridSelector">
          <SelectField
            name="searchAge"
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

          <SelectField
            name="searchLocation" value={this.props.searchLocation}
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

        <section className="gridSelector">
          <SelectField
            name="searchRank" value={this.props.searchRank}
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
        
          <SelectField
            name="searchMode" value={this.props.searchMode}
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
            name="searchWeapon" value={this.props.searchWeapon}
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
        
          <SelectField
            name="searchPlaystyle" value={this.props.searchPlaystyle}
            onChange={(e, index, value) => this.props.setSearchInput({ name: "searchPlaystyle", value: value })}
            floatingLabelFixed floatingLabelText="Playstyle"
            style={customWidth}
          >
            <MenuItem value="Any" primaryText="Any"/>
            <MenuItem value="Casual" primaryText="Casual"/>
            <MenuItem value="Competitive" primaryText="Competitive"/>
          </SelectField>
        </section>
        <br />

        <section className="grid">
          { /* If availability is set to busy, can't search */ }
          {this.props.status === 'Busy' ? (
            <section>
              <section className="grid">
                <RaisedButton buttonStyle={searchButton} onClick={this.searchUsers}
                              backgroundColor='#7aff42'
                              disabledBackgroundColor='#bcbcbc' disabled={true}
                >
                  Search
                </RaisedButton>
              </section>
              
              <section className="grid">
                <p style={messageStyle}>Please set your status to "Available"</p>
              </section>
            </section>

          ) : (
            <Link to="/results">
              <RaisedButton buttonStyle={searchButton} backgroundColor='#7aff42'
                            onClick={this.searchUsers}>
                Search
              </RaisedButton>
            </Link>
          )}
        </section>

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
    searchPlaystyle: state.searchReducer.searchPlaystyle,
    searchScreenName: state.searchReducer.searchScreenName,

    isLoggedIn: state.generalReducer.isLoggedIn,

    status: state.accountReducer.status,

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

const searchButton = {
  width: 150,
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