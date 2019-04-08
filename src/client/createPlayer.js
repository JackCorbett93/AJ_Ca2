import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onChangePlayerLName = this.onChangePlayerLName.bind(this);
    this.onChangePlayerHometown = this.onChangePlayerHometown.bind(this);
    this.onChangePlayerRole = this.onChangePlayerRole.bind(this);
    this.onChangePlayerCTeam = this.onChangePlayerCTeam.bind(this);
    this.onChangePlayerImage = this.onChangePlayerImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // store form fields in state
    this.state = {
      name: "",
      last_name: "",
      hometown: "",
      role: "",
      current_team__id: "",
      image_url: ""
    };
  }

  onChangePlayerName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePlayerLName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  onChangePlayerHometown(e) {
    this.setState({
      hometown: e.target.value
    });
  }

  onChangePlayerRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  onChangePlayerCTeam(e) {
    this.setState({
      current_team__id: e.target.value
    });
  }

  onChangePlayerImage(e) {
    this.setState({
      image_url: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const newPlayer = {
      name: this.state.name,
      last_name: this.state.last_name,
      hometown: this.state.hometown,
      role: this.state.role,
      current_team__id: this.props.match.params.id,
      //current_team__id: this.state.current_team__id,
      image_url: this.state.image_url
    };
    console.log(newPlayer);
    // send a POST request to the server
    // the request includes the state, which is the info. for the new user to be created
    axios
      .post("/api/Players", newPlayer)
      .then(res =>
        console.log(res.data),
        this.props.history.push(`/${this.props.match.params.id}/players`)) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create New User</h2>
          <FormGroup>
            <label>
              Current team id:
              <input
                type="text"
                name="current_team__id"
                value={`${this.props.match.params.id}`}
                onChange={this.onChangePlayerCTeam}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              Name (Alias):
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChangePlayerName}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              Full Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.onChangePlayerLName}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              Country:
              <input
                type="text"
                name="hometown"
                value={this.state.hometown}
                onChange={this.onChangePlayerHometown}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={this.state.role}
                onChange={this.onChangePlayerRole}
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
                onChange={this.onChangePlayerImage}
              />
            </label>
          </FormGroup>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreatePlayer;
