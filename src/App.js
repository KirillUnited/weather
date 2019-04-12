import React, { Component } from 'react';
import './App.css';

const PLACES = [
  { name: "Minsk", zip: "94303" },
  { name: "Moscow", zip: "94088" },
  { name: "St-Petersberg", zip: "95062" },
  { name: "Kiev", zip: "96803" }
];

class WeatherDisplay extends Component {
  render() {
    return (
      <h1>Displaying weather for city {this.props.zip}</h1>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    }
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        {PLACES.map((place, index) => (
          <button key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}>
            {place.name}
          </button>
        ))}
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </div>
    );
  }
}

export default App;
