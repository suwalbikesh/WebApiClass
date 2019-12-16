"use strict"; // to use strict mode in whole code (you cannot use undeclared variables in strict mode.)
function unknownTimeConsumeFunction(val1,receivedCBF){
    for(var i = 0; i<1000000000; i++){

    }
    var error = new Error('error has been occur');
    console.log('inside actual fukntion,big task');
    receivedCBF(val1,error);
}

function callbackWhenfinished(val1,error){
    console.log('inside callback function');
    if (val1 === 10){
    console.log(val1);
    }
    else{
        console.log(error);
    }
}

unknownTimeConsumeFunction(10,callbackWhenfinished);

console.log('task 2');
console.log('task 3');
a = 10; //will be error in strict mode
console.log(a);
