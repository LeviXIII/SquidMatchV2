const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create blueprint
const FriendsSchema = new Schema({
  username: { type: String, unique: true, required: true },
})

//Create model
const FriendsModel = mongoose.model('Friends', FriendsSchema);

//Export
module.exports = FriendsModel;