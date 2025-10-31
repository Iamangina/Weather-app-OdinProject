// Import styles and weather icons/backgrounds
import "./style.css";
import cloudy from "./images/weather_icons/cloudy.png";
import cloudyBack from "./images/weather_backgrounds/cloudy.jpg";
import cloudyNight from "./images/weather_icons/cloudy_night.png";
import cloudyNightBack from "./images/weather_backgrounds/cloudy_night.jpg";
import clear from "./images/weather_icons/sun.png";
import clearBack from "./images/weather_backgrounds/sun.jpg";
import clearNight from "./images/weather_icons/clear_night.png";
import clearNightBack from "./images/weather_backgrounds/clear_night.jpg";
import partlyCloudyDay from "./images/weather_icons/cloudy_day.png";
import partlyCloudyDayBack from "./images/weather_backgrounds/cloudy_day.jpg";
import rain from "./images/weather_icons/rain.png";
import rainBack from "./images/weather_backgrounds/rain.jpg";
import snow from "./images/weather_icons/snow.png";
import snowBack from "./images/weather_backgrounds/snow.jpg";
import fog from "./images/weather_icons/fog.png";
import fogBack from "./images/weather_backgrounds/fog.jpg";

// Mapping weather condition names to icons
const iconMap = {
  "clear-day": clear,
  "clear-night": clearNight,
  "cloudy": cloudy,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": cloudyNight,
  "rain": rain,
  "snow": snow,
  "fog": fog
};
// Mapping weather condition names to background images
const backgroundMap = {
  "clear-day": clearBack,
  "clear-night": clearNightBack,
  "cloudy": cloudyBack,
  "partly-cloudy-day": partlyCloudyDayBack,
  "partly-cloudy-night": cloudyNightBack,
  "rain": rainBack,
  "snow": snowBack,
  "fog": fogBack
};
 // Select main DOM elements  
let body = document.querySelector('body');
let searchValue = document.querySelector('#search');
let cityName = document.querySelector('.city');
let searchBtn = document.querySelector('.magnify');
let weatherIcon = document.querySelector('.imgWeather');

// Hourly forecast icons
let hour1Icon = document.querySelector('.imgHour1');
let hour2Icon = document.querySelector('.imgHour2');
let hour3Icon = document.querySelector('.imgHour3');
let hour4Icon = document.querySelector('.imgHour4');

// Daily forecast icons
let day1Icon = document.querySelector('.imgDay1');
let day2Icon = document.querySelector('.imgDay2');
let day3Icon = document.querySelector('.imgDay3');
let day4Icon = document.querySelector('.imgDay4');
let day5Icon = document.querySelector('.imgDay5');

let btnSwitch = document.querySelector('.FC');

// Default city and unit system
let currentCity = 'Reykjavik';
let currentTemp = 'metric';

// Fetch and display weather data
async function checkWeather(city) {
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${currentTemp}&include=hours,current&key=PPTXDFZWH6FVBS3ZQ3EWVHF3A&contentType=json`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Choose units and labels based on system
    const unit = currentTemp === "metric" ? "°C" : "°F";
    const speed = currentTemp === "metric" ? "km/h" : "mph";

    // Current conditions
    document.querySelector('.todayDate').innerHTML = data.days[0].datetime;
    document.querySelector('.temp').innerHTML = Math.round(data.currentConditions.temp) + unit;
    cityName.textContent = data.resolvedAddress; 
    document.querySelector('.wind').innerHTML = Math.round(data.currentConditions.windspeed) + speed;
    document.querySelector('.humidity').innerHTML = data.currentConditions.humidity + '%';
    document.querySelector('.feelsLike').innerHTML = 'Feels like: ' + Math.round(data.currentConditions.feelslike)+ unit;

    // Hourly forecast (4 key times)
    const hourIndexes = [3, 9, 15, 21];

    hourIndexes.forEach((hourIndex, i) => {
        document.querySelector(`.temp${i + 1}`).innerHTML = Math.round(data.days[0].hours[hourIndex].temp) + unit;
        document.querySelector(`.hour${i}`).innerHTML = new Date(`2000-01-01T${data.days[0].hours[hourIndex].datetime}`)
            .toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
            .toLowerCase();
    });

    // 5-day forecast
    const dayIndexes = [1, 2, 3, 4, 5];

    dayIndexes.forEach((dayIndex, i) => {
        document.querySelector(`.dayTemp${i+1}`).innerHTML = Math.round(data.days[dayIndex].temp) + unit;
        document.querySelector(`.day${i+1}`).innerHTML = new Date(data.days[dayIndex].datetime)
            .toLocaleDateString('en-US', {day: 'numeric', month: 'long'});
    });

    // Set main weather icon and background
    const weatherIconName = data.currentConditions.icon;
    weatherIcon.src = iconMap[weatherIconName] || clear;
    body.style.backgroundImage = `url(${backgroundMap[weatherIconName]})`;

    // Set hourly weather icons
    const hourIcon1Name = data.days[0].hours[3].icon;
    hour1Icon.src = iconMap[hourIcon1Name] || clear;

    const hourIcon2Name = data.days[0].hours[9].icon;
    hour2Icon.src = iconMap[hourIcon2Name] || clear;

    const hourIcon3Name = data.days[0].hours[15].icon;
    hour3Icon.src = iconMap[hourIcon3Name] || clear;

    const hourIcon4Name = data.days[0].hours[21].icon;
    hour4Icon.src = iconMap[hourIcon4Name] || clear;

    // Set daily weather icons
    const dayIcon1Name = data.days[1].icon;
    day1Icon.src = iconMap[dayIcon1Name] || clear;
    
    const dayIcon2Name = data.days[2].icon;
    day2Icon.src = iconMap[dayIcon2Name] || clear;
   
    const dayIcon3Name = data.days[3].icon;
    day3Icon.src = iconMap[dayIcon3Name] || clear;

    const dayIcon4Name = data.days[4].icon;
    day4Icon.src = iconMap[dayIcon4Name] || clear;

    const dayIcon5Name = data.days[5].icon;
    day5Icon.src = iconMap[dayIcon5Name] || clear;

  } catch (error) {
    console.error("Error loading weather", error);
    document.querySelector('.temp').innerHTML = 'Error loading weather';
  }
}
// Load default city on page start
checkWeather(currentCity);

// Handle city search by button click
searchBtn.addEventListener('click', function(){
  const city = searchValue.value.trim(); 
  if (city) {
    checkWeather(city);
    currentCity = searchValue.value.trim();
    searchValue.value = '';
  }

});
// Handle city search by pressing Enter
searchValue.addEventListener('keydown', function(event){
if (event.key === "Enter") {
  const city = searchValue.value.trim(); 
  if (city) {
    checkWeather(city);
    currentCity = searchValue.value.trim();
    searchValue.value = '';
  }
  }
});
// Handle unit switch (°C / °F)
btnSwitch.addEventListener('click', function(){
    if(currentTemp === 'metric'){
        currentTemp = 'us';
        btnSwitch.textContent = '°C';
    } else if (currentTemp === 'us'){
        currentTemp = 'metric';
        btnSwitch.textContent = '°F';
    }
    checkWeather(currentCity);
})

