import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, 
          Avatar, IconMenu, MenuItem,
          IconButton, ToolbarTitle, Divider,
          Badge,  } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Invite from 'material-ui/svg-icons/social/notifications';

import axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../actions';

class SiteHeader extends Component {
  
  componentWillMount() {
    window.addEventListener("resize", () => this.props.setWindowSize(window.innerWidth));
  }

  showInviteModal = () => {
    this.props.setInviteModal(true);
  }

  updateStatus = (status) => {
    axios.put('/update-status', { 
      username: this.props.username,
      status: status,
    })
    .then(result => {
      this.props.getAccountInput({ name: 'status', value: result.data.status });
    })
  }

  logout = (e) => {
    axios.put('/logout', {
      username: this.props.username     
    })
    .then(result => {
      
    })
    .catch(error => {
      console.log(error);
    })

    this.props.setInitialAccountState();
    this.props.setInitialLoginState();
    this.props.setInitialSearchState();
    this.props.setInitialGeneralState();
    this.props.setLoggedIn(false);
    localStorage.removeItem('token');
    
  }

  render() {
    console.log(this.props.notify);
    return (
      <section className="header">
        <h1 className="siteTitle"><Link to="/home">Squid Match</Link></h1>
        <p style={subTitle}>Find active players to play with in Splatoon 2</p>
        <Toolbar style={{ backgroundColor: 'rgba(0,0,0,0)'}}>
          {this.props.windowSize <= 640 ? (
            <section>
              <IconMenu
                iconButtonElement={<IconButton><MenuIcon color='white' /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <Link style={miniMenu} to="/choose-criteria">
                  <MenuItem primaryText="Find Squad" />
                </Link>
                <MenuItem primaryText="News" />
                <MenuItem primaryText="Friend List" />
                <MenuItem primaryText="Help" />
              </IconMenu>
            </section>
          ) : (
          <ToolbarGroup style={toolbarStyle}>
            <Link to="/choose-criteria"><FlatButton style={menuItems} label="Find Squad" /></Link>
            <Link to="#"><FlatButton style={menuItems} label="News" /></Link>
            <Link to="#"><FlatButton style={menuItems} label="Friend List" /></Link>
            <Link to="#"><FlatButton style={menuItems} label="Help" /></Link>
          </ToolbarGroup>
          )}

          <ToolbarGroup>
            <ToolbarTitle style={statusStyle} text={this.props.status} />
            <IconMenu
              iconButtonElement={
                this.props.notify ? (
                <Badge
                  badgeStyle={{top: '15px', right: '15px'}}
                  badgeContent={
                    <IconButton tooltip="Invite Pending">
                      <Invite color="black" />
                    </IconButton>}
                >
                  <Avatar style={avatarLetterBadge}>
                    {this.props.username[0].toUpperCase()}
                  </Avatar>
                </Badge>
                ) : (
                  <Avatar style={avatarLetter}>
                    {this.props.username[0].toUpperCase()}
                  </Avatar>
                )
              }
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Available" disabled={this.props.isChatting} 
                onClick={(status) => this.updateStatus('Available')}/>
              <MenuItem primaryText="Busy" disabled={this.props.isChatting}
                onClick={(status) => this.updateStatus('Busy')}/>
              <Divider />
              {this.props.notify &&
                <MenuItem primaryText="Check Invite" onClick={this.showInviteModal} />  
              }
              <Link style={miniMenu} to="/update-info">
                <MenuItem primaryText="Update Profile" />
              </Link>
              <MenuItem primaryText="Logout" onClick={e => this.logout(e)}/>
            </IconMenu>
          </ToolbarGroup>
          
        </Toolbar>
      </section>
    )
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.props.setWindowSize(window.innerWidth));
  }

}

//////////
//Styles//
//////////

const avatarLetter = {
  fontFamily: 'overpass',
}

const avatarLetterBadge = {
  fontFamily: 'overpass',
  marginBottom: '15px',
}

const miniMenu = {
  textDecoration: 'none'
}

const statusStyle = {
  fontFamily: 'overpass',
  fontSize: '1rem',
  textAlign: 'center',
  color: 'gainsboro',
}

const toolbarStyle = {
  maxWidth: '100%',
  overflow: "auto"
}

const menuItems = {
  fontFamily: 'overpass',
  textAlign: 'center',
  color: 'gainsboro',
  width: 150,
}

const subTitle = {
  fontFamily: 'overpass',
  textAlign: 'center',
  color: 'gainsboro',
  paddingLeft: '2%',
  paddingRight: '2%',
  marginTop: '0%',
  marginBottom: '0%'
}

const style = Object.assign({}, miniMenu);

const mapStateToProps = (state) => {
  return { 
    username: state.loginReducer.username,

    status: state.accountReducer.status,
    notify: state.accountReducer.notify,

    isChatting: state.generalReducer.isChatting,
    windowSize: state.generalReducer.windowSize
  }
}

export default connect(mapStateToProps, actions)(SiteHeader);
