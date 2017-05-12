import React, { Component } from 'react';
import * as _ from 'ramda';
import './CosmicData.css';
import './PlayerInfo.css';

class PlayerInfo extends Component {
    getPlayerDescription = (playerName) => {
        const playerDescriptions = {
            "Main": "Pääpelaaja",
            "Ally": "Liittolainen",
            "Main, Ally": "Pääpelaaja tai liittolainen",
            "Any": "Kuka tahansa",
            "Offensive ally": "Hyökkäyksen liittolainen",
            "Offense": "Hyökkäävä pääpelaaja",
            "NOT Main, NOT Ally": "EI pääpelaaja, EI liittolainen",
            "Offense, Ally": "Hyökkäävä pääpelaaja tai liittolainen",
            "NOT Main": "EI pääpelaaja",
            "Defense": "Puolustava pääpelaaja"
        };

        if (_.has(this.props.player, playerDescriptions)) {
            return playerDescriptions[this.props.player];
        }

        return this.props.player;
    }

    render() {
        return (
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

export default PlayerInfo;