import React, { Component } from 'react';
import * as _ from 'ramda';
import PlayerInfo from './PlayerInfo';
import './ArtifactCard.css';

class ArtifactCard extends Component {
  render() {
    
    const artifact = this.props.artifact;
    
    return (
      <div className="artifact-card">
        <div className="card-caption">
          <span>Artifact</span>
        </div>
        <div className="artifact-content">
          <span className="small-caps">{artifact.name}</span>
          <p>{artifact.text}</p>
        </div>
      </div>
    );
  }
}

export default ArtifactCard;