//weather App by Waruna Udara Sampath

let name1 = document.getElementById("text-box").value;
const apiKeyOpenWeather = "043c555d770214a59491f1082279d245";
const apiKeyFreeWeather = "4c56104522d74b8c980220542242603";

var result;

function searchButton() {
  name1 = document.getElementById("text-box").value;
  var cityName = name1.trim();
  console.log(cityName);

  result = replaceSpacesWithPercent20(cityName);
  console.log(result);

  getDataFromAPI();
}

function getDataFromAPI() {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=4c56104522d74b8c980220542242603&q=" +
      result+"&days=7"
  )
    .then((response) => response.json())
    .then((data) => {
      logWeatherConditions(data);
      var temp_C = data.current.temp_c;
      var locationName = data.location.name;
      var countryName = data.location.country;
      var humidity = data.current.humidity;
      var windSpeed = data.current.wind_kph;
      var condition = data.current.condition.text;

      document.getElementById("condition-text").innerHTML = condition;
      console.log(condition);

      document.getElementById("wind-speed").innerHTML =
        windSpeed + " km/h" + "   Wind Speed";
      console.log(windSpeed);

      
      document.getElementById("humidity").innerHTML =
        humidity + "%" + "   Humidity";
      console.log(humidity);

      document.getElementById("name-h-tag").innerHTML =
        countryName + " - " + locationName;
      console.log(countryName + "  " + locationName);

      var img = document.createElement("img");
      img.src = data.current.condition.icon;
      img.style.width = "60px";
      img.style.height = "60px";

      console.log(temp_C);

      // Clear the contents of the temperature element
      document.getElementById("temperature").innerHTML = "";

      var span1 = document.createElement("span");
      span1.innerHTML = temp_C + "°C";
      span1.style.fontSize = "3.5rem";
      span1.style.fontWeight = "bold";
      document.getElementById("temperature").appendChild(span1);

      var img = document.createElement("img");
      img.src = data.current.condition.icon;
      img.style.marginBottom = "0px";
      img.style.paddingBottom = "0px";
      img.style.border = "0px";

      var div = document.getElementById("temperature"); // Replace with your div id
      div.appendChild(img);

      // Clear the contents of the elements
      document.getElementById("days").innerHTML = "";
      document.getElementById("upcoming-condition").innerHTML = "";
    });
}

function logWeatherConditions(responseBody) {
  const forecastDays = responseBody.forecast.forecastday;
  const upcomingConditionDiv = document.getElementById('day1');

  // Clear the existing forecast data
  upcomingConditionDiv.innerHTML = '';

  forecastDays.forEach(days => {
    console.log(days);
    const newDiv = document.createElement('div');
    newDiv.classList.add('row', 'mb-3', 'glass-border'); // Add glass-border class for glassmorphism effect

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('col-2', 'd-flex', 'align-items-center');
    const img = document.createElement("img");
    img.src = days.day.condition.icon;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.marginBottom = "30px";
    imgDiv.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add('col', 'text-white');

    // Format date and get the day of the week
    const date = new Date(days.date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    // Create text nodes for each part with appropriate styling
    const dayText = document.createTextNode(dayOfWeek);
    const humidityText = document.createTextNode(`Humidity: ${days.day.avghumidity}%`);
    const temperatureText = document.createTextNode(`${days.day.avgtemp_c}°C`);

    // Add empty spaces between text nodes
    const space = document.createTextNode('\u00A0\u00A0\u00A0'); // Add three non-breaking spaces

    // Append the text nodes to the textDiv with spaces in between
    textDiv.appendChild(dayText);
    textDiv.appendChild(space);
    
    textDiv.appendChild(humidityText);
    textDiv.appendChild(space.cloneNode(true)); // Clone the space node
    textDiv.appendChild(temperatureText);

    newDiv.appendChild(textDiv);
    newDiv.appendChild(imgDiv);

    upcomingConditionDiv.appendChild(newDiv);
  });
}









function replaceSpacesWithPercent20(str) {
  return str.split(" ").join("%20");
}

function getCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);
  getLocationName(position.coords.latitude, position.coords.longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      getLocation();
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

const getLocation = () => {
  //get  location by ip
  //this is not accurate but this can be implemented
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.country_name);
      // name1 = data.country_name;
      name1 = data.city;

      var cityName = name1.trim();

      result = replaceSpacesWithPercent20(cityName);
      getDataFromAPI();
    });
};
function getLocationName(latitude, longitude) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude-${latitude}&longitude-${longitude}&localityLanguage-en`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.countryName);
      // name1 = data.countryName;
      name1 = data.city;

      var cityName = name1.trim();
      result = replaceSpacesWithPercent20(cityName);
      getDataFromAPI();
    });
}

// fetch("http://api.weatherapi.com/v1/current.json?key=4c56104522d74b8c980220542242603&q=sri%20lanka")
//         .then(response => response.json())
//         .then(data =>console.log(data.location) );

//data.current.temp_c
//data.current.temp_f
//data.location.name
//data.location.region
//data.location.country

/*      <div class="row">
        <div class="col-lg-3 col-md-2 col-sm-1"></div>
        
        <div class="col-lg-6 col-md-8 col-sm-12">
          <div class="container">
            <div class="m-2" style="width: 100%">
              <div class="card-body glass">
                <h3 class="color-tag">7-day Forecast</h3>
                <div id="day1">
               
                </div>
                <div class="text-center " id="days">

                </div>
                <div class="text-center " id="upcoming-condition">

                </div>
                

                
                

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-2 col-sm-1"></div>
      </div>
    </div> this is my html code , what i want is adding data into a div , id is "days" i want to create 7 div div tags and  each div tag contains a day , image , and the temperature,  in a row, i want to add this from javascript,*/