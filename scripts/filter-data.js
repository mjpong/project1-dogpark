let allCheckboxes = document.querySelectorAll('input[type=checkbox]');
let allCheckedboxes = document.querySelectorAll('input[type=checkbox]:checked');
let filterClusterLayer = L.markerClusterGroup().addTo(map);

// md ld filter
let parkAreaBox = document.querySelectorAll('.parkAreaBox');
let parkAmenitiesBox = document.querySelectorAll('.parkAmenitiesBox');

let poolTypeBox = document.querySelectorAll('.poolTypeBox');
let poolAreaBox = document.querySelectorAll('.poolAreaBox');

let parkFilter = document.querySelector('.btn-parkfilter');
let poolFilter = document.querySelector('.btn-poolfilter');

// sd filter
let smParkFilter = document.querySelector('.btn-smparkfilter');
let smPoolFilter = document.querySelector('.btn-smpoolfilter');

let smParkAreaBox = document.querySelectorAll('.smParkAreaBox');
let smParkAmenitiesBox = document.querySelectorAll('.smParkAmenitiesBox');

let smPoolTypeBox = document.querySelectorAll('.smPoolTypeBox');
let smPoolAreaBox = document.querySelectorAll('.smPoolAreaBox');


// filter function 
function checkFilters(box, data){
    for(let i of box){
        if(i.checked){
            createMarkers(data[i.value], filterClusterLayer);
        }
    }
}

// ml device 
parkFilter.addEventListener("click", function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    map.setView(singapore, 12.4);
    checkFilters(parkAreaBox, parksByArea);
    checkFilters(parkAmenitiesBox, parkAmenities);
})

poolFilter.addEventListener("click",function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    map.setView(singapore, 12.4);
    checkFilters(poolAreaBox, poolsByArea);
    checkFilters(poolTypeBox, poolType)
})

// sm device

smParkFilter.addEventListener("click", function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    map.setView(singapore, 12.4);
    checkFilters(smParkAreaBox, parksByArea);
    checkFilters(smParkAmenitiesBox, parkAmenities);
})

smPoolFilter.addEventListener("click",function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    map.setView(singapore, 12.4);
    checkFilters(smPoolAreaBox, poolsByArea);
    checkFilters(smPoolTypeBox, poolType)
})

