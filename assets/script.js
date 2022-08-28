var apiKey = "&appid=d0b7f8bc04fadc6c90e322e2e93e7b97";
var today = moment();
//DOM Elements
var inputEl = document.getElementById('input');
var searchBtnEl = document.getElementById('search-button');
var citiesListEl = document.getElementById('cities-list');

//Sets the cityName in local storage
var cityName = localStorage.getItem('cityNameStore');
//Sets the input value in local storage
function recordCityData() {
  localStorage.setItem('cityNameStore', inputEl.value);
}

//Append the search input from local storage to the cities list(Function to get list of searched cities)
for (var i=0; i< localStorage.length; i++) {
  $('#cities-list').append('<p>' + localStorage.getItem(localStorage.key(i)) + '</p>');
}
//Url for current weather parameters(city name and weather units of measurement)
var UrlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial' + apiKey;


//Function to get current weather data//
$.ajax ({
  url: UrlWeather,
  method: "GET"
})
    .then(function(response) {
        //Add weather info to page
        $('#city').html("<h2>" + response.name + "</h2>");
        $('#weather-icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
        $('#wind').text("Wind Speed: " + response.wind.speed + " MPH");
        $('#humidity').text("Humidity: " + response.main.humidity + "%");
        $("#temperature").text("Temperature: " + response.main.temp + " F");

        //Url for UV index
        var lat =response.coord.lat;
        var lon = response.coord.lon;
        var queryUrlUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey;

        //UV Index Funtion
        $.ajax({
          url: queryUrlUV,
          method: "GET"
        })
          .then(function(response) {
            var uvValue = response.value
            
            //add uv Index info to page
            $('#uv').text("UV Index: " + response.value);
            $('#uv').css("background-color", uvColor(uvValue));
          });

    });
// Index color function
function uvColor(uvValue, colorbgd) {
  var colorbgd = "";
  if (uvValue <= 2) {
      colorbgd = "#66ff00";
  }
  else if (uvValue <= 5 && uvValue > 2) {
      colorbgd = "#ffbb00";
  }
  else if (uvValue >= 6 && uvValue > 5) {
      colorbgd = "#FF0000";
  }
  return colorbgd;
}


//Url to call the five day forecast from open weather//
var UrlForecast ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + apiKey; 


//Event listener for search button, calls recordCityData Function//
searchBtnEl.addEventListener('click', recordCityData);


