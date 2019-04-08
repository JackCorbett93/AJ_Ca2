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

app.get("/api/Players", function(req, res) {
  Players.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get("/api/Team", function(req, res) {
  Team.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get("/api/Team/:id", function(req, res) {
  Team.findOne({ _id: req.params.id }, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

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
app.post("/api/Players", (req, res) => {
  console.log("here");
  const players = new Players(req.body);
  players.save((err, result) => {
    if (err) throw err;
    console.log("created in database");
    getTeamNumber(players.current_team__id);
    res.redirect("/");
  });
});
app.post('/api/Team', (req, res) => {
  const team = new Team(req.body);
  team.save((err, result) => {
    if (err) throw err;
    console.log("created in database");
    res.redirect("/");
  });
});

app.put('/api/Team', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  console.log(req.body._id);
  // find a user matching this ID and update their details
  Team.updateOne( {_id: id }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.put('/api/Player', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  console.log(req.body._id);
  // find a user matching this ID and update their details
  Players.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.delete('/api/player', (req, res) => {
  console.log(req.body.id);
  Players.findOne({ _id: req.body.id }, function(err, data) {
    if (err) return res.send(err);
    Players.deleteOne({ _id: req.body.id }, function(err, data) {
      if (err) return res.send(err);
      getTeamNumber(data.current_team__id);
      console.log("delete in players");
      res.redirect("/");
    });
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
