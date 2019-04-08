import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./index.css";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
class TeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      flag: false,
      dropdownOpen: false,
      team: []
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  handleEvent = event => {};
  render() {
    return (
      <Col md={4} sytle={{ margin: "10px 10px" }}>
        <Card>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>Actions</DropdownToggle>
            <DropdownMenu>
            <LinkContainer to={`/${this.props.id}/editPlayer`}>
              <DropdownItem>Edit Player</DropdownItem>
              </LinkContainer>
              <DropdownItem
                onClick={() => {
                  this.props.handleDelete(this.props.id);
                }}
              >
                Delete Player
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <CardBody
            className="pcard"
            style={this.state.flag ? { display: "none" } : {}}
          >
            <CardTitle>{this.props.name}</CardTitle>
            <CardImg alt="profile" className="pimg" src={this.props.image} />
            <CardText>Country: {this.props.hometown}</CardText>
            <CardText>Full name: {this.props.fname}</CardText>
            <CardText>Role: {this.props.role}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
export default TeamCard;
