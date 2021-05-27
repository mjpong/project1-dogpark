// CUSTOM ICON MARKER ON MAP
const parkPin = L.icon({
    iconUrl: 'images/park-pin.svg',
    iconSize: [15, 42], // size of the icon
    iconAnchor: [22.5, 42], // point of the icon which will correspond to marker's location

});

const poolPin = L.icon({
    iconUrl: 'images/pool-pin.svg',
    iconSize: [15, 42], // size of the icon
    iconAnchor: [22.5, 42], // point of the icon which will correspond to marker's location

});

// Global Variable
let allParksData = [];
let allPoolsData = [];
let allData = []

// AXIOS just to read the park data
async function loadParksData() {
    let response = await axios.get("../json-files/parks.json");
    let parksData = response.data;
    console.log(parksData)
    for (let i of parksData.dog_parks) {
        allParksData.push({
            Name: i.name,
            Address: i.address,
            Area: i.area,
            Hours: i.hours,
            Pic: i.pic,
            Lighting: i.lighting,
            Latitude: i.latitude,
            Longtitude: i.longtitude
        })

    }
    return allParksData;
}

// AXIOS just to read pool data
async function loadPoolsData() {
    let response = await axios.get("../json-files/pools.json");
    let poolsData = response.data;
    console.log(poolsData)
    for (let i of poolsData.dog_pools) {
        let typeStr = i.type.toString().replace(",", ", ")
        allPoolsData.push({
            Name: i.name,
            Address: i.address,
            Area: i.area,
            Price: i.price,
            Hours: i.hours,
            Pic: i.pic,
            Latitude: i.latitude,
            Longtitude: i.longtitude,
            Type: typeStr,
        })

    }
    return allPoolsData;
}


// Marker function

function createParkMarkers(coor, pin, clusterLayer) {
    for (let i = 0; i < coor.length; i++) {
        const parkPopup = L.popup()
            .setContent(`
        <h6>${coor[i].parkName}</h6>
        <hr>
        <p> Address: ${coor[i].parkAddress}</p>
        <p> Opening Hours: ${coor[i].parkHours}</p>
        <p> <img src="${coor[i].parkPic}" style="width:275px; height:150px"/> 
        `)
        L.marker([coor[i].parkLatitude, coor[i].parkLongtitude], { icon: pin }).bindPopup(parkPopup).addTo(clusterLayer)
    };
    return clusterLayer;
}

function createPoolMarkers(coor, pin, clusterLayer) {
    for (let i = 0; i < coor.length; i++) {
        const poolPopup = L.popup()
            .setContent(`
        <h6>${coor[i].poolName}</h6>
        <hr>
        <p> Address: ${coor[i].poolAddress}</p>
        <p> Pool Type: ${coor[i].poolType}</p>
        <p> Price: $${coor[i].poolPrice}</p>
        <p> Opening Hours: ${coor[i].poolHours}</p>
        <p> <img src="${coor[i].poolPic}" style="width:275px; height:150px"/> 
        `)
        L.marker([coor[i].poolLatitude, coor[i].poolLongtitude], { icon: pin }).bindPopup(poolPopup).addTo(clusterLayer)
    };
    return clusterLayer;
}


// Layers Groups

// let parkGroup = L.layerGroup();
// parkGroup.addTo(map);

// let poolGroup = L.layerGroup();
// poolGroup.addTo(map);

// let baseLayers = {
// }
// let overlays = {
//     'Dog Parks': parkGroup,
//     'Dog Pools': poolGroup,
// }

// L.control.layers(baseLayers, overlays).addTo(map);


let allClusterLayer;

// Run all
async function run() {
    let allClusterLayer = L.markerClusterGroup().addTo(map);

    let parksData = await loadParksData()
    console.log(parksData)
    // parkClusterLayer = L.markerClusterGroup();
    // createParkMarkers(parksData, parkPin, parkClusterLayer).addTo(map)
    createParkMarkers(parksData, parkPin, allClusterLayer);


    let poolsData = await loadPoolsData()
    console.log(poolsData)
    // poolClusterLayer = L.markerClusterGroup();
    // createPoolMarkers(poolsData, poolPin, poolClusterLayer).addTo(map)
    createPoolMarkers(poolsData,poolPin, allClusterLayer);

    allData = [...parksData, ...poolsData];

}

run();



