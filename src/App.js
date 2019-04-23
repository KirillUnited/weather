import React, { Component } from 'react';
import { NavItem, Nav, Container, Row, Col } from 'react-bootstrap';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import "bootswatch/dist/yeti/bootstrap.css";

const PLACES = [
  { name: "Минск", zip: "220000" },
  { name: "Москва", zip: "101000" },
  { name: "Санкт-Петербург", zip: "198097" },
  { name: "Киев", zip: "03134" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    }
  }
  componentDidMount() {
    const ZIP = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      ZIP +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&lang=ru&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const WEATHER_DATA = this.state.weatherData;
    if (!WEATHER_DATA) return <div>Загрузка...</div>;
    const WEATHER = WEATHER_DATA.weather[0];
    const DATE = new Date(WEATHER_DATA.dt * 1000).toLocaleTimeString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const ICON_URL = "http://openweathermap.org/img/w/" + WEATHER.icon + ".png";
    return (
      <div>
        <h2>
          <strong>{PLACES[this.props.activePlace].name}|{DATE}|{WEATHER.description.toUpperCase()}</strong>
          <img src={ICON_URL} alt={WEATHER_DATA.description} />
        </h2>
        <table class="table table-hover">
          <tbody>
            <tr className="table-light">
              <th scope="row">Сейчас:</th>
              <td>{WEATHER_DATA.main.temp}°C</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Максимальная:</th>
              <td>{WEATHER_DATA.main.temp_max}°C</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Минимальная:</th>
              <td>{WEATHER_DATA.main.temp_min}°C</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Скорость ветра:</th>
              <td>{WEATHER_DATA.wind.speed} м/с</td>
            </tr>
          </tbody>
        </table>
      </div>
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
    const ACTIVE_PLACE = this.state.activePlace;
    return (
      <div className="App">
        <Container>
          <h1 className="alert alert-info text-center">Погода online</h1>
        </Container>
        <Container>
          <Row>
            <Col md={4} sm={4}>
              <h5>Выберите город</h5>
              <Nav as="ul"
                className="flex-column"
                activeKey={ACTIVE_PLACE}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} as="li">
                    <Nav.Link eventKey={index} className="btn btn-info">{place.name}</Nav.Link>
                  </NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={ACTIVE_PLACE} activePlace={ACTIVE_PLACE} zip={PLACES[ACTIVE_PLACE].zip} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
