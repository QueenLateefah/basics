let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
console.log(new Date());

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let timeNow = document.querySelector("#date");

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

timeNow.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather.main[1];
}
function find(city) {
  let apiKey = "9be30e63468c8a8311237329b6cc70a6";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
function search(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  find(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
//
function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9be30e63468c8a8311237329b6cc70a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric}`;
  axios.get(apiUrl).then(displayWeather);
}
function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", displayLocation);

//
function convertToCelsius() {
  let tempnum = document.querySelector("#temp");
  tempnum.innerHTML = "36°C";
}

function convertToFahrenheit() {
  let tempnu = document.querySelector("#temp");
  let fahren = Math.round((29 * 9) / 5 + 32);
  tempnu.innerHTML = `${fahren}°F`;
}

let celsius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");

celsius.addEventListener("click", convertToCelsius);
fahrenheit.addEventListener("click", convertToFahrenheit);
//Curren Location Search Engine
