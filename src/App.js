import React, { Component } from 'react';
import './App.css';

const WeatherDisplay = (props) => {
  return (
    <h1>Displaying weather for city {props.zip}</h1>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherDisplay zip={"12345"} />
      </div>
    );
  }
}

export default App;
