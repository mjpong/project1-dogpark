let allCheckboxes = document.querySelectorAll('input[type=checkbox]');
let allCheckedboxes = document.querySelectorAll('input[type=checkbox]:checked')
let parkCheckboxes = document.querySelectorAll('.parkBox');
let poolCheckboxes = document.querySelectorAll('.poolBox');
let parkFilter = document.querySelector('btn-parkfilter');
let poolFilter = document.querySelector('btn-poolfilter');

// filter results from load-data

// for (let park of parkCheckboxes) {
//     for (park.checked == true) {
//         if (park.checked == i.area)
//     }
// }


// allCheckboxes.forEach(allCheckboxes => allCheckboxes.addEventListener('click', handleCheck))


// function filterSearch(userCheck) {
//     let userCheckbox = []

//     for (let i of allData) {
//         if (i.area == userCheck) {
//             if (i.property == "Park") {
//                 userCheckbox.push({
//                     'name': i.name,
//                     'address': i.address,
//                     'area': i.area,
//                     'hours': i.hours,
//                     'pic': i.pic,
//                     'lighting': i.lighting,
//                     'latitude': i.latitude,
//                     'longtitude': i.longtitude,
//                     'property': i.property
//                 })
//             } else {
//                 userCheckbox.push({
//                     'name': i.name,
//                     'address': i.address,
//                     'area': i.area,
//                     'price': i.price,
//                     'hours': i.hours,
//                     'pic': i.pic,
//                     'latitude': i.latitude,
//                     'longtitude': i.longtitude,
//                     'type': i.type.toString().replace(",", ", "),
//                     'property': i.property
//                 })
//             }
//         }
//     }
//     return userCheckbox;
// }

// console.log(filterSearch(1))
