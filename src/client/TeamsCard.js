import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./index.css";
class TeamCard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      flag: false,
      teams: [],
      searchTerm: "",
      alphabetical: "az",
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    // checks to see if any player data is on team object and then pushes it into array so it can show number of players or their name
    let player;
    let players = [];
    // if (this.props.players.length !== 0) {
    //   for (let i = 0; i < this.props.players.length; i++) {
    //     player = this.props.players[i].name;
    //     players.push(player);
    //   }
    // } else {
    //   player = "Not available";
    // }

    if (this.props.players > 0) {
      return (
        <Col md={4} sytle={{ margin: "10px 10px" }}>
          {/*sets up link to page players and passes in the id of the team the user clicks on*/}
          <Card className="tcard">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>Actions</DropdownToggle>
              <DropdownMenu>
              <LinkContainer to={`${this.props.id}/editTeam`}>
                <DropdownItem>Edit Team</DropdownItem>
                </LinkContainer>
                <LinkContainer to={`${this.props.id}/createPlayer/`}>
                  <DropdownItem>Add Players</DropdownItem>
                </LinkContainer>
                <DropdownItem
                  onClick={() => {
                    this.props.handleDelete(this.props.id);
                  }}
                >
                  Delete Team & Players
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Link to={`${this.props.id}/players/`}>
              <CardBody style={this.state.flag ? { display: "none" } : {}}>
                <CardTitle>{this.props.name}</CardTitle>
                <CardText>Number of Players: {this.props.players}</CardText>
                <CardImg
                  alt="profile"
                  className="mtimg"
                  src={this.props.image}
                />
              </CardBody>
            </Link>
          </Card>
        </Col>
      );
    } else {
      return (
        <Col md={4} sytle={{ margin: "10px 10px" }}>
          <Card className="tcard">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>Actions</DropdownToggle>
              <DropdownMenu>
              <LinkContainer to={`${this.props.id}/editTeam`}>
                <DropdownItem>Edit Team</DropdownItem>
                </LinkContainer>
                <LinkContainer to={`${this.props.id}/createPlayer/`}>
                  <DropdownItem>Add Players</DropdownItem>
                </LinkContainer>
                <DropdownItem
                  onClick={() => {
                    this.props.handleDelete(this.props.id);
                  }}
                >
                  Delete Team
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <CardBody style={this.state.flag ? { display: "none" } : {}}>
              <CardTitle>{this.props.name}</CardTitle>
              <CardText>Number of Players: {this.props.players}</CardText>
              <CardImg alt="profile" className="mtimg" src={this.props.image} />
            </CardBody>
          </Card>
        </Col>
      );
    }
  }
}

export default TeamCard;
