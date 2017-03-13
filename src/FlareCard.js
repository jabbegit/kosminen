import React, { Component } from 'react';
import './FlareCard.css';
import * as _ from 'ramda';

class FlareCard extends React.Component {
  render() {

    const wildFlare = this.props.wildFlare;
    const superFlare = this.props.superFlare;

    return(
      <div className="flare-card">
        <span className="small-caps">
          {wildFlare.name}
        </span>
        <p>
        </p>

        <FlarePowerText

          powerName={wildFlare.power}
          text={wildFlare.text}
          css="flare-text-box yellow-flare-bg"
          player={wildFlare.who}
          when={wildFlare.when}
        />
        <p>
        </p>

        <FlarePowerText

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
  render() {

    return(
      <div className={this.props.css}>
        <span className="small-caps">
          {this.props.powerName}
        </span>
        <p className="flare-text">
          {this.props.text}
        </p>
        <FlarePlayer
          player={this.props.player}
          when={this.props.when}/>
      </div>
    );
  }
}

class FlarePlayer extends React.Component {

  getPlayerDescription = (playerName) => {
    const playerDescriptions = {
      "Main": "Vain pääpelaaja",
      "Ally": "Liittolainen"
    };

    if (_.has(this.props.player, playerDescriptions)) {
      return playerDescriptions[this.props.player];
    }

    return this.props.player;
  }

  render () {

    return(
      <div>
        <div className="player-role">
          <span className="capitalize">
            {this.getPlayerDescription(this.props.player)}
          </span>

        </div>
        <div className="player-phase">
          <span className="capitalize white">
            {this.props.when}
          </span>

        </div>

      </div>
    );
  }
}

export default FlareCard;
