// BOTH PARK + POOL DATA MAP WILL BE DONE HERE

// USE AXIOS TO READ FROM PARKS.JSON, TELL JS TO WAIT TILL AXIOS.GET() IS DONE
// ASSIGN IT'S RESPONSE TO THE RESPONSE VARIABLE

async function getParks() {
    let response = await axios.get("../json-files/parks.json");
    let allParks = response.data;
    console.log(allParks);
    let parksLatLong = [];
    for (let park of allParks.dog_parks) {
    // console.log(park.latitude)
    // console.log(park.longtitude)
        parksLatLong.push([park.latitude, park.longtitude]);
    }
    createMarkers(parksLatLong);
    
}

// ADDING PARKS.JSON LATLNG TO MARKER CLUSTER
function createMarkers(parkCoor){
    let parkClusterLayer = L.markerClusterGroup();

    for (let i = 0; i < parkCoor.length; i++) {
        L.marker(parkCoor[i]).addTo(parkClusterLayer)
    }
    // adding the parkMarkers to map
    parkClusterLayer.addTo(map);
}









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

