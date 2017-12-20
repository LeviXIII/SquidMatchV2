import React, { Component } from 'react';
import { RaisedButton, Checkbox, Card,
        CardHeader, CardText, Avatar, } from 'material-ui';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Results extends Component {

  render() {

    let results = this.props.searchResults.map((value, index) => {
      return (
        <Card>
          <CardHeader
            title={value.username}
            avatar={<Avatar>{value.username[0].toUpperCase()}</Avatar>}
          />
          <CardText>
          <Checkbox />
            Age: {value.age}, &nbsp;
            Location: {value.location}, &nbsp;
            Rank: {value.rank}, &nbsp;
            Mode: {value.mode}, &nbsp;
            Weapon: {value.weapon}
          </CardText>
        </Card>
        // <List>
        //   <ListItem key={index}
        //     primaryText={value.username}
        //     rightCheckbox={<Checkbox />}
        //     leftAvatar={<Avatar>{value.username[0].toUpperCase()}</Avatar>}
        //     secondaryTextLines={2}
        //     secondaryText={
        //       `Age: ${value.age} /n
        //       Location: ${value.location} /n
        //       Rank: ${value.rank}
        //       Mode: ${value.mode} 
        //       Weapon: ${value.weapon}` 
        //     }
        //   />
        //   <Divider />
        // </List>
      );
    })

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section>
        <section className="container divBorder formSettings">
          <h1 style={subTitle}>Results</h1>
        </section>

        <section className="container divBorder formSettings">
          {results}
        </section>
      </section>
    )
  }

}

//////////
//Styles//
//////////

const subTitle =  {
  fontFamily: 'paintball',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '3%',
  marginBottom: '1%',
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchReducer.searchResults,

    isLoggedIn: state.generalReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps, actions)(Results);