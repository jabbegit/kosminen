import React, { Component } from 'react';
import * as _ from 'ramda';
import ReactMarkdown from 'react-markdown';
import PlayerInfo from './PlayerInfo';
import './ArtifactCard.css';

class ArtifactCard extends Component {
  render() {

    const artifact = this.props.artifact;

    return (
      <div className="artifact-card">
        <div className="card-caption">
          <span>Artefakti</span>
        </div>
        <div className="card-content">
          <div className="small-caps">{artifact.name}</div>
          <ReactMarkdown
            className="sheet-text"
            source={artifact.text}
          />
          <PlayerInfo player={artifact.who} when={artifact.when} />
        </div>
      </div>
    );
  }
}

export default ArtifactCard;