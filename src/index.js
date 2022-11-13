function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday",
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
    "December",
  ];
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  return `${day}, ${month} ${now.getDate()}, ${now.getFullYear()}`;
}
function formatTime(now) {
  return `${now.getHours()}:${now.getMinutes()}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  console.log(date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday",
  ];
  console.log(days[day]);
  return days[day];
}

function displayWeekForecast(response) {
  let forecast = response.data.daily;
  console.log(formatDay(response.data.current.dt));
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row text-center">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 7)) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 day">
            <div class="week-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="${forecastDay.weather[0].main}"
              width="42"
            />
            <div class="week-forecast-temps">
              <span class="week-forecast-temp-max"> ${Math.round(
                forecastDay.temp.max
              )}°C </span>
              <span class="week-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°C</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeekForecast);
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
  celsiumTemp = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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
  temperature.innerHTML = Math.round(celsiumTemp);
}

function temperatureToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round((celsiumTemp * 9) / 5 + 32);
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

let celsiumTemp = null;
let city = "Kyiv";
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);

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
