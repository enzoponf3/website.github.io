
const WEATHER_API_KEY = "6ae46840e17f448dea93d24a83a21d6a"

let form = document.getElementById("city-form")

form.addEventListener("submit", e =>{
    e.preventDefault()
    getWeather()
})

function fillWeather(data,city){
    let weatherCont = document.getElementById("weather-container")
    let contDaysPredict = 1
    let predict = document.getElementById("weather-prediction")
    predict.innerHTML=''
    var d = new Date();
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    while(contDaysPredict != 6 ){
        let dayPredict = document.createElement("div")
        dayPredict.classList.add("daily-prediction")
        dayPredict.innerHTML = `
                                <span>
                                    <img  class='daily-icon' src='http://openweathermap.org/img/wn/${data.daily[contDaysPredict].weather[0].icon}@2x.png' alt='dayPredictionIcon'>
                                </span>
                                <div> 
                                    ${Math.trunc(data.daily[contDaysPredict].temp.min)}° / ${Math.trunc(data.daily[contDaysPredict].temp.max)}°
                                </div>
                                <span>${days[(d.getDay() + contDaysPredict)]}</span>
                                `
        predict.appendChild(dayPredict)
        contDaysPredict = contDaysPredict + 1
        
    }
    weatherCont.innerHTML = ''
    weatherCont.innerHTML = `
                            <span>${city}</span>
                            <div class='current-weather'>
                                <span>
                                    <img class='current-icon'id='current-weather-icon' src='http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'alt='weather-icon'>
                                </span>
                            <div class='current-information'>
                                <span>${Math.trunc(data.current.temp)}°</span>
                                <span> ${Math.trunc(data.daily[0].temp.min)}° / ${Math.trunc(data.daily[0].temp.max)}°</span>
                        
                            </div>
                            </div>
                            `
    weatherCont.appendChild(predict)
    

}

function getWeather (){
    let cityValue = (document.getElementById("city-input")).value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${WEATHER_API_KEY}`)
    .then(r => r.json())
    .then(city => {
        getWeatherByCoords(city.coord.lat,city.coord.lon,cityValue)
    }) 
}

function getWeatherByCoords(latitude, longitude,city){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
    exclude=minutely,hourly&appid=${WEATHER_API_KEY}&units=metric`)
    .then(r=>r.json())
    .then(d=>fillWeather(d,city))
}

window.onload = () => {
    fetch(`http://ip-api.com/json/?fields=city,lat,lon`)
    .then(r=>r.json())
    .then(d=>getWeatherByCoords(d.lat,d.lon,d.city))
    }