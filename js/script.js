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
        if (String(Memory.current).search(/\./) == -1) {
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
    result: false,

    clearValues() {
        Memory.current = '';
        Memory.saved = '';
        Memory.currentOperation = false;
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
            default:
                
                if (Memory.current && Memory.saved) {
                    Interface.operate(Memory.saved,Memory.currentOperation,Memory.current);
                    Memory.saved = '';
                    Memory.result = true;
                    Memory.currentOperation = false;
                } else {
                    if (value != '=') {
                        Memory.save();                        
                    }
                }
                if (value != '=') {
                    Memory.currentOperation = value;                   
                }
                Interface.toggleActiveOperation(value);        
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
            // update value
            if (Memory.result) {
                if (Memory.currentOperation != false) {
                    Memory.save();
                } else {
                    Interface.clear();
                }
                Memory.result = false;
            }
            Memory.current += String(Number(value));
            Interface.updateDisplay(Memory.current);
        } else {
            Interface.resolve(value);
        }
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
            default: console.log('no operartor provideds');
        }
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