const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

names.forEach((name) => {
    //console.log(name);
    });

names.forEach((name, index) => {
    console.log(`${name}(${provinces[index]})`);
    
    });
const amount = names.map((name) => name.length);
const uppercaseProvinces = provinces.map((province)=> province.toUpperCase());
const orderedprovinces = provinces.sort();
const filteredprovinces = provinces.filter((places)=>!places.includes("Cape"));
const charactercheck = names.map((name) => name.split("").some((character) => character === "S"));
const placeobject = names.reduce((obj, name, index) => {
    obj[name] = provinces[index];
    return obj;

}, {});

console.log(name,uppercaseProvinces,amount,orderedprovinces,filteredprovinces,charactercheck,placeobject);
// console.log(amount)
// console.log(orderedprovinces)
// console.log(filteredprovinces)
// console.log(charactercheck)
// console.log(placeobject)