

const Calculator = {

    a: '0',
    b: '0',
    result: 0,

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

    checkInput(input) {
        if (typeof input !== 'number') {
            return parseInt(input);
        } else if (input === null) {
            return 0;
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
            default: console.log('empty choice');
        }
        console.log(result);
    }
}

const interface = {

}

Calculator.operate(2,'+',2);
Calculator.operate(2,'-',2);
Calculator.operate(2,'*',2);
Calculator.operate(2,'/',2);
Calculator.operate(2,'**',3);
Calculator.operate(20,'%');

document.addEventListener('DOMContentLoaded', function(e) {
    const buttons = Array.from(document.querySelectorAll('.button'));
    buttons.forEach((button) => {
        button.addEventListener('click', clickOnButton);
    });
});

function clickOnButton(e) {
    // console.log(e.target.getAttribute('data-value'));
    const value = e.target.getAttribute('data-value');
    console.log('value: ', value);
    if (value === 'clear') {
        console.log('ed');
        Calculator.a = '0';
        Calculator.b = '0';
        Calculator.result = '0';
        updateDisplay(Calculator.a);
    } else if (!isNaN(parseInt(value))) {
        Calculator.a += value;
        updateDisplay(Calculator.a)
    } else {
        Calculator.operate(2,'+',2);
    }
    
}

function updateValues(val) {
    // first
    // second
    
}

function updateDisplay(val) {
    const display = document.querySelector('#result');
    if (val == 'clear') {
        val = '0';
        console.log('clear update')
    } else if (display.innerText === '0') {

    }
    
    display.textContent = val;
}

// update screen on operate function
// equal sign works if we have two numbers and operator
// work with answer to us next operation

console.log(Calculator.checkInput('clear'));


// if it's result
// if operator fired
// result + operator