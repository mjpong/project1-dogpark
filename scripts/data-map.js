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
    let parkClusterLayer = L.markerClusterGroup();

    createMarkers(parksLatLong, parkPin, parkClusterLayer).addTo(parkGroup);
}


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
    let poolClusterLayer = L.markerClusterGroup();


    createMarkers(poolsLatLong, poolPin, poolClusterLayer).addTo(poolGroup);
}

// ADDING MARKERS PER LATLONG
function createMarkers(coor, pin, clusterLayer){
    for (let i = 0; i < coor.length; i++) {
        L.marker(coor[i],{icon: pin}).addTo(clusterLayer)
    }
    // adding the parkMarkers to map
    clusterLayer.addTo(map);
    return clusterLayer;
}

// LAYER GROUPS
let parkGroup = L.layerGroup();
// createMarkers(parksLatLong, parkPin, parkClusterLayer).addTo(parkGroup);
parkGroup.addTo(map);

let poolGroup = L.layerGroup();
// createMarkers(poolsLatLong, poolPin, poolClusterLayer).addTo(poolGroup);
poolGroup.addTo(map);


async function run() {

await getPools();
await getParks();


let baseLayers = {
    'Dog Parks': parkGroup,
    'Dog Pools': poolGroup

}
console.log("test")
let overlays = {
    // 'Dog Pools': poolGroup
}

L.control.layers(baseLayers, overlays).addTo(map);

document.querySelector('#toggle-btn').addEventListener('click', function(){
            if (map.hasLayer(poolGroup)) {
                map.removeLayer(poolGroup);
            } else {
                  map.addLayer(poolGroup);
            }
    })  
}

run();

//CALLING BOTH POOL AND PARK TO MAP




// // MOBILE ONLY - POPUP ON CLICK 
// marker.addEventListener('click', function(){

// })

// parkMarker.bindPopup(`
// <h1>Singapore</h1>
// <p>Welcome to Singapore, the Green City </p>
// <img src="" alt=""/>
// `).openPopup();

// // EVENT LISTENER THAT WILL POP UP WHEN CLICKED
// parkMarker.addEventListener('click', function(){
//     alert("Singapore"); //CHANGE ANOTHER EVENT LISTENER TO SHOW TWO COLUMNS
// })

