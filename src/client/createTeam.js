import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    this.onChangeTeamImage = this.onChangeTeamImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // store form fields in state
    this.state = {
      name: "",
      image_url: ""
    };
  }

  onChangeTeamName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeTeamImage(e) {
    this.setState({
      image_url: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const newTeam = {
      slug: this.state.name,
      name: this.state.name,
      image_url: this.state.image_url,
      player_number: 0
    };
    console.log(newTeam);
    // send a POST request to the server
    // the request includes the state, which is the info. for the new user to be created
    axios
      .post("/api/Team", newTeam)
      .then(res => console.log(res.data)) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create New Team</h2>
          <FormGroup>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChangeTeamName}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              Image:
              <input
                type="text"
                name="image_url"
                value={this.state.image_url}
                onChange={this.onChangeTeamImage}
              />
            </label>
          </FormGroup>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateTeam;
