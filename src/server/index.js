const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const Players = require("./models/Players");
const Team = require("./models/Team");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongo_uri =
  "mongodb+srv://Jaaack:Wolwol100@ca2-luszh.mongodb.net/ca2?retryWrites=true";
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

// delete user with specific ID from DB
app.get('/api/DeleteTeam', function(req, res) {
  console.log("here");
  Players.find({ current_team__id: req.body.id }, function(err, data) {
    console.log("attempting players");
    Players.delete({ current_team__id: req.params.id }, err => {
      console.log("here");
      Team.deleteOne({ _id: req.params.id }, err => {
        if (err) return res.send(err);
        console.log('deleted from database');
        return res.send({ success: true });
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

// Team.find({}, function(err,data) {
//   data.forEach(t=>{
//     Players.find({current_team__id: t._id}, (err, players) => {
//       // console.log(players.length);
//       Team.updateOne({_id:t._id}, {$set: {player_number:players.length}}, (err, team) =>{
//         console.log(t._id);
//       });
//     });
//   });
// });

app.listen(process.env.PORT || 8080);
