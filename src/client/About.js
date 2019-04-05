import React from 'react';
import { Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';
class TeamCard extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            flag: false
        };

    }
    handleEvent = event => {

    }
    render() {
      return (
        <Col md={4} sytle={{'margin': "10px 10px"}}>
          <Card>
          <CardBody>
          <CardTitle>Counter-Strike: GO ESports viewer</CardTitle>
          <CardText>Jack Corbett N00153357</CardText>
          <CardText>This application allows users to view different CSGO teams and sort them alphabetical and also allows users to search which will filter out the teams based on what letters are typed. There is also a feature that allows the user to hide teams where there are no players so that they can properly see the team page. Inside the team page it will show the players and the icon of the team</CardText>
          </CardBody>
          </Card>
        </Col>
      );
    }
}
export default TeamCard;
