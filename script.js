$(document).ready(function() {

// Global Search Variable
var cityToSearch

// Initializing Elements
var cardElement = $("<div>")
var cardBodyElement = $("<div>")
var h5Element = $("<h5>")
var imgElement = $("<img>")
var pTempElement = $("<p>")
var pHumidElement = $("<p>")

// Assigning Attributes to elements
cardElement.attr({
    class: 'card text-white bg-primary m-3',
    style: 'max-width: 10rem;'
});
cardBodyElement.attr("class", "card-body");
h5Element.attr("class", "card-title");
pTempElement.attr("class", "card-text");
pHumidElement.attr("class", "card-text");


// Will Add search to array and local storage
$("#searchBtn").click(function(){

    //clears all cards
    $("#forcast").empty();
    
    // Adds City to search array and local storage
    cityToSearch = $("#citySearch").val();
    SearchHistory.unshift(cityToSearch)
    localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));

    // Renders the search history list
    renderSearchHistory();

    // Generates weather
    getWeather();
});

// function to render weather if history is clicked
$(function(){
    $("#searchHistory li").click(function(){
        $("#forcast").empty();
        cityToSearch = $(this).text()
        getWeather();
    });
});


// Renders Serach History in List under the search
function renderSearchHistory(){

    // Clears entire search history
    $("#searchHistory").empty();

    // Limit the Searh Hisotry to only 5 results
    while (SearchHistory.length > 5){
        SearchHistory.splice(-1,1);
    }

    // Creates a list element at every search
    for(i=0; i<SearchHistory.length; i++){
        cityListItem = $("<li>");
        cityListItem.attr("class", "list-group-item")
        cityListItem.text(SearchHistory[i])
        $("#searchHistory").append(cityListItem)
        console.log(SearchHistory[i])
    }
}

function getForcast(i, url){
    $.ajax({
        url: url,
        method: "GET",
        }).then(function(response) {

            //build Forcast URL
            var dayWeatherImg = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
            
            // Converts UNIX time to MM/DD/YYYY
            var dayDateString = moment.unix(response.list[i].dt).format("MM/DD/YYYY");
        
            // Fills out all child elements data and attributes
            h5Element.text(dayDateString)
            imgElement.attr("src", dayWeatherImg);
            pTempElement.html("Temp: " + response.list[i].main.temp + " &degF");
            pHumidElement.text("Humidity: " + response.list[i].main.humidity + "%")

            // All Elements in Card Body Element
            cardBodyElement.append(h5Element).append(imgElement).append(pTempElement).append(pHumidElement);
            cardElement.append(cardBodyElement);
            cardElement.clone().appendTo($("#forcast"))

        }); // END of AJAX call
} // END of getForcast();

function getWeather(){

    // Call URLs for city Searched
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&units=imperial&appid=f00d24224c5175367e9256f06efb0e78";
    var fiveDayWeatheruRL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityToSearch + "&units=imperial&cnt=40&appid=f00d24224c5175367e9256f06efb0e78";

    console.log("fiveday forcast: " + fiveDayWeatheruRL)

    // will grab and display current weather
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
        }).then(function(response) {
    
            // Creates Image URL
            var currentWeatherImg = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            // Converts UNIX time to MM/DD/YYY
            var dateString = moment.unix(response.dt).format("MM/DD/YYYY | h:mm a");

            //fills out card with below data
            $("#city").text(response.name);        
            $("#currentWeatherIcon").attr("src", currentWeatherImg);
            $("#currentDateAndTime").text(dateString);
            $("#currentTempurature").html("Tempurature: " + response.main.temp + " &degF");
            $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
            $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed);
            
            // pulls the weather icon
            var currentUVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "5&lon=" + response.coord.lon + "&appid=f00d24224c5175367e9256f06efb0e78"
            $.ajax({
                url: currentUVIndexURL,
                method: "GET"
                }).then(function(UVresponse) {
                    $("#currentUVIndex").text("Current UV Index: " + UVresponse.value);
                }); // END of AJAX call
            }); // END of AJAX call



    // Create Card forcast for each date
    for(var i=0; i < 5 ; i++){

        // Selects array element approximately mid day (1-2pm)
        var interation = 0
        interation = (8*i) + 6
        
        // Input interation for array object with URL
        getForcast(interation, fiveDayWeatheruRL);

    } // End of FOR LOOP

};// END of getWeather()


// ========== RUNNING CODE START ==========

    // will pull from local storage for any history
    var SearchHistory = JSON.parse(localStorage.getItem("SearchHistory"));

        // will create key if key does not exist (Page is loaded for the first time)
        if (SearchHistory == undefined || SearchHistory == null){
            // default city is Los Angeles is no city exists in the city
            SearchHistory = ["Los Angeles"];
            localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));
        }

    // Places Search Histoy in global Variable CitytoSearch
    var cityListItem
    cityToSearch = SearchHistory[0]

    // retreives weather for the first time
    getWeather();
    
    // will render history for the first time at page load
    renderSearchHistory();
    console.log("searchHistory")

// ========== RUNNING CODE END ==========

}); // ********** END OF DOCUMENT READY FUNCTION **********