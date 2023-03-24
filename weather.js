function setApiUrl(city) {
  const apiKey = "9be30e63468c8a8311237329b6cc70a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  return apiUrl;
}
function setDate() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let localDate = new Date();
  let month = months[localDate.getMonth()];
  let date = localDate.getDate();
  let day = days[localDate.getDay()];
  let hour = `0${localDate.getHours()}`.slice(-2);
  let min = `0${localDate.getMinutes()}`.slice(-2);
  let dateStr = `${month} ${date}, ${day} ${hour}:${min}`;
  document.querySelector("#date").textContent = dateStr;
}
function setWeatherAtrr(response) {
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let temp = Math.round(response.data.main.temp);
  let iconCode = response.data.weather[0].icon;

  document.querySelector("#city").textContent = city;
  document.querySelector("#description").textContent = description;
  document.querySelector("#humidity").textContent = humidity;
  document.querySelector("#wind").textContent = wind;
  document.querySelector("#temp").textContent = temp;
  document
    .querySelector("#temp-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  const apiKey = "9be30e63468c8a8311237329b6cc70a6";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function formatTime(timestamp) {
  let forecastdate = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastDay = forecastdate.getDay();
  return days[forecastDay];
}
function displayForecast(response) {
  let days = response.data.daily;
  let forecastRow = document.querySelector("#forecast-row");
  forecastContent = "";
  days.forEach((day, index) => {
    if (index > 0 && index < 7) {
      forecastContent =
        forecastContent +
        `          <div class="col-2 forecast-day">
            <p id="forecast-day">${formatTime(day.dt)}</p>
            <img class="pb-3 forecast-temp-icon" src="https://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="weather icon" />
            <p>
              ${Math.round(day.temp.max)}<sup>°</sup><span class="tab"></span
              ><span class="min">  ${Math.round(
                day.temp.min
              )}<sup>°</sup></span>
            </p>
          </div>`;
    }
  });
  forecastRow.innerHTML = forecastContent;
}

function setDafault() {
  setDate();
  axios.get(setApiUrl("Nigeria")).then(setWeatherAtrr);
}
setDafault();

function searchProcess(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-city");
  axios.get(setApiUrl(searchBox.value)).then(setWeatherAtrr);
  searchBox.value = null;
  setDate();
}

document.querySelector("form").addEventListener("submit", searchProcess);
document.querySelector("#searchBtn").addEventListener("click", searchProcess);

//Current Button functionality
function getCityName(response) {
  let cityName = response.data[0].name;
  axios.get(setApiUrl(cityName)).then(setWeatherAtrr);
}

function handleLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;

  let apiKey = "9be30e63468c8a8311237329b6cc70a6";
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=&appid=${apiKey}`;

  axios.get(apiUrl).then(getCityName);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(handleLocation);
}

document
  .querySelector("#currentBtn")
  .addEventListener("click", currentLocation);
