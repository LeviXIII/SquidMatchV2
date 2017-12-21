import React, { Component } from 'react';
import { RaisedButton, Checkbox, Card,
        CardHeader, CardText, Avatar,
        Dialog, } from 'material-ui';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

import background from '../images/cardPaintBackground.jpg'

let squad = [];

class Results extends Component {

  addToSquad = (isChecked, user) => {
    if (isChecked) {
      squad.push(user);
    }
    else {
      let newSquad = squad.filter((value, i) => {
        return value.username !== user.username;
      })
      squad = Array.from(newSquad);
    }
    this.props.setSquad(Array.from(squad));
    
    console.log(squad);
  }

  render() {

    let disableButton = (squad.length > 0 && squad.length <= 3) ? false : true;
    let openModal = squad.length > 3 ? true : false;

    let results = this.props.searchResults.map((value, index) => {
      return (
        <section>
        <Card style={cardBackground}>
          <CardHeader
            style={cardStyle}
            titleStyle={cardHeaderText}
            title={value.username}
            avatar={<Avatar>{value.username[0].toUpperCase()}</Avatar>}
          />
          <CardText>
            <Checkbox label={<p style={cardText}>Age: {value.age} <br />
                        Location: {value.location} <br />
                        Rank: {value.rank} <br />
                        Mode: {value.mode} <br />
                        Weapon: {value.weapon}
                      </p>}
                      iconStyle={checkboxStyle}
                      onCheck={(e, isChecked, user) => this.addToSquad(isChecked, value)}
            />
          </CardText>
        </Card>
        <br />
        </section>
      );
    })

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Results</h1>
        <br />
        <section className="grid">
          <RaisedButton buttonStyle={chatButton}
                        backgroundColor='#7aff42'
                        disabledBackgroundColor='#bcbcbc'
                        disabled={disableButton}
          >
            Chat
          </RaisedButton>
        </section>
        <br />
        {results}
        <Dialog
          title="Member Limit Reached"
          titleStyle={subTitle}
          bodyStyle={dialogContent}
          //actions={actions}
          modal={false}
          open={openModal}
          //onRequestClose={this.handleClose}
        >
          You can only have up to 3 members in your group.
        </Dialog>
      </section>
    )
  }

}

//////////
//Styles//
//////////

const checkboxStyle = {
  fill: 'black',
}

const cardStyle = {
  fontFamily: 'paintball',
  paddingTop: '16px',
  paddingLeft: '16px',
  paddingRight: '0px',
  paddingBottom: '0px',
}

const cardBackground = {
  backgroundImage: `url(${background})`,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backgroundBlendMode: 'lighten',
}

const cardHeaderText = {
  fontSize: '1.3rem',
}

const cardText = {
  fontFamily: 'overpass',
  fontSize: '1.1rem',
  marginTop: '0px',
}

const chatButton = {
  width: '190px',
  fontFamily: 'paintball',
  color: 'black',
}

const dialogContent = {
  fontFamily: 'overpass',
  fontSize: '1.3rem',
  textAlign: 'center',
  color: 'red',
}

const subTitle =  {
  fontFamily: 'paintball',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '1%',
  marginBottom: '1%',
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchReducer.searchResults,
    squad: state.searchReducer.squad,

    isLoggedIn: state.generalReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps, actions)(Results);