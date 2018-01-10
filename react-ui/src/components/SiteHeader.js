import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, 
          Avatar, IconMenu, MenuItem,
          IconButton, ToolbarTitle, Divider,
          Badge,  } from 'material-ui';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';


import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Invite from 'material-ui/svg-icons/social/notifications';

class SiteHeader extends Component {
  
  componentDidMount() {
    window.addEventListener("resize", () => this.props.setWindowSize(window.innerWidth));
    window.addEventListener("beforeunload", () => this.props.logout());
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

  render() {
    return (
      <section className="header">
        <h1 className="siteTitle"><Link to="/choose-criteria">Squid Match</Link></h1>
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
                <Link style={miniMenu} to="/news">
                  <MenuItem primaryText="News" />
                </Link>
                <Link style={miniMenu} to="/friend-list">
                  <MenuItem primaryText="Friend List" />
                </Link>
              </IconMenu>
            </section>
          ) : (
          <ToolbarGroup style={toolbarStyle}>
            <Link to="/choose-criteria">
              <FlatButton style={menuItems} label="Find Squad" />
            </Link>
            <Link to="/news">
              <FlatButton style={menuItems} label="News" />
            </Link>
            <Link to="/friend-list">
              <FlatButton style={menuItems} label="Friend List" />
            </Link>
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
              <MenuItem primaryText="Logout" onClick={this.props.logout}/>
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
    windowSize: state.generalReducer.windowSize,
  }
}

export default connect(mapStateToProps, actions)(SiteHeader);
