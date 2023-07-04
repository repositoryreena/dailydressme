import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const api = {
  key: "b48543e991866c018e877672fce6d2ba",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const audioRef = useRef(null);

  const search = (evt) => {
    if (evt.key === "Enter") {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}  ${year}`;
  };

  const playAudio = (weatherCondition, temperature) => {
    if (weatherCondition === "Snow" || weatherCondition === "Rain") {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio("/letitgo.mp3");
      audioRef.current.play();
    } else if (weatherCondition === "Clear" || weatherCondition === "Clouds") {
      if (temperature > 16) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = new Audio("/summer.mp3");
        audioRef.current.play();
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = new Audio("/letitgo.mp3");
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (typeof weather.weather !== "undefined" && typeof weather.main !== "undefined") {
      playAudio(weather.weather[0].main, weather.main.temp);
    }
  }, [weather]);

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="search-bar"
            placeholder="Enter city..."
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}ºc</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
      <audio ref={audioRef} id="audio">
        <source src="/summer.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
