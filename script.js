document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "96bb753d4e7206be453cecf3df33dae8"; //for now it is hardcoded but in future we use env variables for security key
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    //it may throw an error
    //server is always in another continent
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    //fetch weather data from API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("Response is ", response);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    if (data.length === 0)
      //even if city is invalid it return empty arrray with response.ok = true
      throw new Error("City not found"); // therefore check length of data of JSON.
    return data;
  }
  function displayWeatherData(data) {
    //display weather data in the UI
    console.log(data);
    const { name, main, weather } = data;
    console.log(name, main, weather);
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp} degree celcius`;
    descriptionDisplay.textContent = `Weather is ${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
  function showError() {
    //show error message in the UI
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
