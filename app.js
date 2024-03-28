//weather App by Waruna Udara Sampath

let name1 = document.getElementById("text-box").value;
const apiKeyOpenWeather = "043c555d770214a59491f1082279d245";
const apiKeyFreeWeather = "4c56104522d74b8c980220542242603";

var result;

function searchButton() {
  name1 = document.getElementById("text-box").value;
  var cityName = name1;

  result = replaceSpacesWithPercent20(cityName);
  console.log(result);

  getDataFromAPI();
}

function getDataFromAPI(){
        fetch("https://api.weatherapi.com/v1/current.json?key=4c56104522d74b8c980220542242603&q="+result)
        .then(response => response.json())
        .then(data => {
            var temp_C = data.current.temp_c;
            var locationName = data.location.name;
            var countryName = data.location.country;
            var humidity=data.current.humidity;
            var windSpeed=data.current.wind_kph;
            var condition=data.current.condition.text;

            
            

            document.getElementById("condition-text").innerHTML=condition;
            console.log(condition);
            
            document.getElementById("wind-speed").innerHTML="Wind Speed: "+windSpeed+" km/h";
            console.log(windSpeed);

            document.getElementById("humidity").innerHTML="Humidity: "+humidity+"%";
            console.log(humidity);
            
            document.getElementById("temperature").innerHTML = temp_C + "°C";
            console.log(temp_C);
            
            document.getElementById("name-h-tag").innerHTML = countryName+" - "+locationName;
            console.log(countryName+"  "+locationName);

            var img = document.createElement('img');
            img.src = data.current.condition.icon;
            img.style.width = '100px';  
            img.style.height = '100px'; 
            document.getElementById("icon").innerHTML="";
            document.getElementById("icon").appendChild(img);
            


        });
    }
    

function replaceSpacesWithPercent20(str) {
  return str.split(" ").join("%20");
}

fetch("http://api.weatherapi.com/v1/current.json?key=4c56104522d74b8c980220542242603&q=sri%20lanka")
        .then(response => response.json())
        .then(data =>console.log(data) );

//data.current.temp_c
//data.current.temp_f
//data.location.name
//data.location.region
//data.location.country


