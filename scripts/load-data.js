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
            type: i.type.toString().replace(",", ", "),
            property: i.property
        })

    }
    return allPoolsData;
}


// Marker function
function createMarkers(coor, clusterLayer) {
    for (let i = 0; i < coor.length; i++) {
        if (coor[i].property == "Park") {
            let parkPopup = L.popup().setContent(`
                <h6>${coor[i].name}</h6>
                <hr>
                <p> Address: ${coor[i].address}</p>
                <p> Opening Hours: ${coor[i].hours}</p>
                <p> <img src="${coor[i].pic}" style="width:275px; height:150px"/> 
                `)
            L.marker([coor[i].latitude, coor[i].longtitude], { icon: parkPin }).bindPopup(parkPopup).addTo(clusterLayer)
        } else {
            let poolPopup = L.popup().setContent(`
                <h6>${coor[i].name}</h6>
                <hr>
                <p> Address: ${coor[i].address}</p>
                <p> Pool Type: ${coor[i].type}</p>
                <p> Price: $${coor[i].price}</p>
                <p> Opening Hours: ${coor[i].hours}</p>
                <p> <img src="${coor[i].pic}" style="width:275px; height:150px"/> 
                `)
            L.marker([coor[i].latitude, coor[i].longtitude], { icon: poolPin }).bindPopup(poolPopup).addTo(clusterLayer)
        }
    }
        return clusterLayer;

}


let allClusterLayer = L.markerClusterGroup().addTo(map);

// Run all
async function run() {
    let parksData = await loadParksData()
    let poolsData = await loadPoolsData()

    allData = [...parksData, ...poolsData];
    createMarkers(allData, allClusterLayer);
}

run();



