function refreshWeather(response) {
    let temperatureElement = document.querySelector("#weather-app-temperature");
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#weather-condition-description");
    let humidtiyElement = document.querySelector("#weather-humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidtiyElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function formatDate(date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes}`
}

function searchCity(city) {
    let apiKey = "a94e4c1010f1fft4fo7ec35a0a8d91bc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
    let days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon']
    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml = forecastHtml + `
            <div class="weather-forecast-day">
                        <div class="weather-forecast-date">
                            ${day}
                        </div> 
                        <div class="weather-forecast-icon">
                            🌤️
                        </div>
                        <div class="weather-forecast-temperatures">
                            <div class="weather-forecast-temperature">
                                <strong>15°</strong>
                            </div> 
                            <div class="weather-forecast-temperature">
                                9°
                            </div>
                        </div>
            </div>
         `;
    })

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

searchCity("Berlin");
displayForecast();