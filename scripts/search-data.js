
const searchQuery = document.getElementById('searchQuery')
const searchResult = document.getElementById('searchResult')
const searchBtn = document.getElementById('btn-search')
const resetBtn = document.getElementById('btn-reset')



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
    searchBtn.addEventListener('click', function() {
        let userSearch = searchQuery.value;
        let searchValue = getSearch(userSearch, allData);
        console.log(searchValue)

        // empty the all cluster layer
        allClusterLayer.clearLayers();
        searchClusterLayer.clearLayers();

        // go through each element in the result

        createMarkers(searchValue, searchClusterLayer);
        searchClusterLayer.addTo(map);

        // .. add each of them to the all cluster layer



    })

// clear layers
// function clearLayer(){

// }

// // get search value function
// let search = []

// function getSearch(value, parkdata, pooldata){
//     clearList();
//     let uservalue = searchQuery.value.toLowercase()
//     for (let i of parkdata) {
//         let name = i.name.toLowerCase()
//         let address = i.address.toLowerCase()
//         let area = i.area.toLowerCase()
//         if (name.includes(uservalue) || (address.includes(uservalue)) || (area.includes(uservalue))) {
//             search.push({
//                 ''
//             })
//         } else if(value.length === 0) {
//             setNoResults();
//         }


//     }
// } 


// function clearList(){

// }

// function setNoResults(){

// }

// search.addEventListener('input', function(){
//     searchAll(search.value)
// })

// // get searchQuery value

// document.getElementById("searchQuery").addEventListener("keyup",function(e){
//     if (e.keycode === 13) {
//         document.getElementById("btn-search").click()
//     }
// })
