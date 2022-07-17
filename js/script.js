const Operations = {
    add(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a + b;
    },

    substract(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a - b;
    },

    multiply(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a * b;
    },

    divide(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a / b;
    },

    power(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a ** b;
    },

    percent(val) {
        val = this.checkInput(val);
        return val / 100;
    },

    float(val) {
        val = this.checkInput(val);
        if (Memory.current.search(/\./) == -1) {
            return val + '.';
        }
        return val;
    },

    changeSign(val) {
        val = this.checkInput(val);
        return -1 * val;
    },

    checkInput(input) {
        return Number(input);
    }
}

const Memory = {
    current: '',
    saved: '',
    currentOperation: false,

    clearValues() {
        Memory.current = '';
        Memory.saved = '';
        Memory.currentOperation = '';
    },

    save(val) {
        this.saved = String(this.current);
        this.current = '';
    }
}

const Interface = {
    updateDisplay(val='0') {
            const display = document.querySelector('#result');
            display.textContent = val;           
    },

    clear() {
        Memory.clearValues();
        this.updateDisplay();
        this.toggleActiveOperation();
    },

    resolve(value) {
        switch(value) {
            case 'clear':
                Interface.clear();
                break;
            case '.':
            case '%':
            case '+/-':
                Interface.operate(Memory.current,value);   
                break;
            case '=':
                if (Memory.current && Memory.saved) {
                    Interface.operate(Memory.saved,Memory.currentOperation,Memory.current);
                } else {
                    Memory.save();
                }
                break;
            default:
                Memory.currentOperation = value;
                if (Memory.current && Memory.saved) {
                    Interface.operate(Memory.saved,Memory.currentOperation,Memory.current);
                } else {
                    Memory.save();
                }
                
                Interface.toggleActiveOperation(value);
                console.log('binary operation in resolve ');
                
                // Operations.binary();
        }
    },

    toggleActiveOperation(value) {
        let activeOperation = document.querySelector(`[data-value="${value}"]`);
        document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        if (value) {
            activeOperation.classList.add('active');
        }

    },

    clickOnButton(e) {
        const value = e.target.getAttribute('data-value');
        
        if (!isNaN(Number(value))) {
            Memory.current += String(Number(value));
            Interface.updateDisplay(Memory.current);
        } else {
            console.log('operation' + value);
            Interface.resolve(value);
        }

        // if number => update current

        // if number after operation => save current to memory, work with current

        // if equal sign

        // if unary operator => work with current

        // if memory + current + operation key => update current, clear all

    },

    operate(a,operator,b) {
        let result;
        switch(operator) {
            case '+':
                result = Operations.add(a,b);
                break;
            case '-':
                result = Operations.substract(a,b);
                break;
            case '*':
                result = Operations.multiply(a,b);
                break;
            case '/':
                result = Operations.divide(a,b);
                break;
            case '**':
                result = Operations.power(a,b);
                break;
            case '%':
                result = Operations.percent(a);
                break;  
            case '.':
                result = Operations.float(a);
                break;
            case '+/-':
                result = Operations.changeSign(a);
                break;
            default: console.log('empty choice');
        }
        // return result;
        // update saved
        Memory.current = result;
        Interface.updateDisplay(result);
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    const buttons = Array.from(document.querySelectorAll('.button'));
    buttons.forEach((button) => {
        button.addEventListener('click', Interface.clickOnButton);
    });
});


// function clickOnButton(e) {
//     } else if (!isNaN(Calculator.checkInput(value))) {
//         // update values if number
//         let displayValue = updateValues(value);
//         updateDisplay(displayValue);
//     } else {
//         // operations
//         // equal
//         // - equal with two values
//         // - equal with one value does nothing
//         // clear values
//         // a value = result 
//         const unary = ['.','%','+/-',];
//         if (Calculator.a && Calculator.b) {
//             resolve(Calculator.currentOperation, Calculator.a, Calculator.b);
//             Calculator.currentOperation = value;
//         } else {
//             if (unary.includes(value)) {
//                 Calculator.currentOperation = value;
//                 resolve(Calculator.currentOperation, Calculator.a, Calculator.b);
//                 Calculator.currentOperation = false;
//             } else if (value != '=') {
//                 Calculator.currentOperation = value;
//                 // resolve(Calculator.currentOperation, Calculator.a, Calculator.b);
//             }
//         }
//         console.log(Calculator.currentOperation);
//     }
    
// }



// // if equal sign is double clicked it works like clear function

// // convertion to float

// function updateValues(val) {  
//     if (Calculator.currentOperation == false) {
//         // update first value
//         Calculator.a += Calculator.checkInput(val);
//         return Calculator.a;
//     } else {
//         // update second value
//         Calculator.b += Calculator.checkInput(val);
//         return Calculator.b;
//     }
// }

// function clearValues(saveResult=false) {
//     Calculator.a = '';
//     Calculator.b = '';
//     if (saveResult) {
//         Calculator.a = Calculator.result;
//     } else {
//         Calculator.currentOperation = false;
//     }
//     Calculator.result = 0;    
// }

// function resolve(operation, a, b) {
//     // need it to act, when equal sign or any of operators' buttons is clicked
//     Calculator.result = Calculator.operate(a,operation,b); 
//     updateDisplay(Calculator.result);
//     clearValues(true);
// }

