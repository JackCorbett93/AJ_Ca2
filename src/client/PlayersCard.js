import React from "react";
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import "./index.css";
class TeamCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false
    };
  }
  handleEvent = event => {};
  render() {
    return (
      <Col md={4} sytle={{ margin: "10px 10px" }}>
        <Card>
          <CardBody
            className="pcard"
            style={this.state.flag ? { display: "none" } : {}}
          >
            <CardTitle>
              {this.props.name} {this.props.id}
            </CardTitle>
            <CardImg alt="profile" className="pimg" src={this.props.image} />
            <CardText>Country: {this.props.hometown}</CardText>
            <CardText>Full name: {this.props.fname}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
export default TeamCard;
