/**********************IMPORTS**************************************/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;
//const config = require('./config.js');

const User = require('./models/User');
const Messages = require('./models/Messages');

const PORT = process.env.PORT || 8080;
const MONGO_CONNECTION_STRING = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mongoose.createConnection(MONGO_CONNECTION_STRING, { useMongoClient: true })
.then(() => console.log('connected to DB'))
.catch(err => console.log(err));


//const connection = mongoose.connection;
const secretKey = process.env.token_secretKey;
const rooms = [];

/******************************************************************/

/*********************CONNECTIONS & SOCKETS************************/

connection.on('open', () => {
  console.log('Now connected to Mongo ^_^');
  
  const server = app.listen(PORT, () => {
    console.log(`Server now listening on port: ${PORT} =D`);
  })

  //Import and setup socket to listen to set server above.
  const io = require('socket.io').listen(server);

  io.sockets.on('connection', socket => {

    //Used to cause an update which will send invites out to all group members.
    socket.on('check-invites', () => {
      socket.broadcast.emit('invited');
    })

    socket.on('create-room', (data) => {
      //Create the initial room and enter.
      socket.username = data.username;  //Give the socket a username.
      rooms.push(data.username);    //Add room to rooms array.
      socket.join(data.username);   //Join room.
      socket.room = data.username;  //Name room by username.
      

      socket.emit('room-created', {
        time: Date.now(),
        sender: 'Judd (Admin)',
        message: 'Welcome to Squid Chat!'
      })
    })

    socket.on('add-member', (data) => {
      let roomMembers = [];
      
      socket.username = data.username;
      socket.room = data.from;
      socket.join(socket.room);

      //Get all the clients currently in the room.
      let users = io.sockets.adapter.rooms[socket.room].sockets;

      //This is the username of each socket in the room.
      for (let id in users) {  
        roomMembers.push(io.sockets.connected[id].username);
      }

      //Message displayed to current user only.
      socket.emit('joined-room', {
        time: Date.now(),
        sender: 'Judd (Admin)',
        message: `Welcome to ${data.from}'s chat!`,
        roomMembers: roomMembers,
      })

      //Message displayed to rest of room.
      socket.to(socket.room).emit('update-chat', {
        time: Date.now(),
        sender: 'Judd (Admin)',
        message: `${data.username} joined the chat!`,
      })

      //Get old messages.
      io.sockets.in(socket.room).emit('retrieve-old-messages', {
        roomMembers: roomMembers,
      })
    })

    socket.on('close-room', (data) => {
      socket.room = data.from;
      
      //Update people in the room.
      socket.to(socket.room).emit('room-closed', {
        emptyRoom: true
      });

      //Check to make sure room twice doesn't close twice.
      if (io.sockets.adapter.rooms[socket.room] !== undefined) {
        //Get all the clients currently in the room.
        let users = io.sockets.adapter.rooms[socket.room].sockets;

        //Remove all members from room
        for (let id in users) {
          io.sockets.sockets[id].leave(socket.room);
        }
      }
    })

    socket.on('leave-room', (data) => {      
      let roomMembers = [];

      //Find user's room.
      socket.room = data.from;
      
      //Update people in the room.
      socket.to(socket.room).emit('update-chat', {
        time: Date.now(),
        sender: 'Judd (Admin)',
        message: `${data.username} has swum away.`
      });

      //Remove the socket from the room that they were in last.
      socket.leave(socket.room);

      //Check to make sure room twice doesn't close twice.
      if (io.sockets.adapter.rooms[socket.room] !== undefined) {
        //Get all the clients currently in the room.
        let users = io.sockets.adapter.rooms[socket.room].sockets;
        //This is the username of each socket in the room.
        for (let id in users) {
          roomMembers.push(io.sockets.connected[id].username);
        }
        
        //Open room for others left in the room.
        socket.emit('remnant-room', {
          roomMembers: roomMembers,
        })
      }
    })

    socket.on('declined-invite', (data) => {
      socket.room = data.from;

      //Update people in the room.
      socket.to(socket.room).emit('update-chat', {
        time: Date.now(),
        sender: 'Judd (Admin)',
        message: `${data.username} declined the invite.`
      });      
    })

    socket.on('send-chat', (data) => {
      let roomMembers = [];
      
      socket.room = data.from
      socket.join(socket.room);

      //Get all the clients currently in the room.
      let users = io.sockets.adapter.rooms[socket.room].sockets;
      
      //This is the username of each socket in the room.
      for (let id in users) {
        roomMembers.push(io.sockets.connected[id].username);
      }

      //Make sure to save chat for only one socket (if put
      //in the event below, would write to db multiple times).
      socket.emit('update-save-chat', {
        time: data.time,
        sender: data.sender,
        message: data.message,
        roomMembers: roomMembers,
      })

      io.sockets.in(socket.room).emit('update-chat', {
          time: data.time,
          sender: data.sender,
          message: data.message,
      });
    })

  })

})

