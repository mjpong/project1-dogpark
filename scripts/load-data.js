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
            parkName: i.name,
            parkAddress: i.address,
            parkArea: i.area,
            parkHours: i.hours,
            parkLighting: i.lighting,
            parkLatitude: i.latitude,
            parkLongtitude: i.longtitude
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
            poolName: i.name,
            poolAddress: i.address,
            poolArea: i.area,
            poolPrice: i.price,
            poolHours: i.hours,
            poolLatitude: i.latitude,
            poolLongtitude: i.longtitude,
            poolType: i.type,
        })
       
    }
    return allPoolsData;
}


// Marker function

function createParkMarkers(coor, pin, clusterLayer){
    for (let i = 0; i < coor.length; i++) {
        const parkPopup = L.popup()
        .setContent(`
        <p>${coor[i].parkName}</p>
        <p>${coor[i].parkAddress}</p>
        <p>${coor[i].parkHours}</p>
        `)
        L.marker([coor[i].parkLatitude, coor[i].parkLongtitude],{icon: pin}).bindPopup(parkPopup).addTo(clusterLayer)
    };
    return clusterLayer;
}

function createPoolMarkers(coor, pin, clusterLayer){
    for (let i = 0; i < coor.length; i++) {
        const poolPopup = L.popup()
        .setContent(`
        <p>${coor[i].poolName}</p>
        <p>${coor[i].poolAddress}</p>
        <p>${coor[i].poolType}</p>
        <p>${coor[i].poolPrice}</p>
        <p>${coor[i].poolHours}</p>
        `)
        L.marker([coor[i].poolLatitude, coor[i].poolLongtitude],{icon: pin}).bindPopup(poolPopup).addTo(clusterLayer)
    };
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
    createParkMarkers(parksData, parkPin, parkClusterLayer).addTo(parkGroup)

    let poolsData = await loadPoolsData()
    console.log(poolsData)
    let poolClusterLayer = L.markerClusterGroup();
    createPoolMarkers(poolsData, poolPin, poolClusterLayer).addTo(poolGroup)
    
}




run();


