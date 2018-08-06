$(function(){

    //Grabbing ul dom elements 
    const $orders_list = $('#orders_list');
    const $toyota_list = $('#toyota_ids');
    const $ford_list = $('#ford_ids');
    const $landrover_list = $('#landrover_ids');
    const $algonquin_list = $('#algonquin_ids');
    const $error_list = $('#error_ids');
    //Regular Expressions
    const $toyota = /^T([8-9][0-9][0-9]|1[0-9][0-9][0-9]|2000)\-(\w){4}$/;
    const $ford = /^[AEIOU]{2}RE4([2-7]{3})$/;
    const $land_rover = /^LR([2-4][0-9][0-9]|5[0][0])(v1|v2|v3)$/;
    const $algonquin = /^[0-9]+\*[aeiou]{3}/;

    const makeList = (value,index) => `<li>Id = ${value}</li>`;  

    $("#button").on('click', function(){
        if(!$orders_list.children().length){ //if list is empty fetch ids 
            fetch('http://localhost:3000/') //grab json for order ids 
            .then(res => res.json())
            .then(response => {
                console.log(response);
                const {ordersArray} = response;

                ordersArray.map((value,index) => { //loop through each Id and create and list element for it
                    $orders_list.append(makeList(value,index));  //add main order IDs to orders list
                    //Testing ids against regular expressions
                    const toyota_test = $toyota.test(value);    
                    const ford_test = $ford.test(value);
                    const landrover_test = $land_rover.test(value);
                    const algonquin_test = $algonquin.test(value);
                    //Function that appends IDs to the UL if they match the regEx
                    const testIds = (regExp,variable) => {  
                        if(regExp){
                            variable.append(makeList(value,index));
                        } 
                    }
                    //Check for any IDs that don't match any of the regEx
                    const errors_test = () => {
                        if(!(toyota_test||ford_test||landrover_test||algonquin_test)){
                             $error_list.append(makeList(value,index));
                        }
                    }
                    
                    testIds(toyota_test,$toyota_list);
                    testIds(ford_test,$ford_list);
                    testIds(landrover_test,$landrover_list);
                    testIds(algonquin_test, $algonquin_list);
                    errors_test();
                }) 
            })
            .catch(err=> console.log(err))
        }
    })
        

})