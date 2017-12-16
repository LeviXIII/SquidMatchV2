import React, { Component } from 'react';
import { TextField, Grid, Button } from 'material-ui';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AccountInfo extends Component {
  render() {
    return (
      <form className="container divBorder formSettings">
      <h1 style={subTitle}>Create Account</h1>
        <Grid justify="center" container spacing={16}>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <TextField fullWidth label="Email" validate
                    name="email" type="email" value={this.props.email} placeholder="email@mail.com"
                    onChange={e => this.props.getAccountInput({
                      name: e.target.name, value: e.target.value.replace(/ /g, "")
                    })}>
            </TextField>
          </Grid>
        </Grid>
      
        <Grid justify="center" container spacing={16}>
          <Grid item xs={11} sm={11} md={11} lg={11}>
          <TextField fullWidth type="text" label="NSID"
                  validate name="NSID" value={this.props.NSID} placeholder="1234-5678-9012"
                  onChange={e => this.props.getAccountInput({
                    name: e.target.name, value: e.target.value.replace(/ /g, "")
                  })}>
          </TextField>
          </Grid>
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

const messageStyle = {
  fontFamily: 'overpass',
  fontSize: '1.2rem',
  textAlign: 'center',
  color: 'red',
  marginTop: '1%',
  marginBottom: '2%',
}

const signupButton = {
  width: '190px',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const loginButton = {
  width: '190px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
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