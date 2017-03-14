import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import * as _ from 'ramda';
import './App.css';
import isMobile from 'ismobilejs'
import FlareCard from './FlareCard';

const cosmicFlaresData = [
  {"name":"Amoeba","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valintaa, voit lisätä tai vähentää yhteenotossa olevien alustesi määrää enintään neljällä. Sinulla voi näin olla enemmän kuin neljä alusta yhteenotossa."},
  {"name":"Amoeba","color":"Yellow","power":"Super","who":"Ally","when":"Planning","text":"Voit käyttää kykyäsi ollessasi liittolainen"},
  {"name":"Anti-Matter","color":"Yellow","power":"Wild","who":"Main, Ally","when":"Any","text":"Ollessasi pääpelaaja tai liittolainen, kun toinen pelaaja yrittää käyttää yleisflarea, voit estää tämän. Voi käyttää vain yhtä flarea vastaan per yhteenotto."},
  {"name":"Anti-Matter","color":"Yellow","power":"Super","who":"Any","when":"Any","text":"Kun toinen pelaaja yrittää käyttää yleis- tai superflarea, voit estää tämän. Käytä vain yhtä flarea vastaan per yhteenotto."},
  {"name":"Barbarian","color":"Green","power":"Wild","who":"Main, Ally","when":"Resolution","text":"Kun saat joko hyvitystä tai palkinnon, voit katsoa kaikki saamasi kortit ja pistää pois ne kortit, mitä et halua"},
  {"name":"Barbarian","color":"Green","power":"Super","who":"Offensive ally","when":"Resolution","text":"Voit käyttää kykyäsi hyökkäyksen liittolaisena, jos puolesi voittaa. Voit silloin ryöstää puolustavan pelaajan kortit."},
  {"name":"Calculator","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Pääpelaajana, yhteenottokorttien valitsemisen jälkeen, mutta ennen niiden paljastamista, voit sanoa joko "},
  {"name":"Calculator","color":"Yellow","power":"Super","who":"Ally","when":"Planning","text":"Voit käyttää kykyäsi ollessasi liittolainen."}
];


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  const wildFlares = _.filter(_.propEq('power','Wild'), cosmicFlaresData);
  return wildFlares.filter(flare => regex.test(flare.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class FlareCardContainer extends Component {
  render() {

    if (this.props.cardShown == null) return(<div></div>);

    let isWild = _.whereEq({"name":this.props.cardShown, "power":"Wild"});
    let isSuper = _.whereEq({"name":this.props.cardShown, "power":"Super"});

    let wildFlareCard = _.filter(isWild, cosmicFlaresData)[0];
    let superFlareCard = _.filter(isSuper, cosmicFlaresData)[0];

    return (
      <FlareCard
        wildFlare={wildFlareCard}
        superFlare={superFlareCard}
      />
    );
  }
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      cardShown: null
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestionValue }) => {
    this.setState({
      flareCardShown: suggestionValue
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Kosminen haku",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        focusInputOnSuggestionClick={!isMobile}
        />


      <FlareCardContainer cardShown={this.state.flareCardShown}/>

      </div>

    );
  }
}

export default App;
