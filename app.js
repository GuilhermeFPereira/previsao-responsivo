// interacao
const citySearchInput = document.getElementById("city-search-bar")
const citySearchButton = document.getElementById("city-search-button")

// ixibicao
const currentDate = document.getElementById("current-date")
const cityName = document.getElementById("city-name")
const weatherIcon = document.getElementById("weather-icon")
const weatherDescription = document.getElementById("weather-description")
const currentTemperature = document.getElementById("current-temperature")
const windSpeed = document.getElementById("wind-speed")
const feelsLikeTemperature = document.getElementById("feels-like-temperature")
const currentHumidity = document.getElementById("current-humidity")
const sunriseTime = document.getElementById("sunrise-time")
const sunsetTime = document.getElementById("sunset-time")

const api_key = "baf5b9a8cf5e9a9a7906207b2e1b5130";

citySearchButton.addEventListener("click",() => {
  var cityName = citySearchInput.value
  getCityWeather(cityName)
})
// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}


navigator.geolocation.getCurrentPosition((position) => {
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    getCurrentLocationWeather(lat, lon)
    
},
(err) => {
    if(err.code === 1){
        alert('Geolocalização negada pelo usuário, busque manualmente pela cidade desejada.')
    } else{
        console.log(err)
    }
}
)

function getCurrentLocationWeather(lat , lon){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json() )
    .then((data) => displayWeather(data))

}


function getCityWeather(cityName){

    weatherIcon.src=`./assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json() )
    .then((data) => displayWeather(data)) 
}

function displayWeather (data){
    var { 
        dt,
        name,
        weather: [{icon, description}],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data

    currentDate.textContent = formatDate(dt)
    cityName.textContent = name

    weatherIcon.src=`./assets/${icon}.svg`

    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed  * 3.6 )}km`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;

    sunriseTime.textContent = formatTime(sunrise) ;
    sunsetTime.textContent = formatTime(sunset);
}

function formatDate (epochTime) {
    var date = new Date(epochTime * 1000)
    var formatteDate = date.toLocaleDateString('pt-BR', { month: "long", day: "numeric"}) 
    
    return `Hoje, ${formatteDate}`
}

function formatTime(epochTime){
    var date = new Date(epochTime * 1000)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    return `${hours}:${minutes}`
}