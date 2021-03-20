function formatDate(timestamp) {
  
  let now = new Date(timestamp);
  
  let date = now.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];
  return `${day} <br> ${date} ${month}`;
  }

  
  function formatTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`
   }  return `${hours}:${minutes}`
  }

   function formatSun(timestamp) {
     let date = new Date(timestamp);
     let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`
   }  return `${hours}:${minutes}`
  }


function displayTemperature(response) {
  console.log(response.data);

  let date = document.querySelector("h6")
  date.innerHTML = formatDate(response.data.dt * 1000);

  let time = document.querySelector("#current-time")
  time.innerHTML = formatTime(response.data.dt * 1000);
  
  let city = response.data.name;
  document.querySelector("#city").innerHTML = `${city}`;

  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  document.querySelector("#temperature").innerHTML = `${temperature}°`;
  

  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity ${humidity}%`;

  let weatherType = response.data.weather[0].description;
  document.querySelector("#weather-type").innerHTML = `${weatherType}`;

  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `Wind ${windSpeed}km/h`;

  let iconElement = document.querySelector("#main-icon");
let iconSelection = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src", 
    `https://openweathermap.org/img/wn/${iconSelection}@2x.png`);

    iconElement.setAttribute ("alt", response.data.weather[0].description);

let sunElement = document.querySelector("#sunrise-time")
sunElement.innerHTML = formatSun(response.data.sys.sunrise * 1000);

let sunsetElement = document.querySelector("#sunset-time");
sunsetElement.innerHTML = formatSun(response.data.sys.sunset * 1000);


let morningElement = Math.round(response.data.sys.temp.morn);
document.querySelector("#temperature-morning").innerHTML = `${morningElement}`;

let afternoonElement = Math.round(response.data.sys.temp.eve);
document.querySelector("#temperature-noon").innerHTML = `${afternoonElement}`;

let eveningElement = Math.round(response.data.sys.temp.night);
document.querySelector("#temperature-eve").innerHTML = `${eveningElement}`;
  }

  function displayForecast(response) {
    console.log(response.data);
  }

function search(city) {
  let apiKey = "4594a157e6721a9920f32ed09fef95d6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast)
}

search("Brisbane");

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#location-search");
  search(cityElement.value);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);

function cityLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "4594a157e6721a9920f32ed09fef95d6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);


}

function handleLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", handleLocation);


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemperature = null;



function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitSelection = document.querySelector("#fahrenheit");
fahrenheitSelection.addEventListener("click", convertToFahrenheit);

let celsiusSelection = document.querySelector("#celsius");
celsiusSelection.addEventListener("click", convertToCelsius);









