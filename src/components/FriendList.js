import React, { Component } from 'react';
import { RaisedButton, Checkbox, Card,
        CardHeader, CardText, CardActions,
        Avatar, Dialog, IconButton,
        Snackbar, } from 'material-ui';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RemoveFriend from 'material-ui/svg-icons/content/remove-circle';

import background from '../images/cardPaintBackground.jpg'

let tempFriendList = [];

class FriendList extends Component {
  
  componentWillMount() {
    /*
    DONE 1. Load the username's friend list from db
    using axios.get.
    DONE 2. Sort the list alphabetically.
    DONE 3. Disable "Busy" people by disabling card.
    4. Allow up to 10 members in a room (8 players 2 spectators).
    */
    axios.post('/search-friends', {
      friendlist: this.props.friendlist
    })
    .then(result => {
      //Sort the results alphabetically by username.
      tempFriendList = result.data.list.sort((a,b) => {
        let personA = a.username.toUpperCase();
        let personB = b.username.toUpperCase();
        return (personA < personB) ? -1 : (personA > personB) ? 1 : 0;
      });
    })
    .catch(error => {
      console.log("Search Friends Error: " + error);
    })
  }

  removeFromFriends = (user) => {

  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    /* Creating the list of friends to display. */
    //let disableButton = (squad.length > 0 && squad.length <= 9) ? false : true;

    let results = tempFriendList.map((value, index) => {
      return (
        <section key={index}>
        <Card style={cardBackground}>
          <CardHeader
            style={cardStyle}
            titleStyle={cardHeaderText}
            title={value.username}
            avatar={<Avatar>{value.username[0].toUpperCase()}</Avatar>}
          >
            <section style={friendIconStyle}>
              <IconButton tooltip="Remove from Friendlist"
                          onClick={() => this.removeFromFriends(value.username)}    
              >
                <RemoveFriend />
              </IconButton>
            </section>
          </CardHeader>
          <CardText>
            <Checkbox label={<p style={cardText}>
                        Age: {value.age} <br />
                        Location: {value.location} <br />
                        Rank: {value.rank} <br />
                        Mode: {value.mode} <br />
                        Weapon: {value.weapon} <br />
                        Playstyle: {value.playstyle} <br />
                        Status: {value.status}
                      </p>}
                      iconStyle={checkboxStyle}
                      disabled={value.status === "Offline"}
                      //onCheck={(e, isChecked, user) => this.addToSquad(isChecked, value)}
            />
          </CardText>
        </Card>
        <br />
        </section>
      );
    })


    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Results</h1>
        {tempFriendList.length !== 0 ? 
        (
          <p style={resultsSubText}>Check up to 9 members to start chat</p>
        ) : (
          <p style={resultsSubText}>You don't have anyone in your list</p>
        )
        }
        <section className="grid">
          <Link to="/chat">
            <RaisedButton buttonStyle={chatButton}
                        backgroundColor='#7aff42'
                        disabledBackgroundColor='#bcbcbc'
                        //disabled={disableButton}
                        //onClick={this.notifyMembers}
            >
              Chat
            </RaisedButton>
          </Link>
        </section>
        <br />
        {results}
      </section>
    )
  }

}

//////////
//Styles//
//////////

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
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
}

const checkboxStyle = {
  fill: 'black',
}

const friendIconStyle = {
  float: 'right',
  marginRight: '4%'
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
    username: state.loginReducer.username,

    friendlist: state.accountReducer.friendlist,

    isLoggedIn: state.generalReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps, actions)(FriendList);