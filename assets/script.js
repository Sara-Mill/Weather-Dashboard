var apiKey = "&appid=d0b7f8bc04fadc6c90e322e2e93e7b97";

//DOM Elements
var inputEl = document.getElementById('input');
var searchBtnEl = document.getElementById('search-button');
var citiesListEl = document.getElementById('cities-list');
var cityName="";
var localCityArray =[];

//Sets the input value in local storage
function recordCityData() {
  var storedCities=[];
  localStorage.setItem('cities', JSON.stringify(inputEl.value))
  storedCities = JSON.parse(localStorage.getItem('cities'));
  console.log(storedCities)

  //The same function, written without JSON
  localStorage.setItem('cities-list', inputEl.value);
  for (var i=0; i< localStorage.length; i++) {
   storedCities=response
  }console.log(response)
  }
//Gets the cityName from local storage
var cityName = localStorage.getItem('cities-list');
let previousSearch=JSON.parse(localStorage.getItem("cities")); 
if (previousSearch !== null) {
  for (let i = 0; i < previousSearch.length; i++) {
      if (previousSearch[i] === null) {
          previousSearch.splice(i, i+1);
      } else { 
localCityArray.push(previousSearch[i]);
      }console.log(localCityArray)
    }
  }
//Append the search input from local storage to the cities list(Function to get list of searched cities)
for (var i=0; i< localStorage.length; i++) {
  var length = [];
  $('#cities-list').append('<li>' + localStorage.getItem(localStorage.key(i)) + '</li>');
  console.log(localStorage)
}

//Seperate Function to store list of city names



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
};

//Displays the date
var currentDay = moment().format("dddd, MMMM, D");

function functionDate() {
  $("#current-date").text(currentDay);
};
functionDate();

//Url to call the five day forecast from open weather//
var UrlForecast ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + apiKey; 

//5 Days Forecast function
$.ajax({
  url: UrlForecast,
  method: "GET"
})

    .then(function(response) {

        var dayOne = moment(response.list[3].dt_txt).format("ddd, MMM D");
        //Adds day 1 data to page
        $("#day-one-temperature").text("Temp: " + response.list[3].main.temp + " F");
        $("#day-one-date").html("<h6>" + dayOne + "</h6>");
        $("#day-one-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#day-one-humidity").text("Humidity: " + response.list[3].main.humidity + "%");
        $("#day-one-wind").text("Wind Speed: " + response.list[3].wind.speed );
        console.log(response.list)

        var dayTwo = moment(response.list[11].dt_txt).format("ddd, MMM Do");
        //Adds day 2 data to page
        $("#day-two-temperature").text("Temp: " + response.list[11].main.temp + " F");
        $("#day-two-date").html("<h6>" + dayTwo + "</h6>");
        $("#day-two-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#day-two-humidity").text("Humidity: " + response.list[11].main.humidity + "%");
        $("#day-two-wind").text("Wind Speed: " + response.list[11].wind.speed );

        var dayThree = moment(response.list[19].dt_txt).format("ddd, MMM Do");
        //Adds day 3 data to page
        $("#day-three-temperature").text("Temp: " + response.list[19].main.temp + " F");
        $("#day-three-date").html("<h6>" + dayThree + "</h6>");
        $("#day-three-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#day-three-humidity").text("Humidity: " + response.list[19].main.humidity + "%");
        $("#day-three-wind").text("Wind Speed: " + response.list[19].wind.speed );

        var dayFour = moment(response.list[27].dt_txt).format("ddd, MMM Do");
        //Adds day 4 data to page
        $("#day-four-temperature").text("Temp: " + response.list[27].main.temp + " F");
        $("#day-four-date").html("<h6>" + dayFour + "</h6>");
        $("#day-four-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#day-four-humidity").text("Humidity: " + response.list[27].main.humidity + "%");
        $("#day-four-wind").text("Wind Speed: " + response.list[27].wind.speed );

        var dayFive = moment(response.list[35].dt_txt).format("ddd, MMM Do");
        //Adds day 5 data to page
        $("#day-five-temperature").text("Temp: " + response.list[35].main.temp + " F");
        $("#day-five-date").html("<h6>" + dayFive + "</h6>");
        $("#day-five-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#day-five-humidity").text("Humidity: " + response.list[35].main.humidity + "%");
        $("#day-five-wind").text("Wind Speed: " + response.list[35].wind.speed );
    });

//Event listener for search button, calls recordCityData Function//
searchBtnEl.addEventListener('click', recordCityData);


