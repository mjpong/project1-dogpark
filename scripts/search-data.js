
const searchQuery = document.getElementById('searchQuery')
const searchResult = document.getElementById('searchResult')
const searchBtn = document.getElementById('btn-search')
const resetBtn = document.getElementById('btn-reset')



function getSearch(inputValue, parkData) {
    let search = []
    let input = inputValue.toLowerCase()
    for (let i of parkData) {
        let name = i.parkName.toLowerCase()
        let address = i.parkAddress.toLowerCase()
        let area = i.parkArea.toLowerCase()
        if (name.includes(input) || (address.includes(input)) || (area.includes(input))) {
            search.push({
                'parkName': i.parkName,
                'parkAddress': i.parkAddress,
                'parkArea': i.parkArea,
                'parkPic': i.parkPic,
                'parkLatitude': i.parkLatitude,
                'parkLongtitude': i.parkLongtitude
            })
        }
    }
    return search;
}

searchBtn.addEventListener('click', function () {
    let userSearch = searchQuery.value
    let searchValue = getSearch(userSearch, allParksData);
    console.log(searchValue)

    // empty the all cluser layer

    // go through each element in the result

    // .. add each of them to the all cluster layer

    

})


// // get search value function
// let search = []

// function getSearch(value, parkdata, pooldata){
//     clearList();
//     let uservalue = searchQuery.value.toLowercase()
//     for (let i of parkdata) {
//         let name = i.name.toLowerCase()
//         let address = i.address.toLowerCase()
//         let area = i.area.toLowerCase()
//         if (name.includes(uservalue) || (address.includes(uservalue)) || (area.includes(uservalue))) {
//             search.push({
//                 ''
//             })
//         } else if(value.length === 0) {
//             setNoResults();
//         }


//     }
// } 


// function clearList(){

// }

// function setNoResults(){

// }

// search.addEventListener('input', function(){
//     searchAll(search.value)
// })

// // get searchQuery value

// document.getElementById("searchQuery").addEventListener("keyup",function(e){
//     if (e.keycode === 13) {
//         document.getElementById("btn-search").click()
//     }
// })
