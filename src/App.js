import React, { useState } from "react";
import "./styles.css";

const api = {
  key: "b48543e991866c018e877672fce6d2ba",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [style, setStyle] = useState("");
  const [gender, setGender] = useState("");
  const [outfit, setOutfit] = useState("");
  const [outfitImage, setOutfitImage] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      if (!query || !style || !gender) {
        alert("Please fill in all fields.");
        return;
      }

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod !== 200) {
            alert("City not found. Please try again.");
            return;
          }

          setWeather(result);
          setQuery("");
          generateOutfit(result.main.temp);
        });
    }
  };

  const generateOutfit = (temp) => {
    let rec = "";
    let img = "";

    if (gender === "female") {
      if (style === "casual") {
        if (temp > 20) {
          rec = "1950s sundress with a cinched waist, cat-eye sunglasses, and ballet flats.";
          img = "/images/female-casual-warm.webp";
        } else if (temp > 10) {
          rec = "High-waisted capri pants with a cardigan and saddle shoes.";
          img = "/images/female-casual-mild.jpg";
        } else {
          rec = "Wool skirt suit, beret, and a structured coat with gloves.";
          img = "/images/female-casual-cold.jpg";
        }
      } else {
        if (temp > 20) {
          rec = "Elegant tea-length dress with pearls and kitten heels.";
          img = "/images/female-formal-warm.jpg";
        } else if (temp > 10) {
          rec = "Long-sleeve sheath dress with a swing coat and heeled pumps.";
          img = "/images/female-formal-mild.webp";
        } else {
          rec = "Wool overcoat, pencil skirt, gloves, and a vintage handbag.";
          img = "/images/female-formal-cold.webp";
        }
      }
    } else if (gender === "male") {
      if (style === "casual") {
        if (temp > 20) {
          rec = "Short-sleeved button-up shirt tucked into high-waisted trousers with loafers.";
          img = "/images/male-casual-warm.jpg";
        } else if (temp > 10) {
          rec = "Letterman jacket, cuffed jeans, and lace-up boots.";
          img = "/images/male-casual-mild.jpg";
        } else {
          rec = "Thick knit sweater under a pea coat with wool trousers and leather gloves.";
          img = "/images/male-casual-cold.jpg";
        }
      } else {
        if (temp > 20) {
          rec = "Lightweight sport coat over a collared shirt, suspenders, and polished shoes.";
          img = "/images/male-formal-warm.jpg";
        } else if (temp > 10) {
          rec = "Classic grey suit with a fedora and Oxford shoes.";
          img = "/images/male-formal-mild.jpg";
        } else {
          rec = "Double-breasted wool coat, scarf, and leather dress gloves.";
          img = "/images/male-formal-cold.webp";
        }
      }
    } else {
      if (style === "casual") {
        if (temp > 20) {
          rec = "Short-sleeve knit top, pleated slacks, and vintage sneakers.";
          img = "/images/neutral-casual-warm.jpg";
        } else if (temp > 10) {
          rec = "Cable-knit sweater, wide-leg trousers, and a bomber jacket.";
          img = "/images/neutral-casual-mild.jpg";
        } else {
          rec = "Wool duster coat, gloves, and sturdy vintage boots.";
          img = "/images/neutral-casual-cold.jpg";
        }
      } 
    }

    setOutfit(rec);
    setOutfitImage(img);
  };

  return (
    <div className="app vintage">
      <main>
        <h1>1950s Outfit Recommender</h1>
        <div className="options">
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">Select style</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <input
            type="text"
            className="search-bar"
            placeholder="Enter city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {weather && outfit && (
          <div className="results">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>{Math.round(weather.main.temp)}°C, {weather.weather[0].main}</p>
            <div className="outfit-box">
              <h3>Your 1950s Look:</h3>
              <p>{outfit}</p>
              {outfitImage && (
                <img
                  src={outfitImage}
                  alt="Vintage outfit"
                  className="outfit-image"
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
