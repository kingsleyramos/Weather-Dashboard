$(document).ready(function() {



// Will Add search to array and local storage
$("#searchBtn").click(function(){
    console.log("on click")
    var value = $("#citySearch").val();
    SearchHistory.unshift(value)
    console.log("Value" + value)
    renderSearchHistory();
    console.log(SearchHistory)

    localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));

    while (SearchHistory.length > 7){
        SearchHistory.splice(-1,1);
    }
});


// Renders Serach History in List
function renderSearchHistory(){

    $("#searchHistory").empty();

    for(i=0; i<SearchHistory.length; i++){
        cityListItem = $("<li>");
        cityListItem.attr("class", "list-group-item")
        cityListItem.text(SearchHistory[i])
        $("#searchHistory").append(cityListItem)
        console.log(SearchHistory[i])
    }
}




// ========== RUNNING CODE START ==========


    // will pull from local storage for any history
    var SearchHistory = JSON.parse(localStorage.getItem("SearchHistory"));
    var cityListItem

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