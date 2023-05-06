var api = "4374a4d3c8d796b866685bd527b3b2ca";
var show = document.getElementById("weatherD");
var gmap_canvas = document.getElementById("gmap_canvas");

async function showWeather() {
  var city = document.getElementById("city").value;
  try {
    var sdata = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
    );
    var sdata2 = await sdata.json();
    append(sdata2);
    sevendaydata(sdata2.coord.lat, sdata2.coord.lon);
  } catch (err) {
    var card = ` <h1 id="cityheading"> Wrong City Entered : -${city}  </h1>
       `;

    show.innerHTML += card;
  }
}

function load() {
  async function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    var response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${api}&units=metric`
    );
    const res = await response.json();
    append(res);
    sevendaydata(crd.latitude, crd.longitude);
  }

  navigator.geolocation.getCurrentPosition(success);
}
function append(sdata2) {
  // console.log(sdata2);
  show.innerHTML = "";
  gmap_canvas.src = "";
  var card = `
  <div id="detailsParent">
  <div id ="cityName">  
  <h2 id="date-time"> Show The date </h2>
  <h1 id="cityheading">${sdata2.name}  </h1>
  </div>
   <div id="weatherLogo">  

   <img src="http://openweathermap.org/img/wn/${sdata2.weather[0].icon}@2x.png" id="weatherImage" alt="">
  <h3 id="temp"> ${sdata2.main.temp} ° C</h3>
  </div>
  <div>  
  <h3 id="clounds">Feels like: ${sdata2.main.feels_like} ° C.  ${sdata2.weather[0].description}</h3>
  </div>
  <div id="details">
  
  <h3 id="humidity">Humidity: ${sdata2.main.humidity} %</h3>
  <h3 id="wind">wind-speed: ${sdata2.wind.speed}</h3>
  
  <h3 id="sunrise">Visibility: ${sdata2.visibility}</h3>
  <h3 id="pressure">Pressure: ${sdata2.main.pressure}</h3>
  <h3 id="temp_min"> Min Temp ${sdata2.main.temp_min} °C</h3>
  <h3 id="temp_max"> Max Temp ${sdata2.main.temp_max} °C</h3>
  </div>
  
  
  </div>
 
  
 `;

  show.innerHTML += card;

  gmap_canvas.src = `https://maps.google.com/maps?q=${sdata2.name}&t=k&z=13&ie=UTF8&iwloc=&output=embed`;

  // create a new Date object
  const date = new Date();

  // create an array of month names
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  // get the current day, month, and year
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // get the current hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // set "am" or "pm" based on the current hour
  const ampm = hours >= 12 ? "pm" : "am";

  // convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // format the time string
  const timeString = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }${ampm}`;

  // format the date string
  const dateString = `${day} ${months[monthIndex]} ${year}`;

  document.getElementById(
    "date-time"
  ).innerHTML = `${timeString} ${dateString} `;
}


sevendaydata = async (lat, lon) => {
  let sdata = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=a77df68bcd9e098229cb3c8e6441dfbc&units=metric`;
  try {
    let res = await fetch(sdata);
    let data = await res.json();

    var forecast = document.getElementById("sevenday");

    forecast.innerHTML = "";
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < data.daily.length - 1; i++) {
      var dt = new Date(data.daily[i].dt * 1000);

      forecast.innerHTML += `<div id="daily">
    <h5>${day[dt.getDay()]}</h5>
    <img src="http://openweathermap.org/img/wn/${
      data.daily[i].weather[0].icon
    }@2x.png" alt="">
    <h5>${data.daily[i].temp.max}℃</h5>
    <h5>${data.daily[i].temp.min}℃</h5>

    </div>`;
    }
  } catch (error) {
    forecast.innerHTML = "no";
  }
};
