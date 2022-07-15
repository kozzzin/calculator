const Memory = {

}

const Calculator = {

    a: '',
    b: '',
    result: '',
    currentOperation: '',

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

    percent(a) {
        a = this.checkInput(a);
        return a / 100;
    },

    float(a,b) {
        let val = b ? b : a;
        val = this.checkInput(val);
        Calculator.currentOperation = false;
        return val + '.';
    },

    changeSign(a,b) {
        let val = b ? b : a;
        val = this.checkInput(val);
        Calculator.currentOperation = false;
        return val + '.';
    },

    checkInput(input) {
        if (input == null) {
            return 0;
        } else if (typeof input !== 'number') {
            return Number(input);
        } 
        return input;
    },

    operate(a,operator,b) {
        let result;
        switch(operator) {
            case '+':
                result = this.add(a,b);
                break;
            case '-':
                result = this.substract(a,b);
                break;
            case '*':
                result = this.multiply(a,b);
                break;
            case '/':
                result = this.divide(a,b);
                break;
            case '**':
                result = this.power(a,b);
                break;
            case '%':
                result = this.percent(a);
                break;  
            case '.':
                result = this.float(a,b);
                break;
            case '+/-':
                    result = this.changeSign(a,b);
                    break;
            default: console.log('empty choice');
        }
        return result;
    }
}

const interface = {

}

document.addEventListener('DOMContentLoaded', function(e) {
    const buttons = Array.from(document.querySelectorAll('.button'));
    buttons.forEach((button) => {
        button.addEventListener('click', clickOnButton);
    });
});

function clickOnButton(e) {
    // console.log(e.target.getAttribute('data-value'));
    const value = e.target.getAttribute('data-value');
    // console.log('value: ', value);
    if (value === 'clear') {
        // clear display and values
        clear();
    } else if (!isNaN(Calculator.checkInput(value))) {
        // update values if number
        let displayValue = updateValues(value);
        updateDisplay(displayValue);
    } else {
        // operations
        // equal
        // - equal with two values
        // - equal with one value does nothing
        // clear values
        // a value = result 
        const unary = ['.','%','+/-',];
        if (Calculator.a && Calculator.b) {
            resolve(Calculator.currentOperation, Calculator.a, Calculator.b);
            Calculator.currentOperation = value;
        } else {
            if (unary.includes(value)) {
                Calculator.currentOperation = value;
                resolve(Calculator.currentOperation, Calculator.a, Calculator.b);
                Calculator.currentOperation = false;
            } else if (value != '=') {
                Calculator.currentOperation = value;
                // resolve(Calculator.currentOperation, Calculator.a, Calculator.b);
            }
        }
        console.log(Calculator.currentOperation);
    }
    
}

function clear() {
    clearValues();
    updateDisplay(Calculator.result);
}

function saveLastResult() {
    // if operater is clicked after result, result is a a value, so we need only second one
}

// if equal sign is double clicked it works like clear function

// convertion to float

function updateValues(val) {  
    if (Calculator.currentOperation == false) {
        // update first value
        Calculator.a += Calculator.checkInput(val);
        return Calculator.a;
    } else {
        // update second value
        Calculator.b += Calculator.checkInput(val);
        return Calculator.b;
    }
}

function clearValues(saveResult=false) {
    Calculator.a = '';
    Calculator.b = '';
    if (saveResult) {
        Calculator.a = Calculator.result;
    } else {
        Calculator.currentOperation = false;
    }
    Calculator.result = 0;    
}

function resolve(operation, a, b) {
    // need it to act, when equal sign or any of operators' buttons is clicked
    Calculator.result = Calculator.operate(a,operation,b); 
    updateDisplay(Calculator.result);
    clearValues(true);
}

function updateDisplay(val) {
    const display = document.querySelector('#result');
    if (val == 'clear') {
        val = '0';
    } 
    display.textContent = val;
}

