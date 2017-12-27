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

app.post('/login', (req, res) => {
  
  //Find the password that matches the user.
  User.findOne({ username: req.body.username })
  .then(result => {
    //Compare the password against the hashed one.
    bcrypt.compare(req.body.password, result.password, (err, match) => {
      if (err) {
        return res.status(500);
      }

      if(match) {
          //Generate a JWT and send it back.
          let payload = {
            //Issuer is which server created this token.
            //Save this for when your app is in production.
            //iss: 'squidmatch.com', 
            
            //Subject field is what user this is on behalf of.
            sub: req.body.username,
            
            //Expiration field says how long this is valid for.
            //Set for an hour.
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
          }

          let token = jwt.sign(payload, secretKey);
          
          //Update the user's login time for search results.
          User.findOneAndUpdate(
            { username: req.body.username },
            { time: Date.now() },
            {}
          ).then(result => {}).catch(error => {})

          return res.json({
            token: token,
            NSID: result.NSID,
            age: result.age,
            location: result.location,
            rank: result.rank,
            mode: result.mode,
            weapon: result.weapon,
            status: "Available",
            notify: result.notification.notify,
            from: result.notification.from,
            message: "",
            setLogin: true
          });    
      }
      else {
          //If match is false, then we should deny their login
          //request.
          return res.json({
            message: "Your password is incorrect.",
            setLogin: false,
          });
      } //end if
    })

  })
  .catch(error => {
    res.json({
      message: "We couldn't find your account. Please register or try again.",
      setLogin: false,
    });
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
          //id: result._id
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

})

app.post('/search-criteria', (req, res) => {

  //Build the query object in order to search dynamically.
  let searchQuery = {}
  searchQuery['$and'] = []; //Start an $and query
  searchQuery["$and"].push({ status: "Available" }); //Always check for status.
  searchQuery["$and"].push({ "notification.notify": false });
  searchQuery["$and"].push({ username: { $ne: req.body.username }})

  /* Magic!
    Check to see which elements in the array match the fields required to search.
    If they do, add the field to the query.
    If a value is "any", find all values in the field.
  */
  
  //Age
  if (req.body.searchAge === "Any") {
    searchQuery["$and"].push({ age: {$regex: /^.*$/ } }); //regex searches from start to end for anything.
  }
  else {
    searchQuery["$and"].push({ age: req.body.searchAge });
  }
  
  //Location
  if (req.body.searchLocation === "Any") {
    searchQuery["$and"].push({ location: {$regex: /^.*$/ } });
  }
  else {
    searchQuery["$and"].push({ location: req.body.searchLocation });
  }
  
  //Rank
  if (req.body.searchRank === "Any") {
    searchQuery["$and"].push({ rank: {$regex: /^.*$/ } });
  }
  else {
    searchQuery["$and"].push({ rank: req.body.searchRank });
  }
  
  //Mode
  if (req.body.searchMode === "Any") {
    searchQuery["$and"].push({ mode: {$regex: /^.*$/ } });
  }
  else {
    searchQuery["$and"].push({ mode: req.body.searchMode });
  }
  
  //Weapon
  if (req.body.searchWeapon === "Any") {
    searchQuery["$and"].push({ weapon: {$regex: /^.*$/ } });
  }
  else {
    searchQuery["$and"].push({ weapon: req.body.searchWeapon });
  }

  //Find the users that match the given criteria by time in the queue.
  User.find(searchQuery).sort({ time: 1 })
  .then(result => {
    res.json({result: result});
  })
  .catch(error => {
    console.log("Couldn't get the users you searched for." + error);
    res.status(500);
  })

});

app.put('/send-invites', (req, res) => {
  //Allows for the database to update each field in the array of
  //group members and then return one promise afterwards.
  Promise.all(req.body.members.map((value, i) => {
    return (
      User.findOneAndUpdate(
        { username: value.username },
        { notification: { notify: req.body.notify, from: req.body.from }},
        {}
      )
    )
  }))
  .then(oldData => {
    res.json({ result: oldData });
  })
})
/******************************************************************/