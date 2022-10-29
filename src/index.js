function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "Februry",
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
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  return `${day}, ${month} ${now.getDate()}, ${now.getFullYear()}`;
}
function formatTime(now) {
  return `${now.getHours()}:${now.getMinutes()}`;
}

function showWeather(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let sky = document.querySelector("#sky");
  sky.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let visibility = document.querySelector("#visibility");
  visibility.innerHTML = Math.round(response.data.visibility / 1000);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function temperatureToCelsium(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 19;
}

function temperatureToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 66;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);
let button = document.querySelector("#current-button");
button.addEventListener("click", searchLocation);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(new Date());

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(new Date());
let celsium = document.querySelector("#celsius-link");
celsium.addEventListener("click", temperatureToCelsium);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", temperatureToFahrenheit);
