import React, { Component } from 'react';
import * as _ from 'ramda';
import ReactMarkdown from 'react-markdown';
import PlayerInfo from './PlayerInfo';
import './TechCard.css';

class TechCard extends Component {
    render() {

        const tech = this.props.tech;

        return (
            <div className="tech-card">
                <div className="card-caption">
                    <span>Teknologia</span>
                </div>
                <div className="card-content">
                    <div className="small-caps">{tech.name}</div>
                    <div className="capitalize">{tech["name-fin"]}</div>

                    <ReactMarkdown className="sheet-text" source={tech.text} />

                    <div className="circle-container">
                        <div className="circle">{tech.ships}</div>
                    </div>

                    <PlayerInfo player={tech.who} when={tech.when} />
                </div>
            </div>
        );
    }
}

export default TechCard;