import React, { Component } from 'react';
import { TextField, Grid, Button, Input,
          InputLabel, Select, MenuItem,
          FormControl,
        } from 'material-ui';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AccountInfo extends Component {
  
  showCreateButton = (e) => {
    e.preventDefault();
  }

  render() {

    return (
      <form className="container divBorder formSettings">
        <h1 style={subTitle}>Create Account</h1>
        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <TextField fullWidth label="Email"
                    name="email" type="email" value={this.props.email}
                    placeholder="email@mail.com"
                    onChange={e => this.props.getAccountInput({
                      name: e.target.name, value: e.target.value.replace(/ /g, "")
                    })}
              >
            </TextField>
          </Grid>
        </Grid>
      
        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField fullWidth type="text" label="NSID"
                  name="NSID" value={this.props.NSID}
                  placeholder="1234-5678-9012" helperText="Please include the dashes ( - )"
                  onChange={e => this.props.getAccountInput({
                    name: e.target.name, value: e.target.value.replace(/ /g, "")
                  })}
          >
          </TextField>
          </Grid>
        </Grid>

        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <FormControl>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Select
                name="age" value={this.props.age}
                onChange={e => this.props.getAccountInput({name: e.target.name, value: e.target.value })}
                input={<Input id="age" />}
                style={customWidth}
              >
                <MenuItem value="< 19">{'< '}19</MenuItem>
                <MenuItem value="19-25">19-25</MenuItem>
                <MenuItem value="26-30">26-30</MenuItem>
                <MenuItem value="> 30">{"> "}30</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <FormControl>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
                name="location" value={this.props.location}
                onChange={e => this.props.getAccountInput({ name: e.target.name, value: e.target.value })}
                input={<Input id="location" />}
                style={customWidth}
              >
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Japan">Japan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <FormControl>
              <InputLabel htmlFor="rank">Rank</InputLabel>
              <Select
                name="rank" value={this.props.rank}
                onChange={e => this.props.getAccountInput({ name: e.target.name, value: e.target.value })}
                input={<Input id="rank" />}
                style={customWidth}
              >
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="S+">S+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <FormControl>
              <InputLabel htmlFor="mode">Mode</InputLabel>
              <Select
                name="mode" value={this.props.mode}
                onChange={e => this.props.getAccountInput({ name: e.target.name, value: e.target.value })}
                input={<Input id="mode" />}
                style={customWidth}
              >
                <MenuItem value="Turf War">Turf War</MenuItem>
                <MenuItem value="League">League</MenuItem>
                <MenuItem value="Salmon Run">Salmon Run</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid justify="center" container spacing={16}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <FormControl>
              <InputLabel htmlFor="weapon">Weapon</InputLabel>
              <Select
                name="weapon" value={this.props.weapon}
                onChange={e => this.props.getAccountInput({ name: e.target.name, value: e.target.value })}
                input={<Input id="weapon" />}
                style={customWidth}
              >
                <MenuItem value="Shooters">Shooters</MenuItem>
                <MenuItem value="Rollers">Rollers</MenuItem>
                <MenuItem value="Chargers">Chargers</MenuItem>
                <MenuItem value="Sloshers">Sloshers</MenuItem>
                <MenuItem value="Splatlings">Splatlings</MenuItem>
                <MenuItem value="Dualies">Dualies</MenuItem>
                <MenuItem value="Brellas">Brellas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid justify="center" container spacing={16}>
          <Button href="/" raised style={signupButton}>
                  Cancel
          </Button>

          <Button raised style={loginButton}
                  onClick={e => this.showCreateButton(e)}>
                  Create
          </Button>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.accountReducer.email,
    NSID: state.accountReducer.userNSID,
    age: state.accountReducer.age,
    location: state.accountReducer.location,
    rank: state.accountReducer.rank,
    mode: state.accountReducer.mode,
    weapon: state.accountReducer.weapon,

    username: state.loginReducer.username,
    password: state.loginReducer.password,
  }
}

//////////
//Styles//
//////////

const customWidth = {
  width: 200,
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
  marginTop: '5%',
  marginBottom: '5%',
  marginRight: '5%'
}

const loginButton = {
  width: 150,
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
  marginTop: '5%',
  marginBottom: '5%',
}

const subTitle =  {
  fontFamily: 'overpass',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '1%',
  marginBottom: '1%',
}

export default connect(mapStateToProps, actions)(AccountInfo);