/******************************************************************/

/**************************END POINTS******************************/

/******************************GET*********************************/

app.get('/get-invite/:username', (req, res) => {
  User.findOne({ username: req.params.username })
  .then(result => {
    res.json({
      notify: result.notification.notify,
      from: result.notification.from
    });
  })
  .catch(err => {
    console.log(error);
  })
})

app.get('/current-profile/:username', (req, res) => {
  User.findOne({ username: req.params.username })
  .then(result => {
    res.json({
      NSID: result.NSID,
      age: result.age,
      location: result.location,
      rank: result.rank,
      mode: result.mode,
      weapon: result.weapon,
      playstyle: result.playstyle,
    });
  })
  .catch(err => {
    console.log("Current Profile Error: " + error);
  })
})

app.get('/check-status/:username', (req, res) => {
  User.findOne({ username: req.params.username })
  .then(result => {
    res.json({
      status: result.status
    })
  })
  .catch(error => {
    console.log("Check Status Error: " + error);
  })
})
/******************************************************************/

/*****************************POST*********************************/

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
          
          //Update the user's login time and status for search results.
          User.findOneAndUpdate(
            { username: req.body.username },
            { time: Date.now(), status: 'Available' },
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
            playstyle: result.playstyle,
            status: 'Available',
            notify: result.notification.notify,
            from: result.notification.from,
            friendlist: result.friendlist,
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
  });
});

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
        playstyle: req.body.playstyle,
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

app.post('/check-invite-status', (req, res) => {
  //Check if the member has been invited in the time it took to invite
  //after searching.
  Promise.all(req.body.members.map((value, i) => {
    return (
      User.findOne({ $and: [{ username: value.username }, { "notification.from": { $eq: '' }}]})
    )
  }))
  .then(result => {
    //Since result will return null as a spot in the array, need to
    //check the actual value and return 0 manually for the length.
    if (result[0] === null) {
      res.json({ freeMembers: 0 });
    }
    else {
      res.json({ freeMembers: result.length });
    }
  })
})

app.post('/verify-token', (req, res) => {
  jwt.verify(req.body.currentToken, secretKey, (err, token) => {
    if (err) {
      res.json({
        token: false,
        message: err
      })
    }
    else {
      res.json({
        token: true,
      });
    }
  });
})

app.post('/open-new-conversation', (req, res) => {
  //Sort array to make sure insertion is always the same.
  req.body.roomMembers.sort();
  
  //Check if a conversation already exists.
  Messages.findOne({ users: req.body.roomMembers })
  .then(result => {
    if (result === null) {
      //Create a new messages model and add it to the conversation field.
      Messages({
        users: req.body.roomMembers,
        message: []
      })
      .save()
      .catch(error => {
        console.log('Open Conversation Error: ' + error);
      })
    }
    res.json({ message: result });
  })
  .catch(error => {
    console.log('Search for Open Conversation Error: ' + error);
  })
  
})

app.post('/get-messages', (req, res) => {
  //Sort array to make sure insertion is always the same.
  req.body.roomMembers.sort();

  Messages.findOne({ users: req.body.roomMembers })
  .then(result => {
    res.json({ messages: result });
  })
  .catch(error => {
    console.log("Get Messages Error: " + error);
  })
})

