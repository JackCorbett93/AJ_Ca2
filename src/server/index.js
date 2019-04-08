const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const Players = require("./models/Players");
const Team = require("./models/Team");
let db;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Url to connect to Atlas.mongodb
const mongo_uri =
  "mongodb+srv://Jaaack:FHaQzgJ8FzMUUQ3F@ca2-luszh.mongodb.net/ca2?retryWrites=true";
//"mongodb://localhost/ca2";
mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//gets all palyers
app.get("/api/Players", function(req, res) {
  Players.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});
//gets all teams
app.get("/api/Team", function(req, res) {
  Team.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});
//gets team from id
app.get("/api/Team/:id", function(req, res) {
  Team.findOne({ _id: req.params.id }, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});
//gets player from id
app.get("/api/Players/:id", function(req, res) {
  Players.findOne({ _id: req.params.id }, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

//app.get("/api/Createplayer", (req, res) => {
//  const players = new Players(req.body);
//  Players.insertOne(players, (err, res) => {
//    if (err) throw err;
//  });

//    console.log('created in database');
//    res.redirect('/');
//  });
//creates player into team
app.post('/api/Players', (req, res) => {
  console.log('here');
  //asigns random number to id
  req.body._id = Math.random() * Math.floor(10000);
  const players = new Players(req.body);
  //saved to variable to make updating the number of players
  const tid = req.body.current_team__id;
  players.save((err, result) => {
    if (err) throw err;
    console.log('created in database');
    //updates team's number of players
    getTeamNumber(tid);
    //res.redirect('/');
  });
});
//creates team
app.post('/api/Team', (req, res) => {
  req.body._id = Math.random() * Math.floor(10000);
  const team = new Team(req.body);
  team.save((err, result) => {
    if (err) throw err;
    console.log('created in database');
    res.redirect('/');
  });
});
//updates team
app.put("/api/Team", (req, res) => {
  // get the ID of the user to be updated
  const id = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  console.log(req.body._id);
  // find a user matching this ID and update their details
  Team.updateOne({ _id: id }, { $set: req.body }, (err, result) => {
    if (err) throw err;
    getAllTeamNumber();
    console.log("updated in database");
    return res.send({ success: true });
  });
});
//upates players
app.put("/api/Players", (req, res) => {
  // get the ID of the user to be updated
  console.log(req.body._id);
  const id = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;

  // find a user matching this ID and update their details
  Players.updateOne(
    { _id: id },
    { $set: req.body },
    (err, result) => {
      if (err) throw err;
    //  getAllTeamNumber();
      console.log("updated in database");
      return res.send({ success: true });
    }
  );
});
//deletes players
app.delete("/api/player", (req, res) => {
  console.log(req.body.id);

  Players.deleteOne({ _id: req.body.id }, (err, data) => {
    if (err) return res.send(err);
    console.log(data.current_team__id);
    tid = data.current_team__id;
    getTeamNumber(tid);
    getAllTeamNumber();
    console.log("delete in players");
    res.redirect("/");
  });

});
// delete team and players with specific ID from DB
app.delete("/api/team_player", (req, res) => {
  console.log(req.body.id);
  Players.find({ current_team__id: req.body.id }, function(err, data) {
    console.log("attempting players");
    Players.deleteMany({ current_team__id: req.body.id }, err => {
      console.log("players deleted");
      Team.deleteOne({ _id: req.body.id }, err => {
        if (err) return res.send(err);
        console.log("deleted from database");
        return res.send({ success: true });
        res.redirect("/");
      });
    });
  });
});
//gets all players from team using team id (one to many)
app.get("/api/:id/Players", function(req, res) {
  //  Team.findOne({_id: req.params.id}, function(err, data) {
  //  if (err) throw err;
  console.log(req.params);

  Players.find({ current_team__id: req.params.id }, function(err, data) {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
  //});
});
//loops through the team counting the number of players and updating the field player number
function getTeamNumber(teamid) {
  Team.find({ _id: teamid }, function(err, data) {
    data.forEach(t => {
      Players.find({ current_team__id: t._id }, (err, players) => {
        console.log(players.length);
        Team.updateOne(
          { _id: t._id },
          { $set: { player_number: players.length } },
          (err, team) => {
            console.log(t._id);
          }
        );
      });
    });
  });
}
//resets the number of players to the right number
//getAllTeamNumber();

function getAllTeamNumber() {
  Team.find({}, function(err, data) {
    data.forEach(t => {
      Players.find({ current_team__id: t._id }, (err, players) => {
        console.log(players.length);
        Team.updateOne(
          { _id: t._id },
          { $set: { player_number: players.length } },
          (err, team) => {
            console.log(t._id);
          }
        );
      });
    });
  });
}

app.listen(process.env.PORT || 8080);
