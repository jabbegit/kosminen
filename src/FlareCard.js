import React, { Component } from 'react';
import './FlareCard.css';
import * as _ from 'ramda';
import PlayerInfo from './PlayerInfo'

class FlareCard extends React.Component {
  render() {

    const wildFlare = this.props.wildFlare;
    const superFlare = this.props.superFlare;

    return (
      <div className="flare-card">
        <span className="small-caps">
          {wildFlare.name}
        </span>
        <p>
        </p>

        <FlarePowerText
          alienName={wildFlare.name}
          powerName={wildFlare.power}
          text={wildFlare.text}
          css="flare-text-box yellow-flare-bg"
          player={wildFlare.who}
          when={wildFlare.when}
        />
        <p>
        </p>

        <FlarePowerText
          alienName={wildFlare.name}
          powerName={superFlare.power}
          text={superFlare.text}
          css="flare-text-box blue-flare-bg"
          player={superFlare.who}
          when={superFlare.when}
        />
      </div>
    );
  }
}

class FlarePowerText extends Component {

  getPowerDescription = (powerName) => {
    const powerDescriptions = {
      "Wild": "Jos et ole",
      "Super": "Jos olet"
    };

    if (_.has(this.props.powerName, powerDescriptions)) {
      return `(${powerDescriptions[this.props.powerName]} ${this.props.alienName})`;
    }
    return "";
  }

  render() {

    return (
      <div className={this.props.css}>
        <span className="small-caps">
          {this.props.powerName}
        </span>

        <div className="small-small-caps">{this.getPowerDescription(this.props.powerName)}</div>

        <p className="flare-text">
          {this.props.text}
        </p>
        <PlayerInfo
          player={this.props.player}
          when={this.props.when} />
      </div>
    );
  }
}





export default FlareCard;
