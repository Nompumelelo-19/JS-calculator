//Reference display element
const display = document.getElementById('display');

//Track if we have performed calculations
let justCalculated = false;

function isOperator(char){
    return['+', '-', '*', '/'].includes(char);
}

function getLastChar(){
    return display.value.slice(-1);
}

function safeEval(expression) {
    try {
        let jsExpression = expression
            .replace(/x/g, '*')
            .replace(/÷/g, '/');

        if (!/^[0-9+\-*/,()]+$/.test(jsExpression)) {
            throw new Error('Invalid characters in expression');
        }
        const result = Function('"use strict"; return (' + jsExpression + ')')();
        if (!isFinite(result)){
            throw new Error ('Invalid calculation results');
        }return result;
    } catch (error) {
        console.error('Calculation error:',error);
        return 'Error';
    }
}
function appendToDisplay(value){
    console.log ('Button presssed:' + value);

    let currentValue = display.value;

    if(justCalculated && !isNaN(value)){
      display.value = value;
        justCalculated = false;
        return; 
    }

    if (justCalculated && isOperator(value)){
        display .value =currentValue + value;
        justCalculated = false;
        return;
    }
}

    //handle operators
    if(isOperator(value)){
        //Dont allow operator as first char exception for minus
        if(currentValue === '0' && value !== '-'){
            return;//Do nothing
        }
    
  //If the last character is already an operator, replace it

    if(isOperator(getLastChar())){
        display.value = currentValue.slice(0, -1) + value;
    }else{
        display.value = currentValue + value;
    }
}else if(!isNaN(value)){
    if(currentValue === '0'){
        display.value = value;
    }else{
        display.value = currentValue + value;
    }
}else if(value === '.'){
    if(currentValue === '0'){
        display.value = currentValue + value;
        }else {
            // Get the last number in display after the last operator
            let parts = currentValue.split(/[\+\-\*\/]/);
            let lastnumber = parts[parts.length -1];

            //Only add deimal if the last number doesn't already have one
            
        }
    // If current display show 0 and user enters a number, we wanna replace the 0
    if(currentValue === '0' && !isNaN(value)){
        display.value = value;
    } else if(currentValue === '0' && value === '.'){
        display.value = currentValue +  value;
    } else if (value === '.'){
        let lastnumber = currentValue.split(/[\+\-\*\/]/).pop();
    if(!lastnumber.includes('.')){
        display.value = currentValue + value;
    }
    } else{
        display.value = currentValue + value;
    }
    //Reset the justcalculated flag when user starts typing
    justCalculated = false;
    console.log('Display update to: ',display.value);
}
function clearDisplay(){
    console.log('clear button pressed');
    display.value = '0';
    justCalculated = false; 
    display.style.backgroundColor = '#f0f0f0';
    setTimeout(() => {
        display
    },150)
}
function deleteLast(){
    console.log('Backspace button pressed');

    
    let currentValue = display.value;

    //If theres only one charater or its 0, reset to 0
    if(currentValue.length <= 1 || currentValue === '0'){
        display.value = '0';

}else{display.value = currentValue.slice(0, -1);}

}
function calculate(){
    let expreesion = display.value;

    //dont calculate if display is 0 or empty
    if(expression ==='0'|| expression ==='');{
        return;
    }

    //Dont calculate if the last character is an operator
    if(isOperator(getLastChar())){
        return;
    }

let result = safeEval(expression);

if (result === 'Error') {
    display.value = 'Error';
    setTimeout(() => {
        clearDisplay();
    }, 2000);
} else {
    if (Number.isInteger(result)) {
        display.value = result.toString();
    } else {
        display.value = parseFloat(result.toFixed(10)).toString();
    }
    justCalculated = true;
}

display.style.backgroundColor = '#e8f5e8';
setTimeout(() => {
    display.style.backgroundColor = ''
}, 300);
}

document.addEventListener('keydown', function(){
    console.log('Key pressed:', Event.key);

    if (Event.key >='0'&& Event.key <='9'){
        appendToDisplay(Event.key)
    }else if(Event.key==='.'){
        appendToDisplay('.');
    }else if(Event.key === '+' ){
        appendToDisplay('+');
    }else if(Event.key === '-' ){
        appendToDisplay('-');}
    else if (Event.key=== '*'){
        appendToDisplay('*');
    }else if (Event.key=== '/'){
        appendToDisplay('/')
        Event .preventDefault(); 
        appendToDisplay('/')
    }
   else if(Event.key ==='Enter'|| Event.key === '='){
    calculate();
   }else if (Event.key==='Escape'||Event.key==='c'|| Event.key==='C'){
    clearDisplay()
   }else if(Event.key==='Backspace'){
    deleteLast()
   }
})

document.addEventListener('DOMContentLoaded', function(){
    console.log('calculator loaded successfully');
console.log('Display elemt',display);

if(display){
    console.log('Current display value:', display.value);
}else{
    console.log('Display element not found');  
}
})