import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, 
          Avatar, IconMenu, MenuItem,
          IconButton, ToolbarTitle, Divider } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import { connect } from 'react-redux';
import * as actions from '../actions';

class SiteHeader extends Component {
  
  componentDidMount() {
    window.addEventListener("resize", () => this.props.setWindowSize(window.innerWidth));
  }

  render() {
    return (
      <section className="header">
        <h1 className="siteTitle"><Link to="/home">Squid Match</Link></h1>
        <p style={subTitle}>Find active players to play with in Splatoon 2</p>
        <Toolbar style={{ backgroundColor: 'rgba(0,0,0,0)'}}>
          {this.props.windowSize <= 768 ? (
            <section>
              <IconMenu
                iconButtonElement={<IconButton><MenuIcon color='white' /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <Link style={miniMenu} to="/"><MenuItem primaryText="Find Squad" /></Link>
                <MenuItem primaryText="News" />
                <MenuItem primaryText="Friend List" />
                <MenuItem primaryText="Help" />
              </IconMenu>
            </section>
          ) : (
          <ToolbarGroup style={toolbarStyle}>
            <Link to="/"><FlatButton style={menuItems} label="Find Squad" /></Link>
            <Link to="#"><FlatButton style={menuItems} label="News" /></Link>
            <Link to="#"><FlatButton style={menuItems} label="Friend List" /></Link>
            <Link to="#"><FlatButton style={menuItems} label="Help" /></Link>
          </ToolbarGroup>
          )}

          <ToolbarGroup>
            <ToolbarTitle style={statusStyle} text={this.props.status} />
            <IconMenu
                iconButtonElement={<Avatar>L</Avatar>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <Link style={miniMenu} to="/"><MenuItem primaryText="Available" /></Link>
                <MenuItem primaryText="Busy" />
                <Divider />
                <MenuItem primaryText="Update Account" />
                <MenuItem primaryText="Logout" />
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
    status: state.accountReducer.status,
    windowSize: state.accountReducer.windowSize
  }
}

export default connect(mapStateToProps, actions)(SiteHeader);
