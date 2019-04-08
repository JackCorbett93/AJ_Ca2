import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  CardImg,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import TeamCard from "./PlayersCard";
import axios from "axios";

import "./index.css";
class Team_Play extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      Details: [],
      tname: "",
      timg: "",
      tid: "",
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  //api requests players with the team id
  async componentDidMount() {
    //console.log("lol");
    axios
      .all([
        //fetches data from both the players of the team as well as the the team so that team cards wont be blank
        axios.get(`api/${this.props.match.params.id}/Players`),
        axios.get(`api/Team/${this.props.match.params.id}`)
      ])
      .then(
        axios.spread((players, team) => {
          console.log(players.data);
          console.log(team.data);
          this.setState({
            //sets reponse data to Details
            isLoaded: true,
            Details: players.data,
            tid: team.data._id,
            tname: team.data.name,
            timg: team.data.image_url
          });
        })
      )
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
  handleDelete(userId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete("/api/player", {
        data: {
          id: userId
        }
      })
      .then(response => {
        this.props.history.push(`/Teams`)
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    //sets variable so that if nothing came through on api request it just sets defualt
    let img, player, tname;
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
        this.state.timg === null ||
        this.state.timg === undefined ||
        this.state.timg === "null"
      ) {
        this.state.timg = "https://via.placeholder.com/500";
      } else {
        this.state.timg = this.state.timg;
      }
      if (
        t.image_url === null ||
        t.image_url === undefined ||
        t.image_url === "null"
      ) {
        img = "https://via.placeholder.com/500";
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
          id={t._id}
          name={t.name}
          fname={t.last_name}
          hometown={t.hometown}
          role={t.role}
          players={player}
          image={img}
          handleDelete={this.handleDelete}
        />
      );
    });

    return (
      <Container>
        <Row>
          <Card>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>Actions</DropdownToggle>
              <DropdownMenu>
                <LinkContainer to={`/${this.state.tid}/editTeam`}>
                  <DropdownItem>Edit Team</DropdownItem>
                </LinkContainer>
                <LinkContainer to={`/${this.state.tid}/createPlayer`}>
                  <DropdownItem>Add Players</DropdownItem>
                </LinkContainer>
              </DropdownMenu>
            </Dropdown>
            <CardTitle className="tname"> {this.state.tname}</CardTitle>
            <div className="timg">
              <CardImg alt="profile" className="timg" src={this.state.timg} />
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
