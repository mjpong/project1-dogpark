let allCheckboxes = document.querySelectorAll('input[type=checkbox]');
let allCheckedboxes = document.querySelectorAll('input[type=checkbox]:checked');

let parkAreaBox = document.querySelectorAll('.parkAreaBox');
let parkAmenitiesBox = document.querySelectorAll('.parkAmenitiesBox');

let poolTypeBox = document.querySelectorAll('.poolTypeBox');
let poolAreaBox = document.querySelectorAll('.poolAreaBox');

let parkFilter = document.querySelector('.btn-parkfilter');
let poolFilter = document.querySelector('.btn-poolfilter');



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
    checkFilters(parkAreaBox, parksByArea);
    checkFilters(parkAmenitiesBox, parkAmenities);
})

poolFilter.addEventListener("click",function(){
    allClusterLayer.clearLayers();
    searchClusterLayer.clearLayers();
    filterClusterLayer.clearLayers();
    checkFilters(poolAreaBox, poolsByArea);
    checkFilters(poolTypeBox, poolType)
})

