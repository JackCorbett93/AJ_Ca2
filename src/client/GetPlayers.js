import React, { Component } from "react";
import { Container, Row, Card, CardImg, CardTitle } from "reactstrap";
import TeamCard from "./PlayersCard";
import axios from "axios";
import "./index.css";
class Team_Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Details: []
    };
  }
  //api requests players with the team id
  componentDidMount() {
    console.log("lol");
    axios
      .get(`api/${this.props.match.params.id}/Players`)
      .then(response => {
        console.log(response.data);
        this.setState({
          //sets reponse data to Details
          isLoaded: true,
          Details: response.data
        });
      })
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      .catch(error => {
        console.log(error);
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    //sets variable so that if nothing came through on api request it just sets defualt
    let img, player, timg, tname;
    //maps incoming data to variables
    const teamdetails = this.state.Details.map(t => {
      //sees if there is data that comes through players eg if it has zero players then it will show this
      if (
        this.state.Details === null ||
        this.state.Details === undefined ||
        this.state.Details.length <= 0
      ) {
        tname = "Data not provided by api";
      } else {
        tname = t.current_team__name;
      }
      if (
        t.current_team__image_url === null ||
        t.current_team__image_url === undefined ||
        t.current_team__image_url === "null"
      ) {
        timg =
          "https://via.placeholder.com/500";
      } else {
        timg = t.current_team__image_url;
      }
      if (t.image_url === null || t.image_url === undefined || t.image_url === "null") {
        img =
          "https://via.placeholder.com/500";
      } else {
        img = t.image_url;
      }

      if (
        t.player_number !== undefined ||
        t.player_number !== null ||
        t.player_number > 0
      ) {
        player = t.player_number;
      } else {
        player = "Not Available";
      }
      //sets variables and returns it to card
      return (
        <TeamCard
          key={t._id}
          name={t.name}
          fname={t.last_name}
          hometown={t.hometown}
          players={player}
          image={img}
        />
      );
    });

    return (
      <Container>
        <Row>
          <Card>
            <CardTitle className="tname"> {tname}</CardTitle>
            <div className="timg">
              <CardImg alt="profile" className="timg" src={timg} />
            </div>
            <Container>
              <Row noGutters>{teamdetails}</Row>
            </Container>
          </Card>
        </Row>
      </Container>
    );
  }
}
export default Team_Play;
