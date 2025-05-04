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
  const [productLink, setProductLink] = useState("");

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
    let link = "";

    if (gender === "female") {
      if (style === "casual") {
        if (temp > 20) {
          rec = "1950s sundress with a cinched waist, cat-eye sunglasses, and ballet flats.";
          img = "/images/female-casual-warm.webp";
          link = "https://www.unique-vintage.com/products/dolly-dotty-1950s-black-white-polka-dot-cindy-swing-dress?variant=42028027576422&country=US&currency=USD&utm_source=chatgpt.com"; // Correct link
        } else if (temp > 10) {
          rec = "High-waisted capri pants with a cardigan and saddle shoes.";
          img = "/images/female-casual-mild.jpg";
          link = "https://www.unique-vintage.com/products/unique-vintage-plus-size-black-high-waist-rachelle-capri-pants?variant=15860986642534&_gsid=bzVZq4fRgi2s&utm_source=chatgpt.com"; // Correct link
        } else {
          rec = "Wool skirt suit, beret, and a structured coat with gloves.";
          img = "/images/female-casual-cold.jpg";
          link = "https://www.etsy.com/listing/262683963/1950s-caramel-wool-skirt-suit-50s-tan?gpla=1&gao=1&utm_source=chatgpt.com"; // Correct link for wool skirt suit
        }
      } else {
        if (temp > 20) {
          rec = "Elegant tea-length dress with pearls and kitten heels.";
          img = "/images/female-formal-warm.jpg";
          link = "https://www.unique-vintage.com/products/1950s-cream-pink-floral-frances-swing-dress?variant=40875995660390&country=US&currency=USD&utm_source=chatgpt.com"; // Correct link
        } else if (temp > 10) {
          rec = "Long-sleeve sheath dress with a swing coat and heeled pumps.";
          img = "/images/female-formal-mild.webp";
          link = "https://shopxiaolizi.com/products/1950s-vintage-inspired-swing-red-wool-coat-4613?variant=41210795884614&_gsid=dxmMPqsLFviu&utm_source=chatgpt.com"; // Correct link
        } else {
          rec = "Wool overcoat, pencil skirt, gloves, and a vintage handbag.";
          img = "/images/female-formal-cold.webp";
          link = "https://www.etsy.com/listing/1097113253/1950s-vintage-inspired-swing-coat-red?gpla=1&gao=1&utm_source=chatgpt.com"; // Correct link
        }
      }
    } else if (gender === "male") {
      if (style === "casual") {
        if (temp > 20) {
          rec = "Short-sleeved button-up shirt tucked into high-waisted trousers with loafers.";
          img = "/images/male-casual-warm.jpg";
          link = "https://www.yiume.com/products/hawaiian-shirt-for-men-dandelions-and-dragonflies-by-silver-steer-design-button-down-shirt-short-sleeve-100-cotton-shirt?variant=42147334553683&_gsid=tEw32GAwXvQT&utm_source=chatgpt.com"; // Correct link
        } else if (temp > 10) {
          rec = "Letterman jacket, cuffed jeans, and lace-up boots.";
          img = "/images/male-casual-mild.jpg";
          link = "https://www.thrifted.com/products/stewart-strauss-varsity-jacket-mens-black-large-15820-a?variant=55217585455491"; // Correct link
        } else {
          rec = "Thick knit sweater under a pea coat with wool trousers and leather gloves.";
          img = "/images/male-casual-cold.jpg";
          link = "https://www.amazon.com/Wantdo-Winter-Stylish-Military-Peacoat/dp/B0C2TZLG61?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A3F9O2GSOZDPIJ&utm_source=chatgpt.com&th=1&psc=1"; // Correct link
        }
      } else {
        if (temp > 20) {
          rec = "Lightweight sport coat over a collared shirt, suspenders, and polished shoes.";
          img = "/images/male-formal-warm.jpg";
          link = "https://rodeo-japan-pine-avenue.com/products/sugar-cane-sports-jacket-mens-casual-1950s-style-lightweight-unlined-cotton-windbreaker-sc15616-165-red?variant=45703382663404&_gsid=qPVSBhHnFiNu&utm_source=chatgpt.com"; // Correct link
        } else if (temp > 10) {
          rec = "Classic grey suit with a fedora and Oxford shoes.";
          img = "/images/male-formal-mild.jpg";
          link = "https://stacksvintage.com/en-us/products/grey-3-piece?variant=45831799668984&country=US&currency=USD&utm_source=chatgpt.com"; // Correct link
        } else {
          rec = "Double-breasted wool coat, scarf, and leather dress gloves.";
          img = "/images/male-formal-cold.webp";
          link = "https://www.ralphlauren.com/men-clothing-jackets-coats-vests/polo-wool-blend-melton-peacoat/0043340462.html?utm_source=chatgpt.com"; // Correct link
        }
      }
    } else {
      if (style === "casual") {
        if (temp > 20) {
          rec = "Short-sleeve knit top, pleated slacks, and vintage sneakers.";
          img = "/images/neutral-casual-warm.jpg";
          link = "https://www.uniquevintage.com/products/knit-top"; // Correct link
        } else if (temp > 10) {
          rec = "Cable-knit sweater, wide-leg trousers, and a bomber jacket.";
          img = "/images/neutral-casual-mild.jpg";
          link = "https://www.uniquevintage.com/products/wide-leg-trousers"; // Correct link
        } else {
          rec = "Wool duster coat, gloves, and sturdy vintage boots.";
          img = "/images/neutral-casual-cold.jpg";
          link = "https://www.uniquevintage.com/products/wool-duster-coat"; // Correct link
        }
      }
    }

    setOutfit(rec);
    setOutfitImage(img);
    setProductLink(link);
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
                <div>
                  <a href={productLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={outfitImage}
                      alt="Vintage outfit"
                      className="outfit-image"
                    />
                  </a>
                  <p>Click the image to shop this look!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
