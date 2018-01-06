const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create blueprint
const MessagesSchema = new Schema({
  users: [{ type: String, required: true }],
  messages: [{
    sender: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Date, required: true }
  }]
})

//Create model
const MessagesModel = mongoose.model('Messages', MessagesSchema);

//Export it
module.exports = MessagesModel;