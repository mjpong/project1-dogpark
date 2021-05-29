let allCheckboxes = document.querySelectorAll('input[type=checkbox]');
let allCheckedboxes = document.querySelectorAll('input[type=checkbox]:checked');

let parkAreaBox = document.querySelectorAll('.parkAreaBox');
let parkAmenitiesBox = document.querySelectorAll('.parkAmenitiesBox');

let poolTypeBox = document.querySelectorAll('.poolTypeBox');
let poolAreaBox = document.querySelectorAll('.poolAreaBox');

let parkFilter = document.querySelector('.btn-parkfilter');
let poolFilter = document.querySelector('.btn-poolfilter');

let smParkFilter = document.querySelector('.btn-smparkfilter');
let smPoolFilter = document.querySelector('.btn-smpoolfilter');

let smParkAreaBox = document.querySelectorAll('.smParkAreaBox');
let smParkAmenitiesBox = document.querySelectorAll('.smParkAmenitiesBox');

let smPoolTypeBox = document.querySelectorAll('.smPoolTypeBox');
let smPoolAreaBox = document.querySelectorAll('.smPoolAreaBox');

let filterClusterLayer = L.markerClusterGroup().addTo(map);

function checkFilters(box, data){
    for(let i of box){
        if(i.checked){
            createMarkers(data[i.value], filterClusterLayer);
        }
    }
}

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

smParkFilter.addEventListener("click", function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    checkFilters(smParkAreaBox, parksByArea);
    checkFilters(smParkAmenitiesBox, parkAmenities);
})

smPoolFilter.addEventListener("click",function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    checkFilters(smPoolAreaBox, poolsByArea);
    checkFilters(smPoolTypeBox, poolType)
})

