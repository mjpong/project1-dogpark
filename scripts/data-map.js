// BOTH PARK + POOL DATA MAP WILL BE DONE HERE

// CUSTOM ICON MARKER ON MAP
var parkPin = L.icon({
    iconUrl: 'images/park-pin.svg',
    iconSize:     [15, 42], // size of the icon
    iconAnchor:   [22.5,42], // point of the icon which will correspond to marker's location
    
});

var poolPin = L.icon({
    iconUrl: 'images/pool-pin.svg',
    iconSize:     [15, 42], // size of the icon
    iconAnchor:   [22.5,42], // point of the icon which will correspond to marker's location
    
});

// USE AXIOS TO READ FROM PARKS.JSON, TELL JS TO WAIT TILL AXIOS.GET() IS DONE
// ASSIGN IT'S RESPONSE TO THE RESPONSE VARIABLE

async function getParks() {
    let response = await axios.get("../json-files/parks.json");
    let allParks = response.data;
    console.log(allParks);
    let parksLatLong = [];
    for (let park of allParks.dog_parks) {
        parksLatLong.push([park.latitude, park.longtitude]);
    }

    createMarkers(parksLatLong, parkPin);
}

getParks();


// USE AXIOS TO READ FROM POOLS.JSON, TELL JS TO WAIT TILL AXIOS.GET() IS DONE
// ASSIGN IT'S RESPONSE TO THE RESPONSE VARIABLE
async function getPools(){
    let response = await axios.get("../json-files/pools.json");
    let allPools = response.data;
    console.log(allPools);
    let poolsLatLong = []; 
    for (let pool of allPools.dog_pools) {
        poolsLatLong.push([pool.latitude, pool.longtitude]);
    }
    createMarkers(poolsLatLong, poolPin);
}


// ADDING POOLS AND PARKS.JSON LATLNG TO MARKER CLUSTER
function createMarkers(coor, pin){
    let clusterLayer = L.markerClusterGroup();

    for (let i = 0; i < coor.length; i++) {
        L.marker(coor[i],{icon: pin}).addTo(clusterLayer)
    }
    // adding the parkMarkers to map
    clusterLayer.addTo(map);
}

getPools();



// // MOBILE ONLY - POPUP ON CLICK 
// parkMarker.bindPopup(`
// <h1>Singapore</h1>
// <p>Welcome to Singapore, the Green City </p>
// <img src="" alt=""/>
// `).openPopup();

// // EVENT LISTENER THAT WILL POP UP WHEN CLICKED
// parkMarker.addEventListener('click', function(){
//     alert("Singapore"); //CHANGE ANOTHER EVENT LISTENER TO SHOW TWO COLUMNS
// })

