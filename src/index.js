let now = new Date();

let h6 = document.querySelector("h6");

let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay(days)];

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
let month = months[now.getMonth(months)];

h6.innerHTML = `${day} ${date} ${month} ${year}`;

function displayTemperature(response) {
  let cityName = response.data.name;
  document.querySelector("#city").innerHTML = `${cityName}`;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°`;

  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity ${humidity}%`;

  let weatherType = response.data.weather[0].main;
  document.querySelector("#weather-type").innerHTML = `${weatherType}`;

  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `Wind ${windSpeed}km/h`;
}

function search(city) {
  let apiKey = "4594a157e6721a9920f32ed09fef95d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-search").value;
  search(city);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);

function currentPositionSearch(position) {
  let apiKey = "4594a157e6721a9920f32ed09fef95d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPositionSearch);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayTemperature);

search("Brisbane");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 75;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 24;
}

let fahrenheitSelection = document.querySelector("#fahrenheit");
fahrenheitSelection.addEventListener("click", convertToFahrenheit);

let celsiusSelection = document.querySelector("#celsius");
celsiusSelection.addEventListener("click", convertToCelsius);
