<<<<<<< HEAD
//new inputs
const cityInput = document.querySelector("input");
const citySelected = document.getElementById("city-name");
const cityInfoBox = document.getElementById("city-info");
const searchButton = document.getElementById("button-one");
const searchedCityBox = document.getElementById("searched-cities");
const today = moment().format("MM/DD/YYYY");
=======
const apiKey = "e70acb7695bda46605fbd933eba249ac6";
const cityInput = document.getElementById("city");
const inputButton = document.getElementById("srchbttn");
const cityList = JSON.parse(localStorage.getItem("City")) || [];

// Fetch and display weather data
function fetchAndDisplayWeather(city) {
  const dataExist = document.getElementById("weatherDisplay");
  dataExist.innerHTML = "";
  const fiveDayExist = document.getElementById("FiveDayForecast");
  fiveDayExist.innerHTML = "";
  const apiKey = "e70acb7695bda46605fbd933eba249ac6";
  const geoCode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(geoCode)
    .then((res) => res.json())
    .then((data) => {
      const [{ lat, lon }] = data;
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const {
            current: { temp, dt, humidity, wind_speed },
            daily,
          } = data;
          const { id } = data.current.weather[0];

          const cityDate = new Date(dt * 1000).toLocaleDateString();
          const cityTitle = document.getElementById("weatherDisplay");
          const cityDisplay = document.createElement("h2");
          const cityTemp = document.createElement("p");
          const cityWind = document.createElement("p");
          const cityHum = document.createElement("p");

          cityDisplay.innerHTML = `${city} ${cityDate}`;
          cityTemp.innerHTML = `Temp: ${Math.round(temp * 1.8) + 32}\u00B0F`;
          cityWind.innerHTML = `Wind: ${wind_speed} mph`;
          cityHum.innerHTML = `Humidity: ${humidity}%`;
          cityTitle.appendChild(cityDisplay);
          cityTitle.appendChild(cityTemp);
          cityTitle.appendChild(cityWind);
          cityTitle.appendChild(cityHum);

          for (let i = 1; i <= 5; i++) {
            const day = daily[i];
            const forecastDate = new Date(day.dt * 1000).toLocaleDateString();
            const forecastEmoji = day.weather[0].id;
            const forecastTemp = Math.round(day.temp.day);
            const forecastWind = day.wind_speed;
            const forecastHum = day.humidity;

            const fiveDayDiv = document.createElement("div");
            fiveDayDiv.classList.add("forecastDay");

            const fiveDayDisplay = document.createElement("h4");
            const fiveDayTemp = document.createElement("p");
            const fiveDayWind = document.createElement("p");
            const fiveDayHum = document.createElement("p");

            fiveDayDisplay.innerHTML = `${forecastDate}`;

            fiveDayTemp.innerHTML = `Temp: ${
              Math.round(forecastTemp * 1.8) + 32
            }\u00B0F`;
            fiveDayWind.innerHTML = `Wind: ${forecastWind} mph`;
            fiveDayHum.innerHTML = `Humidity: ${forecastHum}%`;

            fiveDayDiv.appendChild(fiveDayDisplay);
            fiveDayDiv.appendChild(fiveDayTemp);
            fiveDayDiv.appendChild(fiveDayWind);
            fiveDayDiv.appendChild(fiveDayHum);

            fiveDayExist.appendChild(fiveDayDiv);
          }
        });
    });
}

inputButton.addEventListener("click", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
  } else if (!cityList.includes(city)) {
    cityList.push(city);
    localStorage.setItem("City", JSON.stringify(cityList));
    fetchAndDisplayWeather(city);
    cityInput.value = "";
  }
});
>>>>>>> 7f4e452e375253a14dae3019f067b75a4e6ac071
