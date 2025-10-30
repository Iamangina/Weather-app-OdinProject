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
   
let body = document.querySelector('body');
let searchValue = document.querySelector('#search');
let cityName = document.querySelector('.city');
let searchBtn = document.querySelector('.magnify');
let weatherIcon = document.querySelector('.imgWeather');

let hour1Icon = document.querySelector('.imgHour1');
let hour2Icon = document.querySelector('.imgHour2');
let hour3Icon = document.querySelector('.imgHour3');
let hour4Icon = document.querySelector('.imgHour4');

let day1Icon = document.querySelector('.imgDay1');
let day2Icon = document.querySelector('.imgDay2');
let day3Icon = document.querySelector('.imgDay3');
let day4Icon = document.querySelector('.imgDay4');
let day5Icon = document.querySelector('.imgDay5');

let btnSwitch = document.querySelector('.FC');

let currentCity = 'Reykjavik';

let currentTemp = 'metric';

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


async function checkWeather(city) {
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${currentTemp}&include=hours,current&key=PPTXDFZWH6FVBS3ZQ3EWVHF3A&contentType=json`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const unit = currentTemp === "metric" ? "°C" : "°F";
    const speed = currentTemp === "metric" ? "km/h" : "mph";

    document.querySelector('.todayDate').innerHTML = data.days[0].datetime;
    document.querySelector('.temp').innerHTML = Math.round(data.currentConditions.temp) + unit;
    cityName.textContent = data.resolvedAddress; 
    document.querySelector('.wind').innerHTML = Math.round(data.currentConditions.windspeed) + speed;
    document.querySelector('.humidity').innerHTML = data.currentConditions.humidity + '%';
    document.querySelector('.feelsLike').innerHTML = 'Feels like: ' + Math.round(data.currentConditions.feelslike)+ unit;

    document.querySelector('.temp1').innerHTML = Math.round(data.days[0].hours[3].temp) + unit;
    document.querySelector('.hour0').innerHTML = new Date(`2000-01-01T${data.days[0].hours[3].datetime}`).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
    document.querySelector('.temp2').innerHTML = Math.round(data.days[0].hours[9].temp) + unit;
    document.querySelector('.hour1').innerHTML = new Date(`2000-01-01T${data.days[0].hours[9].datetime}`).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
    document.querySelector('.temp3').innerHTML = Math.round(data.days[0].hours[15].temp) + unit;
    document.querySelector('.hour2').innerHTML = new Date(`2000-01-01T${data.days[0].hours[15].datetime}`).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
    document.querySelector('.temp4').innerHTML = Math.round(data.days[0].hours[21].temp) + unit;
    document.querySelector('.hour3').innerHTML = new Date(`2000-01-01T${data.days[0].hours[21].datetime}`).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
    
    document.querySelector('.dayTemp1').innerHTML = Math.round(data.days[1].temp) + unit;
    document.querySelector('.day1').innerHTML = new Date(data.days[1].datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    document.querySelector('.dayTemp2').innerHTML = Math.round(data.days[2].temp) + unit;
    document.querySelector('.day2').innerHTML = new Date(data.days[2].datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    document.querySelector('.dayTemp3').innerHTML = Math.round(data.days[3].temp) + unit;
    document.querySelector('.day3').innerHTML = new Date(data.days[3].datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    document.querySelector('.dayTemp4').innerHTML = Math.round(data.days[4].temp) + unit;
    document.querySelector('.day4').innerHTML = new Date(data.days[4].datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    document.querySelector('.dayTemp5').innerHTML = Math.round(data.days[5].temp) + unit;
    document.querySelector('.day5').innerHTML = new Date(data.days[5].datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

    if(data.currentConditions.icon === "cloudy"){
        weatherIcon.src = cloudy;
        body.style.backgroundImage = `url(${cloudyBack})`; 
    } else if (data.currentConditions.icon === "partly-cloudy-night"){
        weatherIcon.src = cloudyNight;
        body.style.backgroundImage = `url(${cloudyNightBack})`; 
    } else if (data.currentConditions.icon === "clear-day"){
        weatherIcon.src = clear;
        body.style.backgroundImage = `url(${clearBack})`; 
    } else if (data.currentConditions.icon === "clear-night"){
        weatherIcon.src = clearNight;
        body.style.backgroundImage = `url(${clearNightBack})`; 
    } else if (data.currentConditions.icon === "partly-cloudy-day"){
        weatherIcon.src = partlyCloudyDay;
        body.style.backgroundImage = `url(${partlyCloudyDayBack})`; 
    } else if (data.currentConditions.icon === "rain"){
        weatherIcon.src = rain;
        body.style.backgroundImage = `url(${rainBack})`; 
    } else if (data.currentConditions.icon === "snow"){
        weatherIcon.src = snow;
        body.style.backgroundImage = `url(${snowBack})`;
    }  else if (data.currentConditions.icon === "fog"){
        weatherIcon.src = fog;
        body.style.backgroundImage = `url(${fogBack})`;
    }    

    if(data.days[0].hours[3].icon === "clear-night"){
        hour1Icon.src = clearNight;
    } else if (data.days[0].hours[3].icon === "cloudy"){
        hour1Icon.src = cloudy;
    } else if (data.days[0].hours[3].icon === "fog"){
        hour1Icon.src = fog;
    } else if (data.days[0].hours[3].icon === "snow"){
        hour1Icon.src = snow;
    } else if (data.days[0].hours[3].icon === "rain"){
        hour1Icon.src = rain;
    } else if (data.days[0].hours[3].icon === "partly-cloudy-day"){
        hour1Icon.src = partlyCloudyDay;
    } else if (data.days[0].hours[3].icon === "clear-day"){
        hour1Icon.src = clear;
    } else if (data.days[0].hours[3].icon === "partly-cloudy-night"){
        hour1Icon.src = cloudyNight;
    }

    if(data.days[0].hours[9].icon === "clear-night"){
        hour2Icon.src = clearNight;
    } else if (data.days[0].hours[9].icon === "cloudy"){
        hour2Icon.src = cloudy;
    } else if (data.days[0].hours[9].icon === "fog"){
        hour2Icon.src = fog;
    } else if (data.days[0].hours[9].icon === "snow"){
        hour2Icon.src = snow;
    } else if (data.days[0].hours[9].icon === "rain"){
        hour2Icon.src = rain;
    } else if (data.days[0].hours[9].icon === "partly-cloudy-day"){
        hour2Icon.src = partlyCloudyDay;
    } else if (data.days[0].hours[9].icon === "clear-day"){
        hour2Icon.src = clear;
    } else if (data.days[0].hours[9].icon === "partly-cloudy-night"){
        hour2Icon.src = cloudyNight;
    }

    if(data.days[0].hours[15].icon === "clear-night"){
        hour3Icon.src = clearNight;
    } else if (data.days[0].hours[15].icon === "cloudy"){
        hour3Icon.src = cloudy;
    } else if (data.days[0].hours[15].icon === "fog"){
        hour3Icon.src = fog;
    } else if (data.days[0].hours[15].icon === "snow"){
        hour3Icon.src = snow;
    } else if (data.days[0].hours[15].icon === "rain"){
        hour3Icon.src = rain;
    } else if (data.days[0].hours[15].icon === "partly-cloudy-day"){
        hour3Icon.src = partlyCloudyDay;
    } else if (data.days[0].hours[15].icon === "clear-day"){
        hour3Icon.src = clear;
    } else if (data.days[0].hours[15].icon === "partly-cloudy-night"){
        hour3Icon.src = cloudyNight;
    }

    if(data.days[0].hours[21].icon === "clear-night"){
        hour4Icon.src = clearNight;
    } else if (data.days[0].hours[21].icon === "cloudy"){
        hour4Icon.src = cloudy;
    } else if (data.days[0].hours[21].icon === "fog"){
        hour4Icon.src = fog;
    } else if (data.days[0].hours[21].icon === "snow"){
        hour4Icon.src = snow;
    } else if (data.days[0].hours[21].icon === "rain"){
        hour4Icon.src = rain;
    } else if (data.days[0].hours[21].icon === "partly-cloudy-day"){
        hour4Icon.src = partlyCloudyDay;
    } else if (data.days[0].hours[21].icon === "clear-day"){
        hour4Icon.src = clear;
    } else if (data.days[0].hours[21].icon === "partly-cloudy-night"){
        hour4Icon.src = cloudyNight;
    }

    // WEEK WEATHER
    if(data.days[1].icon === "clear-night"){
        day1Icon.src = clearNight;
    } else if (data.days[1].icon === "cloudy"){
        day1Icon.src = cloudy;
    } else if (data.days[1].icon === "fog"){
        day1Icon.src = fog;
    } else if (data.days[1].icon === "snow"){
        day1Icon.src = snow;
    } else if (data.days[1].icon === "rain"){
        day1Icon.src = rain;
    } else if (data.days[1].icon === "partly-cloudy-day"){
        day1Icon.src = partlyCloudyDay;
    } else if (data.days[1].icon === "clear-day"){
        day1Icon.src = clear;
    } else if (data.days[1].icon === "partly-cloudy-night"){
        day1Icon.src = cloudyNight;
    }

    if(data.days[2].icon === "clear-night"){
        day2Icon.src = clearNight;
    } else if (data.days[2].icon === "cloudy"){
        day2Icon.src = cloudy;
    } else if (data.days[2].icon === "fog"){
        day2Icon.src = fog;
    } else if (data.days[2].icon === "snow"){
        day2Icon.src = snow;
    } else if (data.days[2].icon === "rain"){
        day2Icon.src = rain;
    } else if (data.days[2].icon === "partly-cloudy-day"){
        day2Icon.src = partlyCloudyDay;
    } else if (data.days[2].icon === "clear-day"){
        day2Icon.src = clear;
    } else if (data.days[2].icon === "partly-cloudy-night"){
        day2Icon.src = cloudyNight;
    }

    if(data.days[3].icon === "clear-night"){
        day3Icon.src = clearNight;
    } else if (data.days[3].icon === "cloudy"){
        day3Icon.src = cloudy;
    } else if (data.days[3].icon === "fog"){
        day3Icon.src = fog;
    } else if (data.days[3].icon === "snow"){
        day3Icon.src = snow;
    } else if (data.days[3].icon === "rain"){
        day3Icon.src = rain;
    } else if (data.days[3].icon === "partly-cloudy-day"){
        day3Icon.src = partlyCloudyDay;
    } else if (data.days[3].icon === "clear-day"){
        day3Icon.src = clear;
    } else if (data.days[3].icon === "partly-cloudy-night"){
        day3Icon.src = cloudyNight;
    }

    if(data.days[4].icon === "clear-night"){
        day4Icon.src = clearNight;
    } else if (data.days[4].icon === "cloudy"){
        day4Icon.src = cloudy;
    } else if (data.days[4].icon === "fog"){
        day4Icon.src = fog;
    } else if (data.days[4].icon === "snow"){
        day4Icon.src = snow;
    } else if (data.days[4].icon === "rain"){
        day4Icon.src = rain;
    } else if (data.days[4].icon === "partly-cloudy-day"){
        day4Icon.src = partlyCloudyDay;
    } else if (data.days[4].icon === "clear-day"){
        day4Icon.src = clear;
    } else if (data.days[4].icon === "partly-cloudy-night"){
        day4Icon.src = cloudyNight;
    }

    if(data.days[5].icon === "clear-night"){
        day5Icon.src = clearNight;
    } else if (data.days[5].icon === "cloudy"){
        day5Icon.src = cloudy;
    } else if (data.days[5].icon === "fog"){
        day5Icon.src = fog;
    } else if (data.days[5].icon === "snow"){
        day5Icon.src = snow;
    } else if (data.days[5].icon === "rain"){
        day5Icon.src = rain;
    } else if (data.days[5].icon === "partly-cloudy-day"){
        day5Icon.src = partlyCloudyDay;
    } else if (data.days[5].icon === "clear-day"){
        day5Icon.src = clear;
    } else if (data.days[5].icon === "partly-cloudy-night"){
        day5Icon.src = cloudyNight;
    }

  } catch (error) {
    console.error("Error loading weather", error);
    document.querySelector('.temp').innerHTML = 'Error loading weather';
  }
}
checkWeather(currentCity);

searchBtn.addEventListener('click', function(){
  const city = searchValue.value.trim(); 
  if (city) {
    checkWeather(city);
    searchValue.value = '';
  }
});
searchValue.addEventListener('keydown', function(event){
if (event.key === "Enter") {
  const city = searchValue.value.trim(); 
  if (city) {
    checkWeather(city);
    searchValue.value = '';
  }
  }
});

