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

let squad = [];

class FriendList extends Component {
  
  componentDidMount() {
    axios.post('/search-friends', {
      friendlist: this.props.friendlist,
    })
    .then(result => {
      //Sort the results alphabetically by username.
      let tempFriendList = result.data.list.sort((a,b) => {
        let personA = a.username.toUpperCase();
        let personB = b.username.toUpperCase();
        return (personA < personB) ? -1 : (personA > personB) ? 1 : 0;
      });

      this.props.setTempFriendList(Array.from(tempFriendList));
    })
    .catch(error => {
      console.log("Search Friends Error: " + error);
    })
  }

  notifyMembers = () => {
    axios.post('/check-invite-status', {
      members: this.props.squad,
    })
    .then(result => {
      //Check to see if the person has an invite pending already.
      if (result.data.freeMembers === this.props.squad.length) {  
        axios.put('/send-invites', {
          from: this.props.username,
          notify: true,
          members: this.props.squad,
        })
        .then(results => {
          //Send out invites to each group member.
          this.props.socket.emit('check-invites');

          //Open room for the user.
          this.props.socket.emit('create-room', { username: this.props.username });
        })
        .catch(error => {
          console.log(error);
        })

        //Update user's status
        axios.put('/set-chat-status', {
          username: this.props.username,
          notify: false,
          status: 'Busy'
        })
        .then(result => {
      
        })
        .catch(error => {
          console.log(error);
        })

        this.props.setShowModal(false);
        this.props.getAccountInput({ name: 'status', value: 'Busy' });
        this.props.getAccountInput({ name: 'from', value: this.props.username });
        this.props.setChatting(true);

      }
      else {
        this.props.setNewSearchModal(true);
      }
    })
  }

  addToSquad = (e, isChecked, user) => {
    if (isChecked) {
      squad.push(user);
      this.props.setShowModal(squad.length >= 9 ? true : false);
    }
    else {
      //If the user is clicked on again, remove from list.
      let newSquad = squad.filter((value, i) => {
        return value.username !== user.username;
      })
      squad = Array.from(newSquad);
    }
    this.props.setSquad(Array.from(squad));
  }

  removeFromFriends = (user) => {
    axios.put('/remove-friend', {
      username: this.props.username,
      user: user,
    })
    .then(result => {
      this.props.setFriendModal(true);
      this.props.setFriendMessage(result.data.result);
    })
    .catch(error => {
      console.log("Remove Friend Error: " + error);
    })

    //Remove from current array.
    let friendArray = Array.from(this.props.friendlist.sort());
    let tempList = Array.from(this.props.tempFriendList);

    console.log('FriendArray', friendArray);
    console.log('TempList', tempList);
    for (let i=0; i < friendArray.length; i++) {
      if (user === friendArray[i]) {
        friendArray.splice(i, 1);
        tempList.splice(i, 1);
      }
    }

    this.props.setTempFriendList(Array.from(tempList));
    this.props.getAccountInput({ name: 'friendlist', value: Array.from(friendArray) });
  }

  closeModal = () => {
    this.props.setShowModal(false);
  }

  closeFriendModal = () => {
    this.props.setFriendModal(false);
  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    /* Creating the list of friends to display. */
    let disableButton = (squad.length > 0 && squad.length <= 9) ? false : true;
    
    let results = this.props.tempFriendList.map((value, index) => {  
      return (
        <section key={index}>
        <Card style={cardBackground}>
          <CardHeader
            style={cardStyle}
            titleStyle={cardHeaderText}
            title={value.username}
            textStyle={{paddingRight: '2px'}}
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
                      disabled={(value.status === "Offline") || (value.status === "Busy")}
                      onCheck={(e, isChecked, user) => this.addToSquad(e, isChecked, value)}
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
                  onClick={this.notifyMembers}
      >
        Chat
      </RaisedButton>
    ]               

    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Friends</h1>
        {this.props.tempFriendList.length !== 0 ? 
        (
          <p style={resultsSubText}>Check up to 9 members to start chat</p>
        ) : (
          <p style={resultsSubText}>You don't have anyone in your list</p>
        )
        }
        
        <section className="grid">
          {!disableButton ? (
            <Link to="/chat">
              {actionButtons[1]}
            </Link>
          ) : (
            actionButtons[1]
          )}
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
          You can only have up to 9 members in your group.
        </Dialog>

        { /* Remove Friend Message */ }
        <Snackbar
          open={this.props.friendModal}
          message={this.props.friendMessage}
          autoHideDuration={2000}
          contentStyle={friendModalStyle}
          onRequestClose={this.closeFriendModal}
        />
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

const cancelButton = {
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
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
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
}

const checkboxStyle = {
  fill: 'black',
}

const dialogContent = {
  fontFamily: 'overpass',
  fontSize: '1.3rem',
  textAlign: 'center',
  color: 'red',
}

const friendIconStyle = {
  float: 'right',
  marginRight: '4%'
}

const friendModalStyle = {
  fontFamily: 'overpass',
  fontSize: '1rem',
  textAlign: 'center',
  color: 'white',
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
    squad: state.searchReducer.squad,
    showModal: state.searchReducer.showModal,
    
    username: state.loginReducer.username,

    friendlist: state.accountReducer.friendlist,

    isLoggedIn: state.generalReducer.isLoggedIn,
    tempFriendList: state.generalReducer.tempFriendList,
    friendModal: state.generalReducer.friendModal,
    friendMessage: state.generalReducer.friendMessage,
  };
}

export default connect(mapStateToProps, actions)(FriendList);