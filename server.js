/**********************IMPORTS**************************************/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./config.js');

const User = require('./models/User');
const Friends = require('./models/Friends');

const PORT = process.env.PORT || 8080;
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/data/db';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;
const secretKey = config.token_secretKey;

/******************************************************************/

/*************************CONNECTIONS******************************/

connection.on('open', () => {
  console.log('Now connected to Mongo ^_^');
  
  app.listen(PORT, () => {
    console.log(`Server now listening on port: ${PORT} =D`);
  })
})

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Use bcrypt to hash the incoming password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
        return res.status(500).json(err);
    }
    
    bcrypt.hash(password, salt, (error, hashedPassword) => {
      if(error) {
          return res.status(500).json(error);
      }

      //Create a new user and add the user's hashed password
      //as well as their information into the database.
      User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        NSID: req.body.NSID,
        age: req.body.age,
        location: req.body.location,
        rank: req.body.rank,
        mode: req.body.mode,
        weapon: req.body.weapon,
        status: req.body.status,
        time: Date.now(),
        notification: { notify: false, from: '' },
        friendlist: []
      })
      .save()
      .then(result => {
        //Create a token for the new user.        
        let payload = {
          //iss: 'squidmatch.com', 
          sub: username,
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }

        let token = jwt.sign(payload, secretKey);

        res.status(200).json({
          token: token,
          id: result._id
        });
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          error: error,
          signedUp: false
        });
      })
    })
  })
}) //end app.post



/******************************************************************/