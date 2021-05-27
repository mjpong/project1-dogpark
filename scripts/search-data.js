
const searchQuery = document.getElementById('searchQuery')
const searchResult = document.getElementById('searchResult')
const searchBtn = document.getElementById('btn-search')
const resetBtn = document.getElementsByClassName('btn-reset')


//getting search values

function getSearch(inputValue, allData) {
    let search = []
    let input = inputValue.toLowerCase()
    for (let i of allData) {
        let name = i.name.toLowerCase()
        let address = i.address.toLowerCase()
        let area = i.area.toLowerCase()
        let property = i.property.toLowerCase()
        if (name.includes(input) || (address.includes(input)) || (area.includes(input)) || (property.includes(input))) {

            if (i.property == "Park") {
                search.push({
                    'name': i.name,
                    'address': i.address,
                    'area': i.area,
                    'hours': i.hours,
                    'pic': i.pic,
                    'lighting': i.lighting,
                    'latitude': i.latitude,
                    'longtitude': i.longtitude,
                    'property': i.property
                })
            } else {
                search.push({
                    'name': i.name,
                    'address': i.address,
                    'area': i.area,
                    'price': i.price,
                    'hours': i.hours,
                    'pic': i.pic,
                    'latitude': i.latitude,
                    'longtitude': i.longtitude,
                    'type': i.type.toString().replace(",", ", "),
                    'property': i.property
                })

            }
        }
    }
    return search;
}

let searchClusterLayer = L.markerClusterGroup();
let searchValue = [];
// click btn or press enter to search 
searchBtn.addEventListener('click', function () {
    let userSearch = searchQuery.value;
    searchValue = getSearch(userSearch, allData);
    //empty layers
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    // go through element , add to new cluster layer
    createMarkers(searchValue, searchClusterLayer);
    searchClusterLayer.addTo(map);

    showResults(searchValue)

})

searchQuery.addEventListener("keyup",function(e){
    if (e.keyCode === 13) {
        document.getElementById("btn-search").click()
    }
})

// show results in searchResults

function showResults(results){
    searchResult.innerHTML = "";
    let count = 0;
    for(let i of results){
        searchResult.innerHTML += 
        `
        <p onClick="test(${count++})"> ${i.name} - ${i.property}, ${i.area}</p>`
    }

}

function test(count){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    createMarkers([searchValue[count]], searchClusterLayer);
    map.setView([searchValue[count].latitude, searchValue[count].longtitude + 0.001], 18);
}



// all reset btn to reset map
let resetBtns = document.querySelectorAll(".btn-reset");
for(let btn of resetBtns){
    btn.addEventListener('click', function(){
        allClusterLayer.clearLayers();
        searchClusterLayer.clearLayers();
        createMarkers(allData, allClusterLayer);
        searchResult.innerHTML = "";
        map.setView(singapore, 12.4);
        searchQuery.value = "";
    })
}