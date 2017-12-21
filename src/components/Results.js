import React, { Component } from 'react';
import { RaisedButton, Checkbox, Card,
        CardHeader, CardText, Avatar,
        Dialog, } from 'material-ui';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

import background from '../images/cardPaintBackground.jpg'

let squad;

class Results extends Component {

  componentWillMount() {
    squad = [];
  }

  closeModal = () => {
    this.props.setShowModal(false);
  }

  addToSquad = (isChecked, user) => {
    if (isChecked) {
      squad.push(user);
      this.props.setShowModal(squad.length >= 3 ? true : false);
    }
    else {
      //If the user is clicked on again, remove from list.
      let newSquad = squad.filter((value, i) => {
        return value.username !== user.username;
      })
      squad = Array.from(newSquad);
      
    }
    this.props.setSquad(Array.from(squad));
    
    console.log(squad);
    
  }

  render() {

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    let disableButton = (squad.length > 0 && squad.length <= 3) ? false : true;

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

    const actionButtons = [
      <RaisedButton buttonStyle={cancelButton}
                    backgroundColor='#ff43b7'
                    onClick={this.closeModal}>
        Cancel
      </RaisedButton>,
      <RaisedButton buttonStyle={chatButton}
                    backgroundColor='#7aff42'
                    disabledBackgroundColor='#bcbcbc'
                    disabled={disableButton}
      >
        Chat
      </RaisedButton>
    ]

    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Results</h1>
        {this.props.searchResults !== 0 &&
          <p style={resultsSubText}>Choose up to 3 members</p>
        }
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
          actions={actionButtons}
          actionsContainerStyle={actionButtonStyle}
          modal={false}
          open={this.props.showModal}
          onRequestClose={this.closeModal}
        >
          You can only have up to 3 members in your group.
        </Dialog>
      </section>
    )
  }

  componentWillUnmount() {
    squad = [];
  }

}

//////////
//Styles//
//////////

const actionButtonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingBottom: '20px'
}

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

const cancelButton = {
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
}

const chatButton = {
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
}

const dialogContent = {
  fontFamily: 'overpass',
  fontSize: '1.3rem',
  textAlign: 'center',
  color: 'red',
}

const resultsSubText =  {
  fontFamily: 'overpass',
  fontSize: '1.0rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '1%',
  marginBottom: '1%',
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
    showModal: state.searchReducer.showModal,

    isLoggedIn: state.generalReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps, actions)(Results);