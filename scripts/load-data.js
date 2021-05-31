// CUSTOM ICON MARKER ON MAP
const parkPin = L.icon({
    iconUrl: 'images/park-marker.svg',
    iconSize: [18.5, 42], // size of the icon
    iconAnchor: [22.5, 42], // point of the icon which will correspond to marker's location

});

const poolPin = L.icon({
    iconUrl: 'images/pool-marker-solid.svg',
    iconSize: [18.5, 42], // size of the icon
    iconAnchor: [22.5, 42], // point of the icon which will correspond to marker's location

});

// Global Variable
let allParksData = [];
let allPoolsData = [];
let allData;

// AXIOS just to read the park data
async function loadParksData() {
    let response = await axios.get("../json-files/parks.json");
    let parksData = response.data;
    console.log(parksData)
    for (let i of parksData.dog_parks) {
        allParksData.push({
            name: i.name,
            address: i.address,
            area: i.area,
            hours: i.hours,
            pic: i.pic,
            amenities: i.amenities,
            lighting: i.lighting,
            latitude: i.latitude,
            longtitude: i.longtitude,
            property: i.property
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
        allPoolsData.push({
            name: i.name,
            address: i.address,
            area: i.area,
            price: i.price,
            hours: i.hours,
            pic: i.pic,
            latitude: i.latitude,
            longtitude: i.longtitude,
            type: i.type,
            property: i.property
        })

    }
    return allPoolsData;
}


// Marker function
function createMarkers(coor, clusterLayer) {
    if (coor.length != null) {
        for (let i = 0; i < coor.length; i++) {
            coor[i].area
            if (coor[i].property == "Dog Park") {
                let parkPopup = L.popup().setContent(`
                    <h6>${coor[i].name}</h6>
                    <hr>
                    <p class="popup"> <b>Address:</b> ${coor[i].address}</p>
                    <p class="popup"> <b>Opening Hours:</b> ${coor[i].hours}</p>
                    <p class="popup"> <b>Amenities:</b> ${coor[i].amenities.toString().replace(/,/g, ", ")}</p>
                    <p> <img class="pop-up-img" src="${coor[i].pic}"/> 
                    `)
                L.marker([coor[i].latitude, coor[i].longtitude], { icon: parkPin }).bindPopup(parkPopup).addTo(clusterLayer);
            } else {
                let poolPopup = L.popup().setContent(`
                    <h6>${coor[i].name}</h6>
                    <hr>
                    <p class="popup"> <b>Address:</b> ${coor[i].address}</p>
                    <p class="popup"> <b>Pool Type:</b> ${coor[i].type.toString().replace(/,/g, ", ")}</p>
                    <p class="popup"> <b>Price:<b> $${coor[i].price}</p>
                    <p class="popup"> <b>Opening Hours:</b> ${coor[i].hours}</p>
                    <p> <img class="pop-up-img" src="${coor[i].pic}"/> 
                    `)
                L.marker([coor[i].latitude, coor[i].longtitude], { icon: poolPin }).bindPopup(poolPopup).addTo(clusterLayer)
            }
        }
    }

    return clusterLayer;

}

// Filtering functions 
function splitByArea(data) {
    let area = {
        north: [],
        east: [],
        west: [],
        central: []
    }
    for (let i of data) {
        if (i.area == "North") {
            area["north"].push(i)
        } else if (i.area == "East") {
            area["east"].push(i)
        } else if (i.area == "West") {
            area["west"].push(i)
        } else if (i.area == "Central") {
            area["central"].push(i)
        }
    }

    return area;
}

function splitByAmenities(data) {
    let pAmenities = {
        fountain: [],
        playground: [],
        washroom: [],
        fountainPlayground: [],
        fountainWashroom: [],
        playgroundWashroom: [],
    }
    for (let i of data) {

        if (i.amenities.includes("Fountain")) {
            pAmenities["fountain"].push(i)
        }
        if (i.amenities.includes("Playground")) {
            pAmenities["playground"].push(i)
        }
        if (i.amenities.includes("Washroom")) {
            pAmenities["washroom"].push(i)
        }

    }
    return pAmenities;
}

function splitByPool(data) {
    let pType = {
        outdoor: [],
        indoor: [],
        hydrotherapy: []
    }
    for (let i of data) {
        if (i.type.includes("Outdoor Pool")) {
            pType["outdoor"].push(i)
        }
        if (i.type.includes("Indoor Pool")) {
            pType["indoor"].push(i)
        }
        if (i.type.includes("Hydrotherapy Pool")) {
            pType["hydrotherapy"].push(i)
        }
    }
    return pType;
}

let allClusterLayer = L.markerClusterGroup().addTo(map);
let parksByArea;
let parkAmenities;
let poolsByArea;
let poolType;

// Run all
async function run() {
    let parksData = await loadParksData()
    let poolsData = await loadPoolsData()

    allData = [...parksData, ...poolsData];

    createMarkers(allData, allClusterLayer);
    parksByArea = splitByArea(parksData);
    parkAmenities = splitByAmenities(parksData);
    poolsByArea = splitByArea(poolsData);
    poolType = splitByPool(poolsData);

}

run();