app.post('/search-criteria', (req, res) => {
  //Build the query object in order to search dynamically.
  let searchQuery = {}
  searchQuery["$and"] = []; //Start an $and query
  searchQuery["$and"].push({ status: "Available" }); //Always check for status.
  searchQuery["$and"].push({ "notification.from": { $eq: '' } });
  searchQuery["$and"].push({ username: { $ne: req.body.username }})

  /*
    Check to see which elements in the array match the fields required to search.
    If they do, add the field to the query.
    If a value is "any", find all values in the field.
  */
  
  //Screen Name
  if (req.body.searchScreenName !== "") {
    searchQuery["$and"].push({ username: req.body.searchScreenName });
  }

  //Age
  if (req.body.searchAge === "Any") {
    //regex searches from start to end for anything.
    searchQuery["$and"].push({ age: {$regex: /^.*$/ } }); 
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

  //Playstyle
  if (req.body.searchPlaystyle === "Any") {
    searchQuery["$and"].push({ playstyle: {$regex: /^.*$/ } });
  }
  else {
    searchQuery["$and"].push({ playstyle: req.body.searchPlaystyle });
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

app.post('/search-friends', (req, res) => {
  Promise.all(req.body.friendlist.map((value, i) => {
    return (
      User.findOne({ username: value })
    )
  }))
  .then(result => {
    res.json({ list: result })
  })
  .catch(error => {
    console.log("Search Friends Error: " + error);
    res.status(500);
  })
})

/******************************************************************/

/******************************PUT*********************************/

app.put('/logout', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      status: 'Offline',
      notification: { notify: false, from: '' }
    },
    {}
  )
  .then(oldData => {
    res.json({ result: oldData });
  })
  .catch(error => {
    console.log("Logout Error: " + error);
  })
})

app.put('/update-profile', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { NSID: req.body.NSID,
      age: req.body.age,
      location: req.body.location,
      rank: req.body.rank,
      mode: req.body.mode,
      weapon: req.body.weapon,
      playstyle: req.body.playstyle,
    },
    {}
  )
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log("Update error " + error);
    res.status(500);
  })
})

app.put('/update-status', (req, res) => {
  if (req.body.status === 'Busy') {
    User.findOneAndUpdate(
      { username: req.body.username },
      { status: 'Busy' },
      {}
    )
    .then(oldData => {
      res.json({
        status: 'Busy'
      });
    })
    .catch(error => {
      console.log("Update Status Error: " + error);
      res.status(500);
    }) 
  }
  else {
    User.findOneAndUpdate(
      { username: req.body.username },
      { status: 'Available', time: Date.now() },
      {}
    )
    .then(oldData => {
      res.json({
        status: 'Available'
      })
    })
    .catch(error => {
      console.log("Update Status Error: " + error);
      res.status(500);
    }) 
  }
})

app.put('/add-to-friends', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $push: { friendlist: req.body.user }},
    {}
  )
  .then(result => {
    res.json({ result: `${req.body.user} was added to friendlist.` })
  })
  .catch(error => {
    console.log("Add to Friends Error: " + error);
  })
})

app.put('/remove-friend', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $pull: { friendlist: req.body.user }},
    {}
  )
  .then(result => {
    res.json({ result: `${req.body.user} was removed from friendlist.`})
  })
  .catch(error => {
    console.log("Remove Friend Error: " + error);
  })
})

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
    res.json({ result: oldData});
  })
  .catch(error => {
    console.log(error);
  })
})

app.put('/set-chat-status', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      notification: { notify: false, from: req.body.username },
      status: req.body.status
    },
    {}
  )
  .then(result => {
    res.json({ result: result });
  })
  .catch(error => {
    console.log("Set Chat Status Error: " + error);
  })
})

app.put('/save-chat', (req, res) => {
  req.body.roomMembers.sort();
  
  Messages.findOneAndUpdate(
    { users: req.body.roomMembers },
    { $push: { messages: 
        { time: req.body.time, sender: req.body.sender, message: req.body.message }
      }
    }
  )
  .then(oldData => {
    res.json({ oldData: oldData })
  })
  .catch(error => {
    console.log("Save Chat Error: " + error);
  })
})

app.put('/leave-chat', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      notification: { notify: false, from: '' },
      status: 'Available'
    },
    {}
  )
  .then(oldData => {
    res.json({ result: oldData })
  })
  .catch(error => {
    console.log("Leave Chat Error: " + error);
  })
})

app.put('/clear-invite', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { 
      notification: { notify: req.body.notify, from: req.body.from }, 
      status: req.body.status
    },
    {}
  )
  .then(oldData => {
    res.json({ result: oldData });
  })
  .catch(error => {
    console.log(error);
  })
})
/******************************************************************/