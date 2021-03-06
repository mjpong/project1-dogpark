
const searchQuery = document.getElementById('searchQuery')
const searchResult = document.getElementById('searchResult')
const searchBtn = document.getElementById('btn-search')
const resetBtn = document.getElementsByClassName('btn-reset')

const smSearchQuery = document.getElementById('smSearchQuery')
const smSearchResult = document.getElementById('smSearchResult')
const smSearchBtn = document.getElementById('btn-smSearch')

//getting search values

function getSearch(inputValue, allData) {
    let search = []
    let input = inputValue.toLowerCase()
    for (let i of allData) {
        let name = i.name.toLowerCase()
        let address = i.address.toLowerCase()
        let area = i.area.toLowerCase()
        let property = i.property.toLowerCase()
        if(property == "dog park"){
            let amenities = i.amenities.toString().toLowerCase()
            if (name.includes(input) || (address.includes(input)) || (area.includes(input)) || (property.includes(input)) || (amenities.includes(input))) {
                search.push({
                    'name': i.name,
                    'address': i.address,
                    'area': i.area,
                    'hours': i.hours,
                    'pic': i.pic,
                    'amenities': i.amenities.toString().replace(/,/g, ", "),
                    'lighting': i.lighting,
                    'latitude': i.latitude,
                    'longtitude': i.longtitude,
                    'property': i.property
                })
            }
        } else{
            let type = i.type.toString().toLowerCase()
            if (name.includes(input) || (address.includes(input)) || (area.includes(input)) || (property.includes(input)) || (type.includes(input))) {
                search.push({
                    'name': i.name,
                    'address': i.address,
                    'area': i.area,
                    'price': i.price,
                    'hours': i.hours,
                    'pic': i.pic,
                    'latitude': i.latitude,
                    'longtitude': i.longtitude,
                    'type': i.type.toString().replace(/,/g, ", "),
                    'property': i.property
                })
            }
        }
    }
    return search;
}

let searchClusterLayer = L.markerClusterGroup();
let searchValue = [];

// sm device
smSearchBtn.addEventListener('click', function () {
    let smUserSearch = smSearchQuery.value;
    searchValue = getSearch(smUserSearch, allData);
    console.log(searchValue);
    if(searchValue.length == 0){
        alert("Results not found");
    }
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    createMarkers(searchValue, searchClusterLayer);
    searchClusterLayer.addTo(map);
    map.setView(smSingapore,11);
    // showresults() to be added in future
    // showResults(searchValue, smSearchResult);
})

// md lg device
searchBtn.addEventListener('click', function () {
    let userSearch = searchQuery.value;
    searchValue = getSearch(userSearch, allData);
    if(searchValue.length == 0){
        searchResult.innerHTML = "";
        searchResult.innerHTML += "<p class='text-center'> Results not found</p>"
    } else{
        //empty layers
        allClusterLayer.clearLayers();
        searchClusterLayer.clearLayers();
        filterClusterLayer.clearLayers();
        // go through element , add to new cluster layer
        createMarkers(searchValue, searchClusterLayer);
        searchClusterLayer.addTo(map);
        showResults(searchValue, searchResult);
    }

})

searchQuery.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        document.getElementById("btn-search").click()
    }
})

function showResults(results, userResults) {
    userResults.innerHTML = "";
    let count = 0;
    for (let i of results) {
        userResults.innerHTML +=
            `<p onClick="resultZoom(${count++})" class= "pResults"><i class="fas fa-paw"></i>  ${i.name} - ${i.property}, ${i.area}</p>`
    }
}

// when user click results it zooms in and opens popup
function resultZoom(count) {
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    let resultLayer = createMarkers([searchValue[count]], searchClusterLayer);
    map.setView([searchValue[count].latitude, searchValue[count].longtitude + 0.001], 18);
    for (let l of resultLayer.getLayers()) {
        l.openPopup();
    }
}


// WORK IN PROGRESS 
// search bar with results on drop down, and will show on click 


// function smShowResults(results, userResults){
//     userResults.innerHTML ="";
//     let count = 0;
//     for (let i of results) {
//         userResults.innerHTML +=
//             `<p onCLick="smResultZoom(${count++}) class = "pResults"><i class="fas fa-paw"></i>  ${i.name} - ${i.property}, ${i.area}</p>`
//     }
// }