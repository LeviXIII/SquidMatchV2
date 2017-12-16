import React, { Component } from 'react';
// import { Input, Button } from 'react-materialize';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

class AccountInfo extends Component {
render() {
  return <h1>Hello!</h1>
}
//   showCreateButton = (e) => {
//     e.preventDefault();
//     this.props.showCreateButton(true);
//   }

//   setupAccount = (e) => {
//     e.preventDefault();
//     if (this.props.username !== '') {
//       if (this.props.password === this.props.verifyPassword &&
//         this.props.password.length >= 8) {
//         this.props.getMatchingPassword(true);
//       }
//       else {
//         this.props.setVerifyMessage("Your password doesn't match or is too short.");
//       }
//     }
//     else {
//       this.props.setVerifyMessage("Please enter a username.") 
//     }
//   }

//   render() {

//     //If passwords match for creating account, go to next page.
//     if (this.props.matchingPassword) {
//      return <Redirect to="/account-info" />
//     }

//     let showLoginButton = <Button style={loginButton} waves='light'>Create Account</Button>;
//     let showSignupButton = <Button style={signupButton} waves='light'
//                               onClick={e => this.showCreateButton(e)}>
//                               Cancel
//                             </Button>
//     let showCreateAccount = <Button style={signupButton} waves='light'
//                               onClick={e => this.setupAccount(e)}>
//                               Create Account
//                             </Button>

//     return (
//       <form className="col s12 container divBorder formSettings">
//         <h1 className="siteTitle">Squid Match</h1>
//         <h4 style={subTitle}>Login to find active players to play with</h4>
//           <div className="row">
//             <Input s={8} m={9} l={9}
//                     label="Email" type="email" validate
//                     name="email" value={this.props.email}
//                     onChange={e => this.props.getAccountInput({
//                       name: e.target.name, value: e.target.value.replace(/ /g, "")
//                     })}>
//             </Input>
      
//             <Input s={8} m={9} l={9} type="password" label="Password" validate
//                     name="password" value={this.props.password}
//                     onChange={e => this.props.getLoginInput({
//                       name: e.target.name, value: e.target.value.replace(/ /g, "")
//                     })}>
//             </Input>

//             {this.props.createButton &&
//             <section>
//               <Input style={passwordField} s={8} m={9} l={9} type="password" label="Password" validate
//                       name="verifyPassword" value={this.props.verifyPassword}
//                       onChange={e => this.props.getLoginInput({
//                         name: e.target.name, value: e.target.value.replace(/ /g, "")
//                       })}>
//               </Input>
//             </section>
//             }

//           </div>
//           <div>
//             <section className="center-align">
//               <p style={messageStyle}>{this.props.verifyMessage}</p>
//             </section>

//             <section className="center-align">
//               {this.props.createButton ? showCreateAccount : showLoginButton}
//               <br />
//               <br />
//             </section>

//             <section className="center-align">
//             {this.props.createButton ? showLoginButton : showSignupButton}
//             </section>
//             <br />
//           </div>
          
//       </form>
//     )
//   }

// }

// //////////
// //Styles//
// //////////

// const messageStyle = {
//   fontFamily: 'overpass',
//   fontSize: '1.2rem',
//   textAlign: 'center',
//   color: 'red',
//   marginTop: '1%',
//   marginBottom: '2%',
// }

// const signupButton = {
//   width: '190px',
//   backgroundColor: '#ff43b7',
//   fontFamily: 'paintball',
//   color: 'black',
// }

// const loginButton = {
//   width: '190px',
//   backgroundColor: '#7aff42',
//   fontFamily: 'paintball',
//   color: 'black',
// }

// const subTitle =  {
//   fontFamily: 'overpass',
//   textAlign: 'center',
//   color: '#948f8f',
//   marginTop: '1%',
//   marginBottom: '1%',
// }

// const passwordField = {
//   marginBottom: '0%',
// }

// const mapStateToProps = (state) => {
//   return {

//     email: state.accountReducer.email,
//     userNSID: state.accountReducer.userNSID,
//     age: state.accountReducer.age,
//     location: state.accountReducer.location,
//     rank: state.accountReducer.rank,
//     mode: state.accountReducer.mode,
//     weapon: state.accountReducer.weapon,

//     username: state.loginReducer.username,
//     password: state.loginReducer.password,
//   }
// }
}
export default AccountInfo
// export default connect(mapStateToProps, actions)(AccountInfo);