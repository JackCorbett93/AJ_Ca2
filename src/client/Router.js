import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import './index.css';
// imports all pages
import About from './About';
import Players from './GetPlayers';
import Teams from './GetTeams';
import './index.css';
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* sets up the naviagation link to the exact urls*/}
          <h1>Counter-Strike: GO Esports</h1>
          <ul className="header">
            <li>
              <NavLink exact to="/">
                About
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/Teams">
                Teams
              </NavLink>
            </li>
          </ul>
          <div className="content">
            {/* Attaches pages to the navigation link using component*/}
            <Route exact path="/" component={About} />
            <Route exact path="/Teams" component={Teams} />
            <Route exact path="/api/DeleteTeam/:id"/>
            {/*the players page passes id which is attached to the teams page*/}
            <Route path="/:id/players" component={Players} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
