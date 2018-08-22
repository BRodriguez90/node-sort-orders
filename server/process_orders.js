const fs = require('fs');
const async = require('async');

const file = fs.readFileSync('../orders.txt','utf8').toString();

const ordersArray = file.split(',');

const $toyota = /^T([8-9][0-9][0-9]|1[0-9][0-9][0-9]|2000)\-(\w){4}$/,
      $ford = /^[AEIOU]{2}RE4([2-7]{3})$/,
      $land_rover = /^LR([2-4][0-9][0-9]|5[0][0])(v1|v2|v3)$/,
      $algonquin = /^[0-9]+\*[aeiou]{3}/;

let toyotaIds = [],
    fordIds = [],
    landroverIds = [],
    algonquinIds = [],
    errorIds = [];
          
ordersArray.map((value,index)=>{
    //Testing ids against regular expressions
    const toyota_test = $toyota.test(value),    
          ford_test = $ford.test(value),
          landrover_test = $land_rover.test(value),
          algonquin_test = $algonquin.test(value);
    //function that takes regExp bool and pushes matching ids into array
    const testIds = (regExpTest,arr) => {  
        if(regExpTest){
            arr.push(value);
        }
    }
    //function expression that records ids that did not match any regExp into errorsIds array
    const error_test = () => {
        if(!(toyota_test||ford_test||landrover_test||algonquin_test)){
            errorIds.push(value);
       }
    }
    //calling sorting function for Ids (param1 = bool, param2 = array)
    testIds(toyota_test,toyotaIds);
    testIds(ford_test,fordIds);
    testIds(landrover_test,landroverIds);
    testIds(algonquin_test,algonquinIds);
    error_test();
    
})
//async functions that update/create file and writes corresponding Ids 
async.parallel([
    (callback)=>fs.writeFile('../toyota.txt',toyotaIds.toString(),callback),
    (callback)=>fs.writeFile('../ford.txt',fordIds.toString(),callback),
    (callback)=>fs.writeFile('../landrover.txt',landroverIds.toString(),callback),
    (callback)=>fs.writeFile('../algonquin.txt',algonquinIds.toString(),callback),
    (callback)=>fs.writeFile('../errors.txt', errorIds.toString(), callback)  
],(err)=>{
    err ? console.log('Failed to write fles.') : console.log('Files successfully updated.')
})

module.exports = {
    ordersArray:ordersArray

}

           