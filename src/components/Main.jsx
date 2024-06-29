import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import SearchIcon from "../assets/searching.png";
import { Row, Col, Container } from "react-bootstrap";
import { Moon, Hemisphere } from "lunarphase-js";
import Map from "./Map";
import tempIcon from "../assets/thermometer-celsius.svg";
import locationIcon from "../assets/location.svg";
import compassIcon from "../assets/compass.svg";
import windIcon from "../assets/wind.svg";
import humidityIcon from "../assets/humidity.svg";
import barometerIcon from "../assets/barometer.svg";
import sunriseIcon from "../assets/sunrise.svg";
import sunsetIcon from "../assets/sunset.svg";
import maxIcon from "../assets/pressure-high.svg";
import minIcon from "../assets/pressure-low.svg";
import visibilityIcon from "../assets/dust-wind.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import brandLOGO from "../assets/brandLOGO.png";
import SolarSVG from "./SolarSVG";

const Main = () => {
  const [userInput, setUserInput] = useState("");
  const [apiData, setApiData] = useState(null);
  const [currTime, setCurrTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchButton = (e) => {
    if (userInput.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    e.preventDefault();
    const options = {
      method: "GET",
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}/?key=DRPEATA6ECA9VJXNZ442MLMWM&unitGroup=metric`,
    };

    axios
      .get(options.url)
      .then((response) => {
        setLoading(false);
        setApiData(response.data);
        setError(null);
        setUserInput("");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setError("Failed to fetch weather data. Please try again later.");
        setApiData(null);
      });
  };

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { weekday: 'long' };
  return date.toLocaleDateString(undefined, options);
};

  const date = new Date();
  const phaseEmoji = Moon.lunarPhaseEmoji();
  const southernMoonPhase = Moon.lunarPhaseEmoji(date, {
    hemisphere: Hemisphere.SOUTHERN,
  });

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ zIndex: 1 }}
      >
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Container className="main-screen">
          <Row className="my-4">
            <Col className="text-center my-5" xs={12} md={!2}>
              <img src={brandLOGO} alt="" />
              <p
                className="my-4 tagline"
                style={{ letterSpacing: 2, color: "#fff" }}
              >
                Forecasting Your Day, One Cloud at a Time.
              </p>
            </Col>
            <Col xs={6} md={6}>
              <h4>Weather App</h4>
              <p>Enter a city name to get the current weather.</p>
            </Col>
            <Col className="text-end" xs={6} md={6}>
              <h4>Current Time</h4>
              <p>Today {currTime.toLocaleDateString()}</p>
              <p>{currTime.toLocaleTimeString()}</p>
            </Col>
          </Row>

          <Form onSubmit={handleSearchButton}>
            <Row className="my-5">
              <Col xs={9} md={10}>
                <Form.Control
                  type="text"
                  required
                  placeholder="Search City"
                  className="transparent-bg py-4"
                  aria-label="Search"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </Col>
              <Col xs={3} md={2}>
                <img
                  className="search-btn"
                  src={SearchIcon}
                  alt="search"
                  onClick={handleSearchButton}
                />
              </Col>
            </Row>
          </Form>
          {error && (
            <Row className="my-3">
              <Col className="text-center">
                <p className="text-light">{error}</p>
              </Col>
            </Row>
          )}

          {apiData  && (
            <Row>
              <Col className="mb-5" xs={12} md={6}>
                <Row>
                  <Col className="text-center mb-5" xs={12} md={12}>
                    Current Weather
                  </Col>

                  <Row>
                    <Col className="text-center mb-4 mb-sm-4" xs={12} md={6}>
                      <div className="glass-bg py-4">
                        <img
                          className="weather-icons"
                          src={locationIcon}
                          alt="location"
                        />
                        
                        <h4>
                          Lat: {apiData.latitude} <br /> Long: {apiData.longitude}
                        </h4>
                      </div>
                    </Col>

                    <Col className="text-center" xs={12} md={6}>
                      <div className="glass-bg py-4">
                        <img
                          className="weather-icons"
                          src={tempIcon}
                          alt="temperature"
                        />
                        <h3>
                          {apiData.currentConditions.temp}
                          °C
                        </h3>
                        <p>{apiData.currentConditions.conditions}</p>
                      </div>
                    </Col>
                    <Col className="text-center my-4 mb-sm-0" xs={12} md={12}>
                      <div className="glass-bg py-4">
                        <img
                          className="weather-icons mb-4"
                          src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/3rd%20Set%20-%20Color/${apiData.currentConditions.icon}.svg`}
                          alt="location"
                        />
                        <h3>{apiData.resolvedAddress}</h3>
                        
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col className="text-center my-5" xs={12} md={12}>
                    Wind Condition
                  </Col>

                  <Row>
                    <Col className="text-center" xs={6} md={6}>
                      <div className="p-4 glass-bg">
                        <img
                          className="weather-icons"
                          src={windIcon}
                          alt="temperature"
                        />
                        <h4>{apiData.currentConditions.windgust} kph</h4>
                        <p> Max Speed</p>
                      </div>
                    </Col>
                    <Col className="text-center" xs={6} md={6}>
                      <div className="p-4 glass-bg">
                        <img
                          className="weather-icons"
                          src={compassIcon}
                          alt="direction"
                        />
                        <h3>{apiData.currentConditions.winddir}°</h3>
                        <p> Direction</p>
                      </div>
                    </Col>
                    <Col className="text-center mt-4 " xs={12} md={12}>
                      <div className="p-4 glass-bg">
                        <img
                          className="weather-icons"
                          src={windIcon}
                          alt="wind speed"
                        />
                        <h3>{apiData.currentConditions.windspeed} kph</h3>
                        <p> Speed</p>
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col className="text-center my-5" xs={12} md={12}>
                    Atmosphere
                  </Col>

                  <Row>
                    <Col className="text-center" xs={6} md={6}>
                      <div className="p-4 glass-bg">
                        <img
                          className="weather-icons"
                          src={humidityIcon}
                          alt="humidity"
                        />
                        <h3>
                          {apiData.currentConditions.humidity} %
                        </h3>
                        <p>Humidity</p>
                      </div>
                    </Col>
                    <Col className="text-center" xs={6} md={6}>
                      <div className="p-4 glass-bg">
                        <img
                          className="weather-icons"
                          src={visibilityIcon}
                          alt="visibility"
                        />
                        <h3>
                          {apiData.currentConditions.visibility} km
                        </h3>
                        <p>Visibility</p>
                      </div>
                    </Col>
                    <Col className="text-center mt-4 " xs={12} md={12}>
                      <div className="p-4 glass-bg">
                        <img
                          className="weather-icons"
                          src={barometerIcon}
                          alt="pressure"
                        />
                        <h3>
                          {apiData.currentConditions.pressure} mb{" "}
                        </h3>
                        <p>Pressure</p>
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <SolarSVG />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row className="mb-5">
                  <Col className="text-center" xs={12} md={12}>
                    14 Day Forecast
                  </Col>
                </Row>
                <div className="scroll-container">
  {apiData.days &&
    apiData.days.slice(0, 13).map((item, index) => (
      <Row
        key={index}
        className="m-2 p-3 glass-bg align-items-center"
      >
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          <span
            className="mr-2 text-start"
            style={{ fontSize: "medium" }}
          >
            {formatDate(item.datetime)}
          </span>
          <div className="d-flex align-items-center">
            <img
              className="weekly-icons mr-1"
              src={maxIcon}
              alt="max temp"
            />
            <span className="mr-2">{item.tempmax}°</span>
          </div>
          <div className="d-flex align-items-center">
            <img
              className="weekly-icons mr-1"
              src={minIcon}
              alt="min temp"
            />
            <span className="mr-2">{item.tempmin}°</span>
          </div>
        </Col>
        <Col xs={12} className="d-flex justify-content-between align-items-center mt-2">
          <img
            height={35}
            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/3rd%20Set%20-%20Color/${apiData.currentConditions.icon}.svg`}
            alt="weather icon"
            className="mr-2"
          />
          <p className="mx-1 mt-3 text-center">{item.feelslike}°C</p>
          <p className="mx-0 mt-3 text-center">{item.conditions}</p>
        </Col>
      </Row>
    ))}
</div>


              </Col>
              <Row>
                <Col className="text-center my-5" xs={12} md={12}>
                  Astronomy
                </Col>

                <Row>
                  <Col className="text-center" xs={6} md={6}>
                    <div className="py-4 glass-bg">
                      <img
                        className="weather-icons"
                        src={sunriseIcon}
                        alt="sunrise"
                      />
                      <h3>{apiData.currentConditions.sunrise}</h3>
                      <p>Sunrise</p>
                    </div>
                  </Col>
                  <Col className="text-center" xs={6} md={6}>
                    <div className="py-4 glass-bg">
                      <img
                        className="weather-icons"
                        src={sunsetIcon}
                        alt="sunset"
                      />
                      <h3>{apiData.currentConditions.sunset}</h3>
                      <p>Sunset</p>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Row>
          )}
          {apiData && (
            <>
              <Row>
                <Col className="text-center my-5" xs={12} md={6}>
                  Geographical Exploration
                  <Row>
                    <Col xs={12} md={12} className="text-center my-5">
                      {apiData && (
                        <Map
                          lat={apiData.latitude}
                          lng={apiData.longitude}
                          src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/3rd%20Set%20-%20Color/${apiData.currentConditions.icon}.svg`}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col className="text-center my-5" xs={12} md={6}>
                  Today's Lunarphase
                  <Row>
                    <Col xs={12} md={12} className="text-center my-5 ">
                      <Row>
                        <span style={{ fontSize: 200 }}> {phaseEmoji}</span>
                        <p>Northern Hemisphere</p>
                        <p>{(apiData.currentConditions.moonphase * 100).toFixed(2)}% Moon Is Illuminated From North.</p>
                      </Row>
                      <Row>
                        <span style={{ fontSize: 200 }}>
                          {" "}
                          {southernMoonPhase}
                        </span>
                        <p>Southern Hemisphere</p>
                        <p>{(apiData.currentConditions.moonphase * 100).toFixed(2)}% Moon Is Illuminated From South.</p>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col className="text-center">Made With 🤍 By Preet Pandya</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Main;
