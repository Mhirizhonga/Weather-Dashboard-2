document.addEventListener("DOMContentLoaded", function () {
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_KEY = "0698e6ee1534490e088c24c085a18036" // API key for OpenWeatherMap API

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
     // Filter the forecast to get only one forecast per day.

    const uniqueForecastDays = []
    const fiveDayForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate()
        if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
        }
    });
    console.log(fiveDayForecast);
}).catch(() => {
    alert("An error occured while fetching the weather forecast!")
  });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user entered city name and remove extra spaces
    if(!cityName) return; // Return if cityName is empty

    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    // Get entered city coordinates (name, latitude, and longitude) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert (`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon)
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    });
}

searchButton.addEventListener("click", getCityCoordinates);
});