// ADDING BASE MAP

// SINGAPORE LATLONG + SETVIEW CENTER POINT
let singapore = [1.3141086427175888, 103.83809046978706]; 
let map = L.map('map').setView(singapore, 12.4); 

// TILE LAYERS 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// Reset Map
document.querySelector("#reset").addEventListener("click", () => {
    clearField();
    displayCards();
    checksExistingLayer();
})
// ADDING FILTER / SEARCH BAR




