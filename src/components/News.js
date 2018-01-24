import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as actions from '../actions';

let league = [];
let regular = [];
let ranked = [];

class News extends Component {

  componentDidMount() {
    //Gets info about current stages.
    axios.get('/get-news')
    .then(result => {
      league = result.data.league;
      regular = result.data.regular;
      ranked = result.data.ranked;
    })
    .catch(error => {
      console.log("Get News Error: " + error);
    })
  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section>
        <section className="container divBorder formSettings">
          <h1 style={subTitle}>Stages</h1>
          <p style={timeFont}>{moment.unix(regular[3]).format('LT')} - {moment.unix(regular[4]).format('LT')}</p>
          <h3 style={stageFont}>Turf War</h3>
          <section className="gridSelector">
            <p style={modeFont}>{regular[0]}</p>
            <p style={modeFont}>{regular[1]}</p>
          </section>

          <h3 style={stageFont}>Ranked Battle</h3>
          <section className="gridSelector">
            <p style={modeFont}>{ranked[0]}</p>
            <p style={modeFont}>{ranked[1]}</p>
          </section>

          <h3 style={stageFont}>League Battle</h3>
          <section className="gridSelector">
            <p style={modeFont}>{league[0]}</p>
            <p style={modeFont}>{league[1]}</p>
          </section>

        </section>

        <section className="container divBorder formSettings">
        <h1 style={subTitle}>Site Updates</h1>
        <ul style={updateFont}>
          <li>
            Fixed bug that didn't log you out if you leave the page
            while chatting.
          </li>
          <li>
            Fixed bug that allowed for duplicate emails and usernames.
          </li>
          <li>
            Refreshing page fix and username/password recovery incoming.
          </li>
        </ul>
        </section>
      </section>
    )
  }

}

//////////
//Styles//
//////////

const modeFont = {
  fontFamily: 'paintball',
  textAlign: 'center',
}

const stageFont = {
  fontFamily: 'overpass',
  textAlign: 'center',
}

const subTitle = {
  fontFamily: 'paintball',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '1%',
  marginBottom: '1%',
}

const timeFont = {
  fontFamily: 'overpass',
  textAlign: 'center',
  marginTop: '1%',
  marginBottom: '1%',
}

const updateFont = {
  fontFamily: 'overpass',
}

const mapStateToProps = (state) => {
  return { 
    username: state.loginReducer.username,

    isLoggedIn: state.generalReducer.isLoggedIn,
  }
}

export default connect(mapStateToProps, actions)(News);
