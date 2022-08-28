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
console.log(cityName);

//Append the seacrh input from local storage to the cities list
for (var i=0; i< localStorage.length; i++) {
  $('cities-list').append('<p>' + localStorage.getItem(localStorage.key(i)) + '</p>');
}
//Url for current weather parameters(city name and weather units of measurement)
var UrlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial' + apiKey;

//Function to get list of searched cities

//Function to get current weatherdata//
$.ajax ({
  url: UrlWeather,
  method: "GET"
})
    .then(function(response) {
        //Add weather info to page
        $('.city').html("<h2>" + response.name + "</h2>");
        $('.weather-icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
        $('.wind').text("Wind Speed: " + response.wind.speed + " MPH");
        $('.humidity').text("Humidity: " + response.main.humidity + "%");
        $(".temperature").text("Temperature: " + response.main.temp + " F");
        console.log(response)
    });

//Event listener is outside citySearch function, and calls the city Search function//
searchBtnEl.addEventListener('click', recordCityData);


//Url to call the five day forecast from open weather//
//api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid={API key}