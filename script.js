$(document).ready(function() {

var cityToSearch

// Will Add search to array and local storage
$("#searchBtn").click(function(){
    console.log("on click")
    cityToSearch = $("#citySearch").val();
    SearchHistory.unshift(cityToSearch)
    console.log("Value" + cityToSearch)
    renderSearchHistory();
    console.log(SearchHistory)

    localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));

    getWeather();
});


// Renders Serach History in List
function renderSearchHistory(){

    $("#searchHistory").empty();

    while (SearchHistory.length > 5){
        SearchHistory.splice(-1,1);
    }

    for(i=0; i<SearchHistory.length; i++){
        cityListItem = $("<li>");
        cityListItem.attr("class", "list-group-item")
        cityListItem.text(SearchHistory[i])
        $("#searchHistory").append(cityListItem)
        console.log(SearchHistory[i])
    }
}

 function getWeather(){

     
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&units=imperial&appid=f00d24224c5175367e9256f06efb0e78";

    $.ajax({
    url: currentWeatherURL,
    method: "GET"
    }).then(function(response) {

        $("#city").text(response.name);

        var currentWeatherImg = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        // $.ajax({
        //     url: currentWeatherImg,
        //     method: "GET"
        //     }).then(function(UVresponse) {
        //         $("#currentWeatheriCon").attr("src", "http://openweathermap.org/img/wn/" + response.weather.icon + "@2x.png";);
        //     });

        
        $("#currentWeatherIcon").attr("src", currentWeatherImg);
        console.log(currentWeatherImg)
        var dateString = moment.unix(response.dt).format("MM/DD/YYYY");
        $("#currentDateAndTime").text(dateString);
        $("#currentTempurature").html("Tempurature: " + response.main.temp + " &degF");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
        $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed);
        
        var currentUVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "5&lon=" + response.coord.lon + "&appid=f00d24224c5175367e9256f06efb0e78"
        $.ajax({
            url: currentUVIndexURL,
            method: "GET"
            }).then(function(UVresponse) {
                $("#currentUVIndex").text("UV Index: " + UVresponse.value);
            });
        });
};



// ========== RUNNING CODE START ==========


    // will pull from local storage for any history
    var SearchHistory = JSON.parse(localStorage.getItem("SearchHistory"));
    var cityListItem
    cityToSearch = SearchHistory[0]
    console.log("searchHistory: " + SearchHistory)
    console.log("cityToSearch:" + cityToSearch)

    getWeather();

    // will render history for the first time at page load
    renderSearchHistory();
    console.log("searchHistory")

    // will create key if key does not exist
    if (SearchHistory == undefined){
        SearchHistory = [];
        localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));
    }


// ========== RUNNING CODE END ==========





}); // ********** END OF DOCUMENT READY FUNCTION **********