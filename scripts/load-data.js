// CUSTOM ICON MARKER ON MAP
const parkPin = L.icon({
    iconUrl: 'images/park-pin.svg',
    iconSize:     [15, 42], // size of the icon
    iconAnchor:   [22.5,42], // point of the icon which will correspond to marker's location
    
});

const poolPin = L.icon({
    iconUrl: 'images/pool-pin.svg',
    iconSize:     [15, 42], // size of the icon
    iconAnchor:   [22.5,42], // point of the icon which will correspond to marker's location
    
});

// AXIOS just to read the park data
async function loadParksData() {
    let response = await axios.get("../json-files/parks.json");
    let parksData = response.data;
    console.log(parksData)
    let allParksData = [];
    for (let i of parksData.dog_parks) {
        allParksData.push({
            name: i.name,
            address: i.address,
            area: i.area,
            hours: i.hours,
            lighting: i.lighting,
            latitude: i.latitude,
            longtitude: i.longtitude
        })
       
    }
    return allParksData;
}

// AXIOS just to read pool data
async function loadPoolsData() {
    let response = await axios.get("../json-files/pools.json");
    let poolsData = response.data;
    console.log(poolsData)
    let allPoolsData = [];
    for (let i of poolsData.dog_pools) {
        allPoolsData.push({
            name: i.name,
            address: i.address,
            area: i.area,
            price: i.price,
            hours: i.hours,
            latitude: i.latitude,
            longtitude: i.longtitude,
            type: i.type,
        })
       
    }
    return allPoolsData;
}


// Marker function

function createMarkers(coor, pin, clusterLayer){
    for (let i = 0; i < coor.length; i++) {
        L.marker([coor[i].latitude, coor[i].longtitude],{icon: pin}).addTo(clusterLayer)
    }
    // adding the markers to map
    // clusterLayer.addTo(map);
    return clusterLayer;
}

// Layers Groups

let parkGroup = L.layerGroup();
parkGroup.addTo(map);

let poolGroup = L.layerGroup();
poolGroup.addTo(map);
    
let baseLayers = {

}
    
let overlays = {
    'Dog Parks': parkGroup,
    'Dog Pools': poolGroup,
}

L.control.layers(baseLayers, overlays).addTo(map);


// Run all
async function run(){
    let parksData = await loadParksData()
    console.log(parksData)
    let parkClusterLayer = L.markerClusterGroup();
    createMarkers(parksData, parkPin, parkClusterLayer).addTo(parkGroup)

    let poolsData = await loadPoolsData()
    console.log(poolsData)
    let poolClusterLayer = L.markerClusterGroup();
    createMarkers(poolsData, poolPin, poolClusterLayer).addTo(poolGroup)
    
}

run();