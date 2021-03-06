const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create blueprint
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  NSID: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  rank: { type: String, required: true },
  mode: { type: String, required: true },
  weapon: { type: String, required: true },
  playstyle: { type: String, required: true },
  status: { type: String, required: true },
  time: { type: Date, required: true },
  notification: { 
      notify: { type: Boolean, required: true },
      from: { type: String, required: false }
  },
  friendlist: [{ type: String, required: false }],
  avatar: { type: String, required: false },
})

//Create the model
const UserModel = mongoose.model('User', UserSchema);

//Export the model
module.exports = UserModel