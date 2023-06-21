// WEATHER
let dom = document;
dom.addEventListener("DOMContentLoaded", function() {
  const weatherDemo = dom.getElementById("weather-demo");
  const apiKey = "e8c85f0a52927734e8ef25087f99ec6c";
  const searchForm = dom.getElementById("search-form");
  const searchInput = dom.getElementById("search-input");

  const defaultCities = ["London", "New York", "Tokyo"];
  const maxDisplayedCities = 3;
  const displayedCities = [];

  // Display weather for default cities
  defaultCities.forEach(function(city) {
    fetchWeatherData(city)
    .then(function(data) {
      const card = createWeatherCard(data);
      weatherDemo.appendChild(card);
      displayedCities.push(city);
    })
    .catch(function(error) {
      console.log(`Error fetching weather data for ${city}:`, error);
    });
  });

  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city !== "") {
      fetchWeatherData(city)
      .then(function(data) {
        const card = createWeatherCard(data);
        displayedCities.push(city);
        if (displayedCities.length > maxDisplayedCities) {
          const cityToRemove = displayedCities.shift();
          const cardToRemove = dom.getElementById(cityToRemove);
          weatherDemo.removeChild(cardToRemove);
        }
        weatherDemo.appendChild(card);
      })
      .catch(function(error) {
        console.log(`Error fetching weather data for ${city}:`, error);
      });
    }
  });

  function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    return fetch(apiUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`Weather data for ${city} not available`);
      }
      return response.json();
    });
  }

  function createWeatherCard(data) {
    const card = dom.createElement("div");
    card.id = data.name; // Set the id of the card as the city name
    card.classList.add("bg-white", "rounded-lg", "p-4", "text-center");

    const icon = dom.createElement("i");
    icon.classList.add("fas", `fa-${getWeatherIcon(data.weather[0].icon)}`, "text-5xl", "mb-4");

    const temperature = dom.createElement("p");
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    temperature.classList.add("text-2xl");

    const city = dom.createElement("p");
    city.textContent = data.name;
    city.classList.add("text-lg", "font-bold", "mb-2");

    const description = dom.createElement("p");
    description.textContent = data.weather[0].description;
    description.classList.add("text-gray-500");

    card.appendChild(icon);
    card.appendChild(temperature);
    card.appendChild(city);
    card.appendChild(description);

    return card;
  }

  function getWeatherIcon(iconCode) {
    // Map OpenWeatherMap icon codes to corresponding FontAwesome icons
    const iconMappings = {
      "01d": "sun",
      "01n": "moon",
      "02d": "cloud-sun",
      "02n": "cloud-moon",
      "03d": "cloud",
      "03n": "cloud",
      "04d": "cloud",
      "04n": "cloud",
      "09d": "cloud-showers-heavy",
      "09n": "cloud-showers-heavy",
      "10d": "cloud-rain",
      "10n": "cloud-rain",
      "11d": "bolt",
      "11n": "bolt",
      "13d": "snowflake",
      "13n": "snowflake",
      "50d": "smog",
      "50n": "smog",
    };

    return iconMappings[iconCode] || "question";
  }
});