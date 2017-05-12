import React, { Component } from 'react';
import * as _ from 'ramda';
import ReactMarkdown from 'react-markdown';
import PlayerInfo from './PlayerInfo'
import './CosmicData.css';
import './AlienSheet.css';

class AlienSheet extends Component {

    render() {
        let alienData = this.props.alienData;

        return (
            <div className="card-border sheet">
                <ReactMarkdown
                    className="sheet-text"
                    source={alienData.text}
                />
                <PlayerInfo
                    player={alienData.who}
                    when={alienData.when}
                />
            </div>
        );
    }
}

export default AlienSheet;