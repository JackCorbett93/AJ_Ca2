import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import TeamCard from "./TeamsCard";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import "./index.css";
//import fire from './fire';
let results = [];
let results2 = [];
let fresults = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: [],
      searchTerm: "",
      alphabetical: "az"
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // Makes four api calls due to there being four pages
  componentDidMount() {
    axios
      .get(`api/Team`)
      //then it splits up the calls into four variables and then concats it into two groups then into one big group
      .then(response => {
        console.log(response.data);
        this.setState({
          teams: Array.from(response.data),
          isLoaded: true
        });
      })

      .catch(error => {
        console.log(error);
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  handleChange(event) {
    //sets up serach box
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDelete(teamId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete("/api/team_player", {
        data: {
          id: teamId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        //this.updateUsers();
        this.props.history.push(`/Teams`)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    //sorts order of teams shown depending on the drop down menu is on a-z or z-a
    let sortedTeams;
    if (this.state.alphabetical === "az") {
      sortedTeams = this.state.teams.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      sortedTeams = this.state.teams.sort((a, b) => (a.name < b.name ? 1 : -1));
    }

    let filteredTeams = sortedTeams;

    if (this.state.searchTerm)
      //filters depending on letters in search bar
      filteredTeams = this.state.teams.filter(u =>
        u.name.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())
      );
    let img, player;
    //eslint-disable-next-line
    const teamNames = filteredTeams.map(t => {
      // checks to see if profile picture is present if not put in default
      if (
        t.image_url === null ||
        t.image_url === undefined ||
        t.image_url === "null"
      ) {
        img = "https://via.placeholder.com/500";
        //"https://placeholdit.imgix.net/~text?txtsize=33&txt=No Image&w=500&h=500";
      } else {
        img = t.image_url;
      }
      //checks to see if any players are present on the team if not gives out message
      if (
        t.player_number !== undefined ||
        t.player_number !== null ||
        t.player_number > 0
      ) {
        player = t.player_number;
      } else {
        player = "Not Available";
      }
      //checks to see if checkbox is ticked if yes then it will get rid of any team with zero players
      if (this.state.NoPly === false || this.state.NoPly === undefined) {
        return (
          <TeamCard
            key={t._id}
            id={t._id}
            name={t.name}
            players={player}
            image={img}
            handleDelete={this.handleDelete}
          />
        );
      } else if (this.state.NoPly === true && t.player_number > 0) {
        return (
          <TeamCard
            key={t._id}
            id={t._id}
            name={t.name}
            players={player}
            image={img}
            handleDelete={this.handleDelete}
          />
        );
      }

      console.log(this.state.NoPly);
    });
    return (
      <Container>
        <Row>
          <Col xs="3">
            <form onSubmit={this.handleSubmit}>
              <label>
                Search for user:
                <input
                  type="text"
                  name="searchTerm"
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                />
              </label>
            </form>
          </Col>
          <Col xs="3">
            <label>Create Team</label>
            <LinkContainer to={`/createTeam`}>
              <Button />
            </LinkContainer>
          </Col>
          <Col xs="3">
            <label>Sort:</label>
            <select
              name="alphabetical"
              value={this.state.alphabetical}
              onChange={this.handleChange}
            >
              <option value="az">A to Z</option>
              <option value="za">Z to A</option>
            </select>
          </Col>
          <Col xs="3">
            <label>Show teams with players only :</label>
            <input
              type="checkbox"
              name="NoPly"
              value={this.state.NoPly}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row noGutters>{teamNames}</Row>
      </Container>
    );
  }
}
export default App;
