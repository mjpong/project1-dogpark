// Map - Adding base map, sg latlng, setview
let singapore = [1.3141086427175888, 103.83809046978706];
let map = L.map('map').setView(singapore, 12.4);

// Tile Layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// FUNCTIONS 
// Info side bar - arrow toggle to hide
document.getElementById("nav-toggle").addEventListener('click', function () {
    let isShown = false;
    for (let pane of document.querySelectorAll(".tab-pane")) {
        if (pane.classList.contains("active")) {
            isShown = true;
        }
    }
    if (isShown) {
        for (let pane of document.querySelectorAll(".tab-pane")) {
            pane.classList.remove("show");
            pane.classList.remove("active");
            pane.classList.remove("fade");
        }
    }
})

// Modal Contact Us Submit Btn Alert
let formBtn = document.getElementById('btn-submit')

function validateForm() {
    let i = document.forms["myForm"]["fname"].value;
    let j = document.forms["myForm"]["fcontact"].value;
    let k = document.forms["myForm"]["fmessage"].value;
    if (i == "") {
        alert("Name must be filled out");
        return false;
    }
    if (j == ""){
        alert("Email must be filled out");
        return false;
    }
    if (k == ""){
        alert("Please enter your message");
        return false;
    }
    else {
        alert("Thank you. Your response has been submitted.")
    }
}


// All reset btns to reset maps
let resetBtns = document.querySelectorAll(".btn-reset");
for (let btn of resetBtns) {
    btn.addEventListener('click', function () {
        allClusterLayer.clearLayers();
        searchClusterLayer.clearLayers();
        filterClusterLayer.clearLayers();
        createMarkers(allData, allClusterLayer);
        map.setView(singapore, 12.4);
        searchResult.innerHTML = "";
        searchQuery.value = "";
        smSearchResult.innerHTML = "";
        smSearchQuery.value = "";
        $('input[type=checkbox]').each(function () {
            this.checked = false;
        });
    })
}